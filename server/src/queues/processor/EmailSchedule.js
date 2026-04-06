import nodemailer from "nodemailer";
import { Job } from "bullmq";
import { NOREPLYEMAIL } from "#utils/constant";
import logger from "#utils/logger";
import { emailSentTotal, emailFailuresTotal } from "#utils/metrics";

/**
 * Process a scheduled email job.
 *
 * @param {Job} job - The job object containing the email data to be processed.
 * @returns {Promise<void>} - A promise that resolves when the email is sent.
 */
const scheduleEmailProcessor = async (job) => {
    try {
        const host = process.env.MAIL_HOST || "mail.icdrc.in";
        const port = parseInt(process.env.MAIL_PORT || "465", 10);
        const secure =
            typeof process.env.MAIL_SECURE === "string"
                ? process.env.MAIL_SECURE.toLowerCase() === "true"
                : port === 465;
        const noreplyEmail = process.env.NOREPLYEMAIL || NOREPLYEMAIL;
        // MAIL_USER = SMTP login credential (e.g. Gmail account)
        // Falls back to noreplyEmail for servers where login = from address
        const authUser = process.env.MAIL_USER || noreplyEmail;

        let transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            connectionTimeout: parseInt(
                process.env.MAIL_CONNECTION_TIMEOUT_MS || "20000",
                10,
            ),
            greetingTimeout: parseInt(
                process.env.MAIL_GREETING_TIMEOUT_MS || "20000",
                10,
            ),
            socketTimeout: parseInt(process.env.MAIL_SOCKET_TIMEOUT_MS || "20000", 10),
            tls: {
                rejectUnauthorized: false,
            },
            auth: {
                user: authUser,
                pass: process.env.MAIL_PASSWORD,
            },
        });
        let info = await transporter.sendMail(job.data);
        logger.info(info.response);

        // ─── Track successful sends by job name ───────────────────────────────
        const emailType = job.name ?? 'unknown';
        emailSentTotal.inc({ type: emailType });

    } catch (error) {
        // Log the underlying nodemailer error (EAUTH/ETIMEDOUT/550/etc.)
        logger.error(error);
        logger.error({
            message: {
                event: "Failed to send scheduled email",
                mailHost: process.env.MAIL_HOST || "mail.icdrc.in",
                mailPort: process.env.MAIL_PORT || "465",
                mailUser: process.env.NOREPLYEMAIL || NOREPLYEMAIL,
                jobId: job?.id,
                queue: job?.queueName,
                errorCode: error?.code,
                errorResponseCode: error?.responseCode,
                errorResponse: error?.response,
                command: error?.command,
            },
        });

        // ─── Track failed sends by type and SMTP error code ───────────────────
        const emailType = job?.name ?? 'unknown';
        const errorCode = error?.code ?? error?.responseCode ?? 'UNKNOWN';
        emailFailuresTotal.inc({ type: emailType, error_code: String(errorCode) });
    }
};

export default scheduleEmailProcessor;
