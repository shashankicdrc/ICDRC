import userAuthMiddleware from '#middlewares/UserAuthMiddleware ';
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
    getPolicyEmail,
    htmlTemplate,
    httpStatus,
    httpStatusCode,
} from '#utils/constant';
import { Router } from 'express';
import { nanoid } from 'nanoid';
import crypto from 'crypto';
import logger from '#utils/logger';
import AdminAuthMiddleware from '#middlewares/AdminAuthMiddleware';
import { filterSort, parseFilters } from '#utils/filterSort';
import pagination from '#utils/pagination';
import mongoose from 'mongoose';

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
        this.router.post(
            '/payments/status/:transactionId',
            this.#paymentStatus,
        );
    }

    #getAdminRecentPaymentHistory = asyncHandler(async (req, res) => {
        const paymentHistory = await PaymentHistory.find({})
            .sort({ paymentDate: -1 })
            .limit(5)
            .select(
                'transactionId paymentDate amount paymentStatus paymentFor',
            );
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

            const [payments, totalCount] = await Promise.all([
                PaymentHistory.find(filterQuery)
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

        const merchantId = process.env.MERCHANT_ID;
        const keyIndex = process.env.SALT_INDEX;
        const string =
            `/pg/v1/status/${merchantId}/${transactionId}` +
            process.env.SALT_KEY;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;
        const UAT_PAY_API_URL =
            'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1';

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
        const { amount, complaintType, id } = req.body;

        let complaint;
        let price;
        switch (complaintType) {
            case 'IndividualComplaint':
                complaint = await indComplaintModel.findById(id);
                price = 500 * 100;
                break;
            case 'OrganizationComplaint':
                complaint = await orgComplaintModel.findById(id);
                price = 700 * 100;
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

        const transactionId = nanoid();
        const payload = {
            userId: req.id,
            email: req.email,
            name: req.name,
            amount: price,
            merchantId: process.env.MERCHANT_ID,
            merchantTransactionId: transactionId,
            mobileNumber: complaint.mobile,
            merchantUserId: 'MUId-' + req.id,
            redirectUrl: `http://localhost:7000/api/payments/status/${transactionId}?complaintType=${complaintType}&userId=${req.id}&id=${complaint.id}`,
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
            'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';

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

        const paymentHistoryData = {
            userId: req.id,
            transactionId,
            paymentStatus,
            amount,
            complaintType,
            complaintId: complaint.id,
            paymentFor,
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
            throw new CustomError(
                'Somthing went wrong.please try again.',
                httpStatusCode.BAD_REQUEST,
            );

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
            isPay: complaint.paymentStatus,
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

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Payment has beeen made successfully.',
        );
    });
}

export default new PaymentController().router;
