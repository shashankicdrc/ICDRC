import MediationCase from '../models/mediationCaseModel.js';
import { queues } from '../queues/queue.js';
import { google } from 'googleapis';
import {
    googleMeetCreatedTotal,
    googleMeetErrorsTotal,
    mediationCasesTotal,
} from '../utils/metrics.js'; 

// ============================================================================
// GOOGLE MEET OAUTH 2.0 CONFIGURATION
// ============================================================================
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground" // Standard redirect URI for Playground
);

// Set the refresh token to maintain continuous API access without manual login
oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

// Initialize Google Calendar API client
const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export const assignMediator = async (req, res) => {
    try {
        const { caseId } = req.params;

        // 1. Ensure the case exists and is in a valid status for mediator assignment
        const existingCase = await MediationCase.findById(caseId);
        if (!existingCase) {
            return res.status(404).json({ success: false, message: 'Case not found' });
        }

        if (existingCase.status !== 'Session Requested') {
            return res.status(400).json({
                success: false,
                message: `Mediator can only be assigned after session request. Current: ${existingCase.status}`,
            });
        }

        // 2. Google Meet Link Generation (Only if Online and link doesn't exist)
        let meetLink = existingCase.googleMeetLink;
        if (existingCase.sessionMode === 'Online' && !meetLink) {
            try {
                // Format dates for Google Calendar API (assuming IST Timezone +05:30)
                const eventStartTime = new Date(`${existingCase.sessionDate}T${existingCase.sessionStartTime}:00+05:30`);
                const eventEndTime = new Date(`${existingCase.sessionDate}T${existingCase.sessionEndTime}:00+05:30`);

                // Determine admin email if available (admin auth sets req.email)
                const adminEmail = req.email || process.env.GOOGLE_HOST_EMAIL;

                // Define Google Calendar Event payload
                const event = {
                    summary: `ICDRC Mediation Session: Case ${caseId.substring(0, 5)}`,
                    description: 'Official online mediation session scheduled via ICDRC portal.',
                    start: { dateTime: eventStartTime.toISOString(), timeZone: 'Asia/Kolkata' },
                    end: { dateTime: eventEndTime.toISOString(), timeZone: 'Asia/Kolkata' },
                    attendees: [
                        { email: existingCase.email },
                        ...(adminEmail ? [{ email: adminEmail }] : []),
                    ],
                    conferenceData: {
                        createRequest: {
                            requestId: caseId,
                            conferenceSolutionKey: { type: 'hangoutsMeet' }
                        }
                    },
                    guestsCanInviteOthers: false,
                    guestsCanModify: false,
                    attendeesCanInviteOthers: false,
                };

                // Insert event into Google Calendar and retrieve the Meet link
                const calendarResponse = await calendar.events.insert({
                    calendarId: 'primary',
                    resource: event,
                    conferenceDataVersion: 1,
                    sendUpdates: 'all',
                });

                meetLink = calendarResponse.data.hangoutLink;
                // ─── Track successful Meet link creation ───────────────────────
                googleMeetCreatedTotal.inc();
            } catch (meetError) {
                // ─── Track Google API errors (401 token expired, 403, etc.) ─────
                const errorCode = meetError?.code ?? meetError?.response?.status ?? 'UNKNOWN';
                googleMeetErrorsTotal.inc({ error_code: String(errorCode) });
                // Re-throw so the outer catch returns a 500 to the admin
                throw meetError;
            }
        }

        // 3. Update Database with the confirmed status and Meet link
        const finalUpdatedCase = await MediationCase.findByIdAndUpdate(
            caseId,
            { 
                googleMeetLink: meetLink,
                status: 'Mediator Assigned' 
            },
            { new: true }
        );

        // ─── Track mediation case transition ───────────────────────────────
        mediationCasesTotal.inc({ transition: 'mediator_assigned' });

        // 4. Send email with session details
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
                <h2 style="color: #28a745;">Mediator Assigned & Session Scheduled! ✅</h2>
                <p>Dear ${finalUpdatedCase.fullName},</p>
                <p>A mediator has been assigned to your case, and your mediation session has been scheduled as per your request.</p>
                <ul style="list-style-type: none; padding: 0;">
                    <li><strong>Case ID:</strong> ${finalUpdatedCase._id}</li>
                    <li><strong>Date:</strong> ${finalUpdatedCase.sessionDate}</li>
                    <li><strong>Time:</strong> ${finalUpdatedCase.sessionStartTime} to ${finalUpdatedCase.sessionEndTime}</li>
                    <li><strong>Mode:</strong> ${finalUpdatedCase.sessionMode}</li>
                </ul>
                ${finalUpdatedCase.sessionMode === 'Online' 
                    ? `<p style="margin-top: 20px;"><strong>Google Meet Link:</strong> <br><a href="${meetLink}" style="display: inline-block; padding: 10px 15px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">Join Session Here</a></p>` 
                    : `<p style="margin-top: 20px;"><strong>Location:</strong> Please visit the ICDRC office physically at the scheduled time.</p>
                      <p><strong>Address:</strong><br>
                      Corporate Office:<br>
                      6th Floor, Sanatan Building,<br>
                      Opposite CAG Office,<br>
                      Deendayal Upadhyay Marg,<br>
                      New Delhi</p>`
                }
                <p>Please ensure you are prepared for the session. If you have any questions, contact our support team.</p>
                <p>Thank you,<br>ICDRC Admin Team</p>
            </div>`;

        const senderEmail = process.env.NOREPLYEMAIL || '"ICDRC Admin" <noreply@icdrc.in>';
        await queues.EmailQueue.add("send-mediator-assignment", {
            from: senderEmail, 
            to: finalUpdatedCase.email,
            subject: 'ICDRC: Mediator Assigned - Session Details', 
            html: emailHtml
        });

        res.status(200).json({ 
            success: true, 
            message: 'Mediator assigned, Meet link generated, and session details sent to user.',
        });

    } catch (error) {
        console.error('Assign Mediator Error:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};