import userAuthMiddleware from '#middlewares/UserAuthMiddleware';
import MediationPaymentHistory from '#models/mediationPaymentHistoryModel';
import mediationCaseModel from '#models/mediationCaseModel';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import {
    FRONTEND_URL,
    PHONE_PAY_URL,
    httpStatus,
    httpStatusCode,
} from '#utils/constant';
import { requestPhonePeAccessToken } from '#utils/phonePeOAuth';
import { Router } from 'express';
import logger from '#utils/logger';
import { nanoid } from 'nanoid';

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

    // Dynamic Price Calculator based on Claim Amount
    #calculateFee(amountValue) {
        const amount = Number(amountValue);
        if (isNaN(amount) || amount === 0) return 5000;
        if (amount <= 500000) return 5;          // Up to 5L -> 5k
        if (amount <= 5000000) return 10000;        // 5L to 50L -> 10k
        if (amount <= 10000000) return 15000;       // 50L to 1Cr -> 15k
        return 25000;                               // Above 1Cr -> 25k
    }

    #initiateMediationPayment = asyncHandler(async (req, res) => {
        logger.info('Mediation Payment initiate v2');
        const { mediationId } = req.body;

        const complaint = await mediationCaseModel.findById(mediationId);
        if (!complaint) {
            throw new CustomError(
                'Mediation case not found.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        if (String(complaint.userId) !== String(req.id)) {
            throw new CustomError(
                'Not allowed for this mediation case.',
                httpStatusCode.FORBIDDEN,
            );
        }

        if (!complaint.amount) {
            throw new CustomError(
                'Claim amount is missing in this case.',
                httpStatusCode.BAD_REQUEST,
            );
        }

        const basePrice = this.#calculateFee(complaint.amount);
        const price = basePrice * 100;

        const accessToken = await requestPhonePeAccessToken(
            process.env.SALT_INDEX,
        );

        const orderId = nanoid()
            .replace(/[^a-zA-Z0-9_-]/g, '')
            .slice(0, 63);
        const baseURl = process.env.BACKEND_URL || 'http://localhost:8080';

        const payload = {
            merchantOrderId: orderId,
            amount: price,
            expireAfter: 1200,
            paymentFlow: {
                type: 'PG_CHECKOUT',
                message: 'Payment for ICDRC Mediation',
                merchantUrls: {
                    redirectUrl: `${baseURl}/api/mediation-payment/status/${orderId}?userId=${req.id}&mediationId=${complaint.id}`,
                },
                paymentModeConfig: {
                    enabledPaymentModes: [
                        { type: 'UPI_QR' },
                        { type: 'UPI_INTENT' },
                        { type: 'UPI_COLLECT' },
                        { type: 'NET_BANKING' },
                        {
                            type: 'CARD',
                            cardTypes: ['DEBIT_CARD', 'CREDIT_CARD'],
                        },
                    ],
                },
            },
        };

        const payURL = `${PHONE_PAY_URL}/pay`;
        const response = await fetch(payURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `O-Bearer ${accessToken}`,
            },
            body: JSON.stringify(payload),
        });

        const raw = await response.text();
        let responseData;
        try {
            responseData = JSON.parse(raw);
        } catch {
            throw new CustomError(
                `PhonePe returned a non-JSON response: ${raw.slice(0, 240)}`,
                httpStatusCode.BAD_REQUEST,
            );
        }
        logger.info('PhonePe v2 mediation pay: ' + JSON.stringify(responseData));

        if (!response.ok || !responseData.redirectUrl) {
            throw new CustomError(
                responseData.message || 'Payment initiation failed.',
                httpStatusCode.BAD_REQUEST,
            );
        }

        return this.response(res, httpStatusCode.OK, httpStatus.SUCCESS, 'Payment initiated', {
            redirectUrl: responseData.redirectUrl,
            orderId: responseData.orderId,
        });
    });

    #mediationPaymentStatus = asyncHandler(async (req, res) => {
        logger.info('Mediation Payment status hit');
        const { transactionId: orderId } = req.params;
        const { userId, mediationId } = req.query;

        const complaint = await mediationCaseModel.findById(mediationId);
        if (!complaint) {
            return res.redirect(
                `${FRONTEND_URL}/failure?message=Mediation case not found.`,
            );
        }
        if (String(complaint.userId) !== String(userId)) {
            return res.redirect(
                `${FRONTEND_URL}/failure?message=Invalid payment session.`,
            );
        }

        let accessToken;
        try {
            accessToken = await requestPhonePeAccessToken('1');
        } catch {
            return res.redirect(
                `${FRONTEND_URL}/failure?message=Payment%20auth%20failed.`,
            );
        }

        const payURL = `${PHONE_PAY_URL}/order/${orderId}/status`;
        const response = await fetch(payURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `O-Bearer ${accessToken}`,
            },
        });

        const raw = await response.text();
        let body;
        try {
            body = JSON.parse(raw);
        } catch {
            return res.redirect(
                `${FRONTEND_URL}/failure?message=Invalid response from payment provider.`,
            );
        }

        const { success, data, message } = body;
        const amountPaise = data?.amount ?? 0;
        const txnId = data?.transactionId ?? orderId;

        const savePaymentHistory = await MediationPaymentHistory.create({
            userId,
            mediationId: complaint.id,
            amount: amountPaise / 100,
            transactionId: txnId,
            paymentStatus: success ? 'Success' : 'Failed',
        });

        if (!savePaymentHistory) {
            return res.redirect(
                `${FRONTEND_URL}/failure?message=Something went wrong. Please try again.`,
            );
        }

        if (!success) {
            return res.redirect(
                `${FRONTEND_URL}/failure?message=${encodeURIComponent(message || 'Payment failed.')}`,
            );
        }

        await mediationCaseModel.findByIdAndUpdate(complaint.id, {
            status: 'Paid',
        });

        return res.redirect(
            `${FRONTEND_URL}/success?amount=${amountPaise / 100}&transactionId=${txnId}`,
        );
    });
}

export default new MediationPaymentController().router;