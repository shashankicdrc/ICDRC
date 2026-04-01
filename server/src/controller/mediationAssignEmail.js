import MediationCase from '../models/mediationCaseModel.js'; // Matched with your screenshot
import { queues } from '../queues/queue.js'; // Matched with your screenshot

export const assignMediator = async (req, res) => {
    try {
        const { caseId } = req.params;

        // 1. Update the case status to 'Mediator Assigned'
        const updatedCase = await MediationCase.findByIdAndUpdate(
            caseId,
            { 
                status: 'Mediator Assigned' 
            },
            { new: true } 
        );

        if (!updatedCase) {
            return res.status(404).json({ success: false, message: 'Case not found' });
        }

        // 2. Generate the scheduling link for the frontend
        const scheduleLink = `${process.env.FRONTEND_URL}/schedule-session/${updatedCase._id}`;

        const emailHtml = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h3>Good news! A mediator has been assigned to your case.</h3>
                <p>Your case regarding <strong>${updatedCase.category || 'Mediation'}</strong> has been reviewed.</p>
                <p>Please click the link below to select your preferred session mode (Online/Offline) and schedule a date and time.</p>
                <a href="${scheduleLink}" style="display: inline-block; padding: 10px 20px; background-color: #004085; color: white; text-decoration: none; border-radius: 5px;">
                    Schedule Your Session
                </a>
                <p><small>If the button doesn't work, copy this link: ${scheduleLink}</small></p>
            </div>
        `;

        // 3. Add the email task to the BullMQ queue
        // Using 'to' and 'from' because your nodemailer setup expects these keys
        console.log("Mai is email par mail bhej raha hu: ", updatedCase.email);
        await queues.EmailQueue.add("send-scheduling-email", {
            from: process.env.NOREPLYEMAIL || '"ICDRC Admin" <noreply@icdrc.in>',
            to: updatedCase.email,
            subject: 'ICDRC: Mediator Assigned - Schedule Your Session',
            html: emailHtml
        });

        res.status(200).json({ 
            success: true, 
            message: 'Status updated to Mediator Assigned and scheduling email sent to queue.',
        });

    } catch (error) {
        console.error('Assign Mediator Error:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};