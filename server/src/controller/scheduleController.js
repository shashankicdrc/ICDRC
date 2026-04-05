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

        const mediationCase = await MediationCase.findById(caseId);
        if (!mediationCase) {
            return res.status(404).json({ success: false, message: 'Mediation case not found.' });
        }

        if (mediationCase.status !== 'Accepted') {
            return res.status(400).json({
                success: false,
                message: `Session request is allowed only after case acceptance. Current status: ${mediationCase.status}`,
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
// API 2: ACCEPT CASE (Triggered by Admin)
// ============================================================================
/**
 * Handles the Admin's acceptance of a mediation case.
 * Sends email to user with button to request session.
 * * @param {Object} req - Express request object containing caseId.
 * @param {Object} res - Express response object.
 */
export const caseAccept = async (req, res) => {
    try {
        const { caseId } = req.params;

        // 1. Fetch the case details
        const mediationCase = await MediationCase.findById(caseId);
        if (!mediationCase) {
            return res.status(404).json({ success: false, message: 'Mediation case not found.' });
        }

        if (mediationCase.status !== 'Submitted') {
            return res.status(400).json({
                success: false,
                message: `Case must be in Submitted status to be accepted. Current status: ${mediationCase.status}`,
            });
        }

        const isPaymentSuccessful =
            mediationCase.paymentStatus === 'Success' ||
            mediationCase.paymentStatus === 'Paid';

        if (!isPaymentSuccessful) {
            return res.status(400).json({
                success: false,
                message: 'Case cannot be accepted until the payment is successful.',
            });
        }

        // 2. Update the case status to 'Accepted'
        const updatedCase = await MediationCase.findByIdAndUpdate(
            caseId,
            { status: 'Accepted' },
            { new: true }
        );

        // 3. Send email to user with button to request session
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
                <h2 style="color: #28a745;">Case Accepted! ✅</h2>
                <p>Dear ${updatedCase.fullName},</p>
                <p>We are pleased to inform you that your mediation case has been reviewed and <strong>accepted</strong>.</p>
                <p><strong>Case ID:</strong> ${updatedCase._id}</p>
                <p>Your case is now ready for session scheduling. Please click the button below to request your preferred mediation session details.</p>
                <p style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/mediation/request-session?caseId=${updatedCase._id}" 
                       style="display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Request Mediation Session
                    </a>
                </p>
                <p>If you have any questions, please contact our support team.</p>
                <p>Thank you for choosing ICDRC for your mediation needs.</p>
                <p>Best regards,<br>ICDRC Admin Team</p>
            </div>`;

        const senderEmail = process.env.NOREPLYEMAIL || '"ICDRC Admin" <noreply@icdrc.in>';
        await queues.EmailQueue.add("send-case-acceptance", {
            from: senderEmail,
            to: updatedCase.email,
            subject: 'ICDRC: Your Case Has Been Accepted - Request Your Session',
            html: emailHtml
        });

        // 4. Final Success Response
        res.status(200).json({ 
            success: true, 
            message: 'Case accepted successfully. Notification email sent to user.',
            data: updatedCase
        });

    } catch (error) {
        console.error('Error in caseAccept:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
};