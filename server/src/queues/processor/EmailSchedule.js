import nodemailer from "nodemailer";
import { Job } from "bullmq";
import { NOREPLYEMAIL } from "#utils/constant";
import logger from "#utils/logger";

/**
 * Process a scheduled email job.
 *
 * @param {Job} job - The job object containing the email data to be processed.
 * @returns {Promise<void>} - A promise that resolves when the email is sent.
 */
const scheduleEmailProcessor = async (job) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "mail.icdrc.in",
            port: 465,
            tls: {
                rejectUnauthorized: false,
            },
            auth: {
                user: NOREPLYEMAIL,
                pass: process.env.MAIL_PASSWORD,
            },
        });
        let info = await transporter.sendMail(job.data);
        logger.info(info.response);

    } catch (error) {
        logger.error(error)
    }
};

export default scheduleEmailProcessor;
