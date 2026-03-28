import userAuthMiddleware from '#middlewares/UserAuthMiddleware';
import indComplaintModel from '#models/indComplaintModel';
import orgComplaintModel from '#models/orgComplaintModel';
import PaymentHistory from '#models/paymentHistoryModel';
import { queues } from '#queues/queue';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import {
    FRONTEND_URL,
    NOREPLYEMAIL,
    NewRegrecipients,
    PHONE_PAY_URL,
    PHONE_PAY_AUTH_URL,
    getPolicyEmail,
    htmlTemplate,
    httpStatus,
    httpStatusCode,
} from '#utils/constant';
import { Router } from 'express';
import { nanoid } from 'nanoid';
// crypto removed — v2 uses OAuth Bearer auth
import logger from '#utils/logger';
import AdminAuthMiddleware from '#middlewares/AdminAuthMiddleware';
import { filterSort, parseFilters } from '#utils/filterSort';
import pagination from '#utils/pagination';
import mongoose from 'mongoose';
import usermodel from '#models/userModel';

class PaymentController extends Base {
    constructor() {
        super();
        this.router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.post(
            '/payments/initiate',
            userAuthMiddleware,
            this.#initiatePayment,
        );
        this.router.get(
            '/payments/history',
            userAuthMiddleware,
            this.#getUserPaymentHistory,
        );
        this.router.get(
            '/admin/payments/history',
            AdminAuthMiddleware,
            this.#getAdminPaymentHistory,
        );
        this.router.get(
            '/admin/payments/history/recent',
            AdminAuthMiddleware,
            this.#getAdminRecentPaymentHistory,
        );

        this.router.get(
            '/payments/history/recent',
            userAuthMiddleware,
            this.#userRecentPaymentHistory,
        );
        this.router.get(
            '/payments/status/:transactionId',
            this.#paymentStatus,
        );
    }

    #getAdminRecentPaymentHistory = asyncHandler(async (req, res) => {
        const paymentHistory = await PaymentHistory.find({})
            .sort({ paymentDate: -1 })
            .limit(5)
            .select('transactionId paymentDate amount paymentStatus paymentFor')
            .populate('userId', 'name email');
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Recent Payment fetched successfully.',
            paymentHistory,
        );
    });

    #getAdminPaymentHistory = asyncHandler(async (req, res, next) => {
        try {
            let { perRow, page } = req.query;

            const { search } = new URL(req.url, `http://${req.headers.host}`);
            const { filters, Sorts } = filterSort(search);

            const filterQuery = parseFilters(filters);

            page = Number(page) || 1;
            perRow = Number(perRow) || 20;

            const skip = pagination(page, perRow);
            let email;
            if (filterQuery.email) {
                for (let key in filterQuery.email) {
                    email = filterQuery.email[key];
                }
                const userExist = await usermodel.findOne({
                    email: filterQuery.email,
                });
                if (!userExist) {
                    const data = {
                        payments: [],
                        totalCount: 0,
                    };
                    return this.response(
                        res,
                        httpStatusCode.OK,
                        httpStatus.SUCCESS,
                        'Payment History data has been fetched Successfully.',
                        data,
                    );
                }
                const [payments, totalCount] = await Promise.all([
                    PaymentHistory.find({ userId: userExist._id })
                        .populate({
                            path: 'userId',
                            select: 'email name',
                        })
                        .sort(Sorts)
                        .skip(skip)
                        .limit(perRow)
                        .exec(),
                    PaymentHistory.countDocuments({
                        userId: userExist._id,
                    }).exec(),
                ]);

                const data = {
                    payments,
                    totalCount,
                };
                return this.response(
                    res,
                    httpStatusCode.OK,
                    httpStatus.SUCCESS,
                    'Payment History data has been fetched Successfully.',
                    data,
                );
            }

            const [payments, totalCount] = await Promise.all([
                PaymentHistory.find(filterQuery)
                    .populate({
                        path: 'userId',
                        select: 'email name',
                    })
                    .sort(Sorts)
                    .skip(skip)
                    .limit(perRow)
                    .exec(),
                PaymentHistory.countDocuments(filterQuery).exec(),
            ]);

            const data = {
                payments,
                totalCount,
            };
            return this.response(
                res,
                httpStatusCode.OK,
                httpStatus.SUCCESS,
                'Payment History data has been fetched Successfully.',
                data,
            );
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                // send ok response because when we query on the id fields like userId, complaintId, subscriptionId
                // it throws error when it's not a valid objectId , to prevent it we will send the ok response
                const data = {
                    payments: [],
                    totalCount: 0,
                };
                return this.response(
                    res,
                    httpStatusCode.OK,
                    httpStatus.SUCCESS,
                    'Not found',
                    data,
                );
            }
            next(error); // Pass the error to the default error handler
        }
    });

    #userRecentPaymentHistory = asyncHandler(async (req, res) => {
        const transaction = await PaymentHistory.find({ userId: req.id })
            .sort({ createdAt: -1 })
            .limit(5);
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Recent Transaction',
            transaction,
        );
    });

    #paymentStatus = asyncHandler(async (req, res) => {
        logger.info('Payment status hit');
        const { transactionId } = req.params;
        const { id, userId, complaintType } = req.query;

        let complaint;
        switch (complaintType) {
            case 'IndividualComplaint':
                complaint = await indComplaintModel.findById(id);
                break;
            case 'OrganizationComplaint':
                complaint = await orgComplaintModel.findById(id);
                break;
            default:
                return res.redirect(
                    `${FRONTEND_URL}/failure?message=Invalid case type has been provided.`,
                );
        }

        if (!complaint) {
            return res.redirect(
                `${FRONTEND_URL}/failure?message=Complaints does not found.`,
            );
        }

        // v2 API — get OAuth Bearer token
        const authRes = await fetch(PHONE_PAY_AUTH_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: process.env.MERCHANT_ID,
                client_secret: process.env.SALT_KEY,
                grant_type: 'client_credentials',
                client_version: '1',
            }),
        });
        const authData = await authRes.json();
        if (!authData.access_token) {
            return res.redirect(`${FRONTEND_URL}/failure?message=Payment auth failed.`);
        }
        const accessToken = authData.access_token;

        const payURL = `${PHONE_PAY_URL}/order/${transactionId}/status`;
        logger.info('PHONE_PAY_URL v2 status: ' + payURL);

        const response = await fetch(payURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `O-Bearer ${accessToken}`,
            },
        });
        const { success, data, message } = await response.json();

        const paymentHistoryData = {
            paymentFor: 'Case Registration',
            userId,
            complaintId: complaint.id,
            amount: data.amount / 100,
            transactionId: data.transactionId,
            complaintType,
            paymentStatus: success ? 'Success' : 'Failed',
            individualId:
                complaintType === 'IndividualComplaint'
                    ? complaint.id
                    : undefined,
            organizationId:
                complaintType === 'OrganizationComplaint'
                    ? complaint.id
                    : undefined,
        };

        const savePaymentHistory =
            await PaymentHistory.create(paymentHistoryData);
        if (!savePaymentHistory)
            return res.redirect(
                `${FRONTEND_URL}/failure?message=Somthing went wrong.please try again.`,
            );

        if (!success) {
            logger.info(data);
            return res.redirect(`${FRONTEND_URL}/failure?message=${message}`);
        }

        let updatedComplaint;
        switch (complaintType) {
            case 'IndividualComplaint':
                updatedComplaint = await indComplaintModel.findByIdAndUpdate(
                    complaint.id,
                    {
                        paymentStatus: 'Paid',
                    },
                );
                break;
            case 'OrganizationComplaint':
                updatedComplaint = await orgComplaintModel.findByIdAndUpdate(
                    complaint.id,
                    {
                        paymentStatus: 'Paid',
                    },
                );
                break;
            default:
                return res.redirect(
                    `${FRONTEND_URL}/failure?message=Invalid complaintType`,
                );
        }
        // send Email to teams
        const policyEmail = getPolicyEmail(complaint.policyType);

        const caseData = {
            caseId: complaint.caseId,
            name:
                complaintType === 'IndividualComplaint'
                    ? complaint.name
                    : complaint.organizationName,
            email: complaint.email,
            mobile: complaint.mobile,
            amount: savePaymentHistory.amount,
            registration_date: complaint.createdAt.toLocaleString(),
            insuranceCategory: complaint.policyType,
            isPay: updatedComplaint.paymentStatus,
            transactionId: savePaymentHistory.transactionId,
        };

        const templateLinkType =
            complaintType === 'IndividualComplaint'
                ? 'individual'
                : 'organisational';

        const userTemplate = htmlTemplate(
            process.cwd() +
                `/src/templates/${templateLinkType}/SuccessPayment.html`,
            caseData,
        );
        const teamTemplate = htmlTemplate(
            process.cwd() +
                `/src/templates/${templateLinkType}/SuccessPaymentTeam.html`,
            caseData,
        );

        const caseTypeMessage = {
            from: NOREPLYEMAIL,
            to: [complaint.email],
            subject: `Confirmation of Successful Registration and Payment - Case ID: ${complaint.caseId}`,
            html: userTemplate,
        };
        queues.EmailQueue.add('send-mail', caseTypeMessage);

        const teamMessage = {
            from: NOREPLYEMAIL,
            to: [...NewRegrecipients, policyEmail],
            subject: `Successful Registration and Payment Recieved - Case Id: ${complaint.caseId}`,
            html: teamTemplate,
        };

        queues.EmailQueue.add('send-mail', teamMessage);
        return res.redirect(
            `${FRONTEND_URL}/success?amount=${data.amount}&transactionId=${data.transactionId}`,
        );
    });

    #getUserPaymentHistory = asyncHandler(async (req, res) => {
        const paymentHistory = await PaymentHistory.find({ userId: req.id })
            .populate({
                path: 'complaintId',
                select: 'name mobile email problem status organizationName',
            })
            .sort({ createdAt: -1 })
            .exec();
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Payment history fetched successfully.',
            paymentHistory,
        );
    });

    #initiatePayment = asyncHandler(async (req, res) => {
        logger.info('Payment initiate v2');
        const { complaintType, id } = req.body;

        let complaint;
        let price;
        switch (complaintType) {
            case 'IndividualComplaint':
                complaint = await indComplaintModel.findById(id);
                price = 500 * 100;
                break;
            case 'OrganizationComplaint':
                complaint = await orgComplaintModel.findById(id);
                price = 5000 * 100;
                break;
            default:
                throw new CustomError(
                    'Invalid case type has been provided.',
                    httpStatusCode.BAD_REQUEST,
                );
        }

        if (!complaint) {
            throw new CustomError(
                'Complaints does not found.',
                httpStatusCode.BAD_REQUEST,
            );
        }

        // Step 1: Get OAuth Bearer token (v2)
        const authRes = await fetch(PHONE_PAY_AUTH_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: process.env.MERCHANT_ID,
                client_version: process.env.SALT_INDEX,
                client_secret: process.env.SALT_KEY,
                grant_type: 'client_credentials',
            }),
        });
        const authData = await authRes.json();
        logger.info('PhonePe auth: ' + JSON.stringify(authData));
        if (!authData.access_token) {
            throw new CustomError(
                authData.message || 'Failed to authenticate with PhonePe.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        const accessToken = authData.access_token;

        // Step 2: Build v2 PG_CHECKOUT payload
        const orderId = nanoid().replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 63);
        const baseURl = process.env.BACKEND_URL || 'http://localhost:7000';

        const payload = {
            merchantOrderId: orderId,
            amount: price,
<<<<<<< HEAD
            expireAfter: 1200,
            paymentFlow: {
                type: 'PG_CHECKOUT',
                message: 'Payment for ICDRC Case Registration',
                merchantUrls: {
                    redirectUrl: `${baseURl}/api/payments/status/${orderId}?complaintType=${complaintType}&userId=${req.id}&id=${complaint.id}`,
                },
                paymentModeConfig: {
                    enabledPaymentModes: [
                        { type: 'UPI_QR' },
                        { type: 'UPI_INTENT' },
                        { type: 'UPI_COLLECT' },
                        { type: 'NET_BANKING' },
                        { type: 'CARD', cardTypes: ['DEBIT_CARD', 'CREDIT_CARD'] },
                    ],
                },
=======
            merchantId: process.env.MERCHANT_ID,
            merchantTransactionId: transactionId,
            mobileNumber: complaint.mobile,
            merchantUserId: 'MUId-' + req.id,
            redirectUrl: `${baseURl}/api/payments/status/${transactionId}?complaintType=${complaintType}&userId=${req.id}&id=${complaint.id}`,
           redirectMode: 'REDIRECT',
            paymentInstrument: {
                type: 'PAY_PAGE',
>>>>>>> 33a3098 (your commit message)
            },
        };

        const payURL = `${PHONE_PAY_URL}/pay`;
        logger.info('PHONEPAY_URL v2: ' + payURL);

        const response = await fetch(payURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `O-Bearer ${accessToken}`,
            },
            body: JSON.stringify(payload),
        });
        const responseData = await response.json();
        logger.info('PhonePe v2 response: ' + JSON.stringify(responseData));

        if (!response.ok || !responseData.redirectUrl) {
            throw new CustomError(
                responseData.message || 'Payment initiation failed.',
                httpStatusCode.BAD_REQUEST,
            );
        }

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Payment initiated',
            { redirectUrl: responseData.redirectUrl, orderId: responseData.orderId },
        );
    });
}

export default new PaymentController().router;
