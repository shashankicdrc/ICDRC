// test-email.js
import 'dotenv/config';
import nodemailer from 'nodemailer';

// Change this to your own inbox (Gmail, etc.)
const TEST_RECIPIENT = 'rahulshraff618@gmail.com';

async function main() {
    try {
        const host = process.env.MAIL_HOST || 'mail.icdrc.in';
        const port = parseInt(process.env.MAIL_PORT || '465', 10);
        const secure =
            typeof process.env.MAIL_SECURE === 'string'
                ? process.env.MAIL_SECURE.toLowerCase() === 'true'
                : port === 465;

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            connectionTimeout: parseInt(
                process.env.MAIL_CONNECTION_TIMEOUT_MS || '20000',
                10,
            ),
            greetingTimeout: parseInt(process.env.MAIL_GREETING_TIMEOUT_MS || '20000', 10),
            socketTimeout: parseInt(process.env.MAIL_SOCKET_TIMEOUT_MS || '20000', 10),
            tls: {
                rejectUnauthorized: false,
            },
            auth: {
                user: process.env.NOREPLYEMAIL || 'no_reply@icdrc.in',
                pass: process.env.MAIL_PASSWORD,
            },
        });

        console.log('Sending test email...');

        const info = await transporter.sendMail({
            from: process.env.NOREPLYEMAIL || 'no_reply@icdrc.in',
            to: TEST_RECIPIENT,
            subject: 'ICDRC SMTP Test Email',
            text: 'This is a plain-text test email from the ICDRC backend.',
            html: '<p>This is a <b>test email</b> from the ICDRC backend.</p>',
        });

        console.log('Email sent successfully.');
        console.log('Message ID:', info.messageId);
        console.log('Server response:', info.response);
    } catch (err) {
        console.error('Error sending email:');
        console.error(err);
    }
}

main();