import MediationCase from '../models/mediationCaseModel.js'; 
import { queues } from '../queues/queue.js';
import { google } from 'googleapis'; 

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


// ============================================================================
// API 1: REQUEST MEDIATION SESSION (Triggered by User/Client)
// ============================================================================
/**
 * Handles the user's request to schedule a mediation session.
 * Updates the case with the requested date, time, and mode.
 * * @param {Object} req - Express request object containing caseId and session details.
 * @param {Object} res - Express response object.
 */
export const requestSession = async (req, res) => {
    try {
        const { caseId } = req.params;
        const { sessionMode, sessionDate, sessionStartTime, sessionEndTime } = req.body;

        // 1. Input Validation
        if (!sessionMode || !sessionDate || !sessionStartTime || !sessionEndTime) {
            return res.status(400).json({ 
                success: false, 
                message: 'All scheduling fields (mode, date, start time, end time) are required.' 
            });
        }

        // 2. Update the case status to 'Session Requested'
        const updatedCase = await MediationCase.findByIdAndUpdate(
            caseId,
            { 
                sessionMode,
                sessionDate,
                sessionStartTime,
                sessionEndTime,
                status: 'Session Requested' 
            },
            { new: true } 
        );

        if (!updatedCase) {
            return res.status(404).json({ success: false, message: 'Mediation case not found.' });
        }

        // 3. Send Success Response
        res.status(200).json({ 
            success: true, 
            message: 'Session request submitted successfully to the Admin.',
            data: updatedCase
        });

    } catch (error) {
        console.error('Error in requestSession:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
};


// ============================================================================
// API 2: ACCEPT SESSION & SCHEDULE REMINDERS (Triggered by Admin)
// ============================================================================
/**
 * Handles the Admin's approval of a session request.
 * Generates a Google Meet link (if online) and schedules 3-tier email reminders.
 * * @param {Object} req - Express request object containing caseId.
 * @param {Object} res - Express response object.
 */
export const acceptSession = async (req, res) => {
    try {
        const { caseId } = req.params;

        // 1. Fetch the case details
        const mediationCase = await MediationCase.findById(caseId);
        if (!mediationCase) {
            return res.status(404).json({ success: false, message: 'Mediation case not found.' });
        }

        let meetLink = mediationCase.googleMeetLink; 

        // 2. Google Meet Link Generation (Only if Online and link doesn't exist)
        if (mediationCase.sessionMode === 'Online' && !meetLink) {
            
            // Format dates for Google Calendar API (assuming IST Timezone +05:30)
            const eventStartTime = new Date(`${mediationCase.sessionDate}T${mediationCase.sessionStartTime}:00+05:30`);
            const eventEndTime = new Date(`${mediationCase.sessionDate}T${mediationCase.sessionEndTime}:00+05:30`);

            // Define Google Calendar Event payload
            const event = {
                summary: `ICDRC Mediation Session: Case ${caseId.substring(0, 5)}`,
                description: 'Official online mediation session scheduled via ICDRC portal.',
                start: { dateTime: eventStartTime.toISOString(), timeZone: 'Asia/Kolkata' },
                end: { dateTime: eventEndTime.toISOString(), timeZone: 'Asia/Kolkata' },
                conferenceData: {
                    createRequest: {
                        requestId: caseId, // Unique ID ensures idempotent requests
                        conferenceSolutionKey: { type: 'hangoutsMeet' }
                    }
                }
            };

            // Insert event into Google Calendar and retrieve the Meet link
            const calendarResponse = await calendar.events.insert({
                calendarId: 'primary',
                resource: event,
                conferenceDataVersion: 1, // Required to auto-generate Meet link
            });

            meetLink = calendarResponse.data.hangoutLink; 
        }

        // 3. Update Database with the confirmed status and Meet link
        const updatedCase = await MediationCase.findByIdAndUpdate(
            caseId,
            { 
                googleMeetLink: meetLink,
                status: 'Session Scheduled' 
            },
            { new: true }
        );

        // ====================================================================
        // EMAIL REMINDER SCHEDULING LOGIC (Using BullMQ Delays)
        // ====================================================================
        
        // Parse the exact meeting start time
        const meetingStartTime = new Date(`${updatedCase.sessionDate}T${updatedCase.sessionStartTime}:00+05:30`);
        const currentTime = new Date();
        
        // Calculate the total remaining time in milliseconds
        const timeUntilMeeting = meetingStartTime.getTime() - currentTime.getTime();

        // Calculate delays for future emails
        const delay24Hours = timeUntilMeeting - (24 * 60 * 60 * 1000); // 24 hours prior
        const delay1Hour = timeUntilMeeting - (1 * 60 * 60 * 1000);    // 1 hour prior

        const senderEmail = process.env.NOREPLYEMAIL || '"ICDRC Admin" <noreply@icdrc.in>';

        // --- EMAIL 1: Immediate Confirmation ---
        const immediateHtml = `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
                <h2 style="color: #28a745;">Session Approved! ✅</h2>
                <p>Hello,</p>
                <p>The Admin has approved your mediation session request.</p>
                <ul style="list-style-type: none; padding: 0;">
                    <li><strong>Date:</strong> ${updatedCase.sessionDate}</li>
                    <li><strong>Time:</strong> ${updatedCase.sessionStartTime} to ${updatedCase.sessionEndTime}</li>
                    <li><strong>Mode:</strong> ${updatedCase.sessionMode}</li>
                </ul>
                ${updatedCase.sessionMode === 'Online' 
                    ? `<p style="margin-top: 20px;"><strong>Google Meet Link:</strong> <br><a href="${meetLink}" style="display: inline-block; padding: 10px 15px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">Join Session Here</a></p>` 
                    : `<p style="margin-top: 20px;"><strong>Location:</strong> Please visit the ICDRC office physically at the scheduled time.</p>`
                }
                <p>Thank you,<br>ICDRC Admin Team</p>
            </div>`;
        
        await queues.EmailQueue.add("send-immediate-confirmation", {
            from: senderEmail, 
            to: updatedCase.email,
            subject: 'ICDRC: Your Session Request is Approved', 
            html: immediateHtml
        });

        // --- EMAIL 2: 24-Hour Reminder ---
        // Only schedule if the meeting is more than 24 hours away
        if (delay24Hours > 0) {
            const reminder24Html = `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
                    <h2 style="color: #ffc107;">Reminder: Session Tomorrow ⏰</h2>
                    <p>Hello,</p>
                    <p>This is a gentle reminder that your mediation session is scheduled for tomorrow.</p>
                    <p><strong>Time:</strong> ${updatedCase.sessionStartTime}</p>
                    ${updatedCase.sessionMode === 'Online' ? `<p><a href="${meetLink}">Join Google Meet</a></p>` : `<p>Location: ICDRC Office</p>`}
                </div>`;

            await queues.EmailQueue.add("send-24h-reminder", {
                from: senderEmail, 
                to: updatedCase.email,
                subject: 'Reminder: ICDRC Session in 24 Hours', 
                html: reminder24Html
            }, { delay: delay24Hours }); // Process job only after delay
        }

        // --- EMAIL 3: 1-Hour Urgent Reminder ---
        // Only schedule if the meeting is more than 1 hour away
        if (delay1Hour > 0) {
            const reminder1Html = `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
                    <h2 style="color: #dc3545;">Meeting Starting Soon! ⏳</h2>
                    <p>Hello,</p>
                    <p>Your mediation session will begin in 1 hour. Please ensure you are ready.</p>
                    ${updatedCase.sessionMode === 'Online' 
                        ? `<p><a href="${meetLink}" style="display: inline-block; padding: 10px 15px; background: #dc3545; color: white; text-decoration: none; border-radius: 5px;">Join Google Meet Now</a></p>` 
                        : `<p>Please ensure you reach the office on time.</p>`
                    }
                </div>`;

            await queues.EmailQueue.add("send-1h-reminder", {
                from: senderEmail, 
                to: updatedCase.email,
                subject: 'Urgent: ICDRC Session starts in 1 Hour', 
                html: reminder1Html
            }, { delay: delay1Hour }); // Process job only after delay
        }

        // 4. Final Success Response
        res.status(200).json({ 
            success: true, 
            message: 'Session accepted. Meet link generated and intelligent reminders scheduled!',
            data: { meetLink }
        });

    } catch (error) {
        console.error('Error in acceptSession:', error);
        res.status(500).json({ success: false, message: 'Server Error or Google API Issue', error: error.message });
    }
};