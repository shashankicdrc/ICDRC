import MediationCase from '../models/mediationCaseModel.js'; 
import { queues } from '../queues/queue.js'; // Email bhejne ke liye tumhari queue import ki hai
import crypto from 'crypto'; // Unique meeting code banane ke liye

export const scheduleSession = async (req, res) => {
    try {
        const { caseId } = req.params;
        const { sessionMode, sessionDate, sessionTime } = req.body;

        // 1. Validation Check
        if (!sessionMode || !sessionDate || !sessionTime) {
            return res.status(400).json({ 
                success: false, 
                message: 'sessionMode, sessionDate, aur sessionTime bhejna zaroori hai.' 
            });
        }

        // 2. Generate Meeting Link (Agar Mode Online hai)
        let meetLink = null;
        if (sessionMode === 'Online') {
            // Asli Google Meet link banane ke liye Google Cloud (GCP) ka setup chahiye hota hai.
            // Abhi testing aur instant video call ke liye hum Jitsi Meet ka free working link use kar rahe hain,
            // (Ya tum chaho toh baad mein isko Google Meet API se replace kar sakte ho).
            const randomCode = crypto.randomBytes(4).toString('hex'); // Ek random code banaya
            meetLink = `https://meet.jit.si/icdrc-${caseId.substring(0, 5)}-${randomCode}`; 
        }

        // 3. Database Update
        const updatedCase = await MediationCase.findByIdAndUpdate(
            caseId,
            { 
                sessionMode: sessionMode,
                sessionDate: sessionDate,
                sessionTime: sessionTime,
                googleMeetLink: meetLink, // Link ko database mein save kar liya
                status: 'Session Scheduled'
            },
            { new: true } 
        );

        if (!updatedCase) {
            return res.status(404).json({ success: false, message: 'Case database mein nahi mila.' });
        }

        // 4. Confirmation Email ka HTML template
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
                <h2 style="color: #28a745;">Session Confirmed! ✅</h2>
                <p>Hello,</p>
                <p>Your mediation session has been successfully scheduled.</p>
                <ul style="list-style-type: none; padding: 0;">
                    <li><strong>Date:</strong> ${sessionDate}</li>
                    <li><strong>Time:</strong> ${sessionTime}</li>
                    <li><strong>Mode:</strong> ${sessionMode}</li>
                </ul>
                
                ${sessionMode === 'Online' 
                    ? `<p><strong>Meeting Link:</strong> <br> <a href="${meetLink}" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 15px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Join Video Session</a></p>
                       <p><small>If the button doesn't work, copy this link: ${meetLink}</small></p>` 
                    : `<p><strong>Location:</strong> Please visit the ICDRC office physically at the scheduled time.</p>`
                }
                <p>Thank you,<br>ICDRC Admin Team</p>
            </div>
        `;

        // 5. Queue mein Email daalo (Taki user ko mail chali jaye)
        await queues.EmailQueue.add("send-session-confirmation", {
            from: process.env.NOREPLYEMAIL || '"ICDRC Admin" <noreply@icdrc.in>',
            to: updatedCase.email, // Jiska case hai usko mail jayegi
            subject: 'ICDRC: Your Session is Confirmed!',
            html: emailHtml
        });

        // 6. Final Success Response
        res.status(200).json({ 
            success: true, 
            message: 'Session successfully scheduled aur confirmation mail bhej di gayi hai!',
            data: {
                caseId: updatedCase._id,
                mode: updatedCase.sessionMode,
                date: updatedCase.sessionDate,
                time: updatedCase.sessionTime,
                link: updatedCase.googleMeetLink,
                status: updatedCase.status
            }
        });

    } catch (error) {
        console.error('Schedule Session Error:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};