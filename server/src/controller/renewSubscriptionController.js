import planModel from '#models/planModel';
import SubscriptionService from '#services/subscriptionService';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import {
    FRONTEND_URL,
    PHONE_PAY_URL,
    httpStatus,
    httpStatusCode,
} from '#utils/constant';
import { nanoid } from 'nanoid';
import userAuthMiddleware from '#middlewares/UserAuthMiddleware';
import crypto from 'crypto';
import logger from '#utils/logger';
import PaymentHistory from '#models/paymentHistoryModel';
import { Router } from 'express';

class RenewSubscriptionController extends Base {
    #subscriptionService;

    constructor() {
        super();
        this.router = Router();
        this.#initializeRoutes();
        this.#subscriptionService = new SubscriptionService();
    }

    #initializeRoutes() {
        this.router.post(
            '/subscription/renew/initiate',
            userAuthMiddleware,
            this.#initiateRenew,
        );

        this.router.post(
            '/subscription/renew/status/:transactionId',
            this.#checkStatus,
        );
    }

    #checkStatus = asyncHandler(async (req, res) => {
        logger.info('Subscription status initiate');

        const { transactionId } = req.params;
        const { planId, userId } = req.query;

        const plan = await planModel.findById(planId);
        if (!plan) {
            return res.redirect(
                `${FRONTEND_URL}/failure?message=Plan does not exist.`,
            );
        }

        const merchantId = process.env.MERCHANT_ID;
        const keyIndex = process.env.SALT_INDEX;
        const string =
            `/pg/v1/status/${merchantId}/${transactionId}` +
            process.env.SALT_KEY;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const payURL = `${PHONE_PAY_URL}/status/${merchantId}/${transactionId}`;
        logger.info('PhonePayURL');
        logger.info(payURL);

        const response = await fetch(`${payURL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
                'X-MERCHANT-ID': `${merchantId}`,
            },
        });
        const { success, data, message } = await response.json();
        if (!success) {
            return res.redirect(`${FRONTEND_URL}/failure?message=${message}`);
        }

        const isUserSubscription =
            await this.#subscriptionService.getUserSubscription(userId);

        if (!isUserSubscription) {
            return res.redirect(
                `${FRONTEND_URL}/failure?message=You don't have any subscription.`,
            );
        }

        const userExistingPlan = isUserSubscription.plans.filter(
            (item) => item.planId._id.toString() === plan._id.toString(),
        );

        const endDate = userExistingPlan[0].endDate.setDate(
            userExistingPlan[0].endDate.getDate() + 180,
        );

        const updateSubscriptionData = {
            planId: plan.id,
            endDate,
        };
        const subscriptionData =
            await this.#subscriptionService.updateSubscription(
                isUserSubscription._id,
                updateSubscriptionData,
            );

        const paymentHistoryData = {
            userId,
            amount: data.amount / 100,
            transactionId: data.transactionId,
            paymentFor: 'Subscription',
            paymentStatus: 'Success',
            subscriptionId: subscriptionData.id,
        };

        await PaymentHistory.create(paymentHistoryData);

        return res.redirect(
            `${FRONTEND_URL}/success?amount=${data.amount}&transactionId=${data.transactionId}`,
        );
    });

    #initiateRenew = asyncHandler(async (req, res) => {
        logger.info('Renew Subscription payment initiate');
        const { planId } = req.query;
        const isPlan = await planModel.findById(planId);
        if (!isPlan) {
            throw new CustomError(
                'Plan does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }

        const isUserSubscription =
            await this.#subscriptionService.getUserSubscription(req.id);

        if (!isUserSubscription) {
            throw new CustomError(
                "You don't have any subscription.",
                httpStatusCode.BAD_REQUEST,
            );
        }
        const transactionId = nanoid();

        const redirectUrl =
            process.env.NODE_ENV === 'production'
                ? `${process.env.BACKEND_URL}/api/subscription/renew/status/${transactionId}?planId=${isPlan.id}&userId=${req.id}`
                : `http://localhost:7000/api/subscription/renew/status/${transactionId}?planId=${isPlan.id}&userId=${req.id}`;

        const payload = {
            userId: req.id,
            email: req.email,
            name: req.name,
            amount: isPlan.price * 100,
            merchantId: process.env.MERCHANT_ID,
            merchantTransactionId: transactionId,
            merchantUserId: 'MUId-' + req.id,
            redirectUrl,
            redirectMode: 'POST',
            paymentInstrument: {
                type: 'PAY_PAGE',
            },
        };

        const dataPayload = JSON.stringify(payload);
        const dataBase64 = Buffer.from(dataPayload).toString('base64');

        const string = dataBase64 + '/pg/v1/pay' + process.env.SALT_KEY;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + process.env.SALT_INDEX;

        const payURL = `${PHONE_PAY_URL}/pay`;
        logger.info('PHONE_PAY_URL');
        logger.info(payURL);

        const response = await fetch(payURL, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
            },
            body: JSON.stringify({ request: dataBase64 }),
        });
        const { data, success, message } = await response.json();
        if (!success) {
            throw new CustomError(message, httpStatusCode.BAD_REQUEST);
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            message,
            data,
        );
    });
}

export default new RenewSubscriptionController().router;
