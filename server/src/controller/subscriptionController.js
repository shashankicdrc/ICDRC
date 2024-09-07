import planModel from '#models/planModel';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import { FRONTEND_URL, httpStatus, httpStatusCode } from '#utils/constant';
import { Router } from 'express';
import { nanoid } from 'nanoid';
import userAuthMiddleware from '#middlewares/UserAuthMiddleware ';
import crypto from 'crypto';
import SubscriptionService from '#services/subscriptionService';
import PaymentHistory from '#models/paymentHistoryModel';
import {
    SubscriptionStatus,
    checkSubscriptionStatus,
} from '#utils/subscription';
import logger from '#utils/logger';
import { filterSort, parseFilters } from '#utils/filterSort';
import pagination from '#utils/pagination';
import subscriptionModel from '#models/subscriptionModel';
import AdminAuthMiddleware from '#middlewares/AdminAuthMiddleware';
import mongoose from 'mongoose';

class SubscriptionController extends Base {
    #subscriptionService;
    constructor() {
        super();
        this.router = Router();
        this.#initializeRoutes();
        this.#subscriptionService = new SubscriptionService();
    }

    #initializeRoutes() {
        this.router.post(
            '/subscription/initiate',
            userAuthMiddleware,
            this.#intiateSubscription,
        );
        this.router.post(
            '/subscription/status/:transactionId',
            this.#checkStatus,
        );
        this.router.get(
            '/subscription/user',
            userAuthMiddleware,
            this.#userSubscription,
        );
        this.router.get(
            '/admin/subscription',
            AdminAuthMiddleware,
            this.#adminSubscription,
        );
    }

    #adminSubscription = asyncHandler(async (req, res, next) => {
        try {
            let { perRow, page } = req.query;
            const { search } = new URL(req.url, `http://${req.headers.host}`);
            const { filters, Sorts } = filterSort(search);

            const filterQuery = parseFilters(filters);

            page = Number(page) || 1;
            perRow = Number(perRow) || 20;

            const skip = pagination(page, perRow);

            const [subscriptions, totalCount] = await Promise.all([
                subscriptionModel
                    .find(filterQuery)
                    .populate({
                        path: 'planId',
                        select: 'name',
                    })
                    .sort(Sorts)
                    .skip(skip)
                    .limit(perRow)
                    .exec(),
                subscriptionModel.countDocuments(filterQuery).exec(),
            ]);
            const data = {
                subscriptions,
                totalCount,
            };
            return this.response(
                res,
                httpStatusCode.OK,
                httpStatus.SUCCESS,
                'Subscription data has been fetched Successfully.',
                data,
            );
        } catch (error) {
            // send ok response because when we query on the id fields like userId, complaintId, subscriptionId
            // it throws error when it's not a valid objectId , to prevent it we will send the ok response

            if (error instanceof mongoose.Error.CastError) {
                const data = {
                    subscriptions: [],
                    totalCount: 0,
                };
                return this.response(
                    res,
                    httpStatusCode.OK,
                    httpStatus.SUCCESS,
                    'Not Found',
                    data,
                );
            }
            next(error);
        }
    });

    #checkSubscription(subscriptionStatus) {
        switch (subscriptionStatus) {
            case SubscriptionStatus.EXPIRED:
                return false;
            case SubscriptionStatus.DOES_NOT_EXIST:
                return false;
            case SubscriptionStatus.LIMIT_EXCEEDED:
                return false;
            case SubscriptionStatus.VALID:
                console.log('checkSubscription', true);
                return true;
        }
    }

    #userSubscription = asyncHandler(async (req, res) => {
        const subscription =
            await this.#subscriptionService.getUserSubscription(req.id);
        if (!subscription) {
            throw new CustomError(
                'User does not have any subscription',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Subscription fetched successfully.',
            subscription,
        );
    });

    #checkStatus = asyncHandler(async (req, res) => {
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
        const UAT_PAY_API_URL =
            process.env.NODE_ENV === 'production'
                ? process.env.PHONEPAY_URL
                : 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';

        const response = await fetch(
            `${UAT_PAY_API_URL}/status/${merchantId}/${transactionId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-VERIFY': checksum,
                    'X-MERCHANT-ID': `${merchantId}`,
                },
            },
        );
        const { success, data, message } = await response.json();
        if (!success) {
            return res.redirect(`${FRONTEND_URL}/failure?message=${message}`);
        }
        let subscriptionData;

        const isUserSubscription =
            await this.#subscriptionService.getUserSubscription(userId);

        if (isUserSubscription) {
            const updateSubscriptionData = {
                planId: plan.id,
                complaintLimit: plan.complaintLimit,
                usedComplaints: 0,
                startDate: new Date(),
                endDate: new Date(
                    Date.now() + plan.durationInDays * 24 * 60 * 60 * 1000,
                ),
            };
            subscriptionData =
                await this.#subscriptionService.updateSubscription(
                    isUserSubscription._id,
                    updateSubscriptionData,
                );
        } else {
            subscriptionData =
                await this.#subscriptionService.createSubscription(
                    planId,
                    userId,
                );
        }

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

    #intiateSubscription = asyncHandler(async (req, res) => {
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
        logger.info(isUserSubscription);

        const subscriptionStatus = checkSubscriptionStatus(isUserSubscription);

        const isValidSubscription = this.#checkSubscription(subscriptionStatus);
        if (
            isValidSubscription &&
            isUserSubscription.planId.toString() === planId
        ) {
            throw new CustomError(
                'You have already an active subscription with same plan.',
                httpStatusCode.BAD_REQUEST,
            );
        }

        const transactionId = nanoid();

        const redirectUrl =
            process.env.NODE_ENV === 'production'
                ? `${process.env.BACKEND_URL}/api/subscription/status/${transactionId}?planId=${isPlan.id}&userId=${req.id}`
                : `http://localhost:7000/api/subscription/status/${transactionId}?planId=${isPlan.id}&userId=${req.id}`;

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
        const UAT_PAY_API_URL =
            process.env.NODE_ENV === 'production'
                ? process.env.PHONEPAY_URL
                : 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';

        const response = await fetch(UAT_PAY_API_URL, {
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

export default new SubscriptionController().router;
