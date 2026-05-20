import userAuthMiddleware from '#middlewares/UserAuthMiddleware';
import MediationPaymentHistory from '#models/mediationPaymentHistoryModel';
import mediationCaseModel from '#models/mediationCaseModel'; 
import { queues } from '#queues/queue';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import {
    FRONTEND_URL,
    NOREPLYEMAIL,
    NewRegrecipients,
    PHONE_PAY_URL,
    htmlTemplate,
    httpStatus,
    httpStatusCode,
} from '#utils/constant';
import { Router } from 'express';
import crypto from 'crypto';
import logger from '#utils/logger';

class MediationPaymentController extends Base {
    constructor() {
        super();
        this.router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.post(
            '/mediation-payment/initiate',
            userAuthMiddleware,
            this.#initiateMediationPayment
        );
        this.router.post(
            '/mediation-payment/status/:transactionId',
            this.#mediationPaymentStatus
        );
    }

    // Fixed Price for Mediation: Rs. 500 for both Individual and Company
    #calculateFee(amountValue) {
        return 50000; // Fixed 50000 paise = Rs. 500
    }

    #initiateMediationPayment = asyncHandler(async (req, res) => {
        logger.info('Mediation Payment initiate');
        const { mediationId } = req.body;

        const complaint = await mediationCaseModel.findById(mediationId);
        if (!complaint) {
            throw new CustomError('Mediation case not found.', httpStatusCode.BAD_REQUEST);
        }

        if (!complaint.amount) {
             throw new CustomError('Claim amount is missing in this case.', httpStatusCode.BAD_REQUEST);
        }

        // TEMPORARY: Skip PhonePe payment for testing - directly mark as paid
        if (process.env.NODE_ENV === 'development' && process.env.SKIP_PAYMENT === 'true') {
            logger.warn('DEVELOPMENT MODE: Skipping PhonePe payment');

            const transactionId = "DEV" + Date.now();

            // Directly update case as paid
            await mediationCaseModel.findByIdAndUpdate(complaint.id, {
                paymentStatus: 'Paid',
                paymentTransactionId: transactionId,
                paidAt: new Date(),
            });

            // Save payment history
            await MediationPaymentHistory.create({
                userId: req.id,
                mediationId: complaint.id,
                amount: 500, // Rs. 500
                transactionId: transactionId,
                paymentStatus: 'Success',
            });

            return this.response(res, httpStatusCode.OK, httpStatus.SUCCESS,
                'Payment successful (development mode)', {
                transactionId,
                amount: 50000, // paise
                paymentUrl: null // No redirect needed
            });
        }

        // Validate environment variables
        if (!process.env.MERCHANT_ID || !process.env.SALT_KEY || !process.env.SALT_INDEX) {
            logger.error('Missing PhonePe configuration:', {
                hasMerchantId: !!process.env.MERCHANT_ID,
                hasSaltKey: !!process.env.SALT_KEY,
                hasSaltIndex: !!process.env.SALT_INDEX,
                phonePeEnv: process.env.PHONEPE_ENV
            });
            throw new CustomError('Payment service is not properly configured. Please contact support.', httpStatusCode.INTERNAL_SERVER_ERROR);
        }

        const basePrice = this.#calculateFee(complaint.amount);
        const price = basePrice;

        // 1. Safe Transaction ID
        const transactionId = "T" + Date.now();

        // 👉 2. Use BACKEND_URL from environment for redirect URL
        const baseURl = process.env.BACKEND_URL || 'https://api.icdrc.in';
        const redirectUrl = `${baseURl}/api/mediation-payment/status/${transactionId}?userId=${req.id}&mediationId=${complaint.id}`;

        // 3. Strict Payload
        const payload = {
            merchantId: process.env.MERCHANT_ID,
            merchantTransactionId: transactionId,
            merchantUserId: 'MUID' + req.id.toString().substring(0, 10),
            amount: price,
            redirectUrl: redirectUrl,
            redirectMode: 'POST',
            callbackUrl: redirectUrl,
            mobileNumber: '9999999999',
            paymentInstrument: { type: 'PAY_PAGE' },
        };

        const dataPayload = JSON.stringify(payload);
        const dataBase64 = Buffer.from(dataPayload).toString('base64');

        const string = dataBase64 + '/pg/v1/pay' + process.env.SALT_KEY;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + process.env.SALT_INDEX;

        const payURL = `${PHONE_PAY_URL}/pay`;
        logger.info('PhonePe payment request:', {
            url: payURL,
            merchantId: process.env.MERCHANT_ID,
            transactionId,
            amount: price
        });

        const response = await fetch(payURL, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
            },
            body: JSON.stringify({ request: dataBase64 }),
        });

        // Check if response is OK before parsing JSON
        if (!response.ok) {
            const errorText = await response.text();
            logger.error('Payment API error:', { status: response.status, body: errorText });
            throw new CustomError(`Payment API error: ${errorText}`, response.status);
        }

        const { data, success, message } = await response.json();

        if (!success) {
            throw new CustomError(message, httpStatusCode.BAD_REQUEST);
        }

        return this.response(res, httpStatusCode.OK, httpStatus.SUCCESS, message, data);
    });

    #mediationPaymentStatus = asyncHandler(async (req, res) => {
        logger.info('Mediation Payment status hit');
        const { transactionId } = req.params;
        const { userId, mediationId } = req.query;

        const complaint = await mediationCaseModel.findById(mediationId);
        if (!complaint) {
            return res.redirect(`${FRONTEND_URL}/failure?message=Mediation case not found.`);
        }

        const merchantId = process.env.MERCHANT_ID;
        const keyIndex = process.env.SALT_INDEX;
        const string = `/pg/v1/status/${merchantId}/${transactionId}` + process.env.SALT_KEY;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const payURL = `${PHONE_PAY_URL}/status/${merchantId}/${transactionId}`;

        const response = await fetch(payURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
                'X-MERCHANT-ID': `${merchantId}`,
            },
        });
        
        const { success, data, message } = await response.json();

        // Save in DB
        const savePaymentHistory = await MediationPaymentHistory.create({
            userId,
            mediationId: complaint.id,
            amount: data.amount / 100,
            transactionId: data.transactionId,
            paymentStatus: success ? 'Success' : 'Failed',
        });

        if (!savePaymentHistory) {
            return res.redirect(`${FRONTEND_URL}/failure?message=Something went wrong. Please try again.`);
        }

        if (!success) {
            return res.redirect(`${FRONTEND_URL}/failure?message=${message}`);
        }

        await mediationCaseModel.findByIdAndUpdate(complaint.id, {
            paymentStatus: 'Paid',
            paymentTransactionId: data.transactionId,
            paidAt: new Date(),
        });

        // Send payment success email
        try {
            await queues.EmailQueue.add('send-email', {
                to: complaint.email,
                subject: 'Payment Successful - ICDRC Mediation',
                html: `
                    <h2>Payment Successful</h2>
                    <p>Dear ${complaint.fullName},</p>
                    <p>Your payment of Rs. 500 has been successfully processed for your mediation case.</p>
                    <p><strong>Transaction ID:</strong> ${data.transactionId}</p>
                    <p><strong>Amount:</strong> Rs. ${data.amount / 100}</p>
                    <p>Your mediation case is now active. Our team will contact you shortly to schedule the session.</p>
                    <p>Thank you for choosing ICDRC.</p>
                    <br>
                    <p>Best regards,<br>ICDRC Team</p>
                `,
            });
        } catch (emailError) {
            logger.error('Failed to send payment success email:', emailError);
        }

        return res.redirect(
            `${FRONTEND_URL}/success?amount=${data.amount / 100}&transactionId=${data.transactionId}`
        );
    });
}

export default new MediationPaymentController().router;