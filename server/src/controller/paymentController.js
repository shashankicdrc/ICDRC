import userAuthMiddleware from '#middlewares/UserAuthMiddleware ';
import indComplaintModel from '#models/indComplaintModel';
import orgComplaintModel from '#models/orgComplaintModel';
import PaymentHistory from '#models/paymentHistoryModel';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import { httpStatus, httpStatusCode } from '#utils/constant';
import { Router } from 'express';

class PaymentController extends Base {
    #router;
    constructor() {
        super();
        this.router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.post('/payments', userAuthMiddleware, this.#updatePayment);
        this.router.get(
            '/payments/history',
            userAuthMiddleware,
            this.#getUserPaymentHistory,
        );
    }

    #getUserPaymentHistory = asyncHandler(async (req, res) => {
        const paymentHistory = await PaymentHistory.find({ userId: req.id })
            .populate({
                path: 'complaintId',
                select: 'name mobile email problem status organizationName',
            })
            .exec();
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Payment history fetched successfully.',
            paymentHistory,
        );
    });

    #updatePayment = asyncHandler(async (req, res) => {
        const {
            amount,
            paymentFor,
            transactionId,
            paymentStatus,
            complaintType,
            id,
        } = req.body;

        let updatedResult;
        switch (complaintType) {
            case 'IndividualComplaint':
                updatedResult = await indComplaintModel.findByIdAndUpdate(id, {
                    paymentStatus,
                });
                break;
            case 'OrganizationComplaint':
                updatedResult = await orgComplaintModel.findByIdAndUpdate(id, {
                    paymentStatus,
                });
                break;
            default:
                throw new CustomError(
                    'Invalid case type has been provided.',
                    httpStatusCode.BAD_REQUEST,
                );
        }

        if (!updatedResult) {
            throw new CustomError(
                'Complaints does not found.',
                httpStatusCode.BAD_REQUEST,
            );
        }

        const paymentHistoryData = {
            userId: req.id,
            transactionId,
            paymentStatus,
            amount,
            complaintType,
            complaintId: updatedResult.id,
            paymentFor,
            individualId:
                complaintType === 'IndividualComplaint'
                    ? updatedResult.id
                    : undefined,
            organizationId:
                complaintType === 'OrganizationComplaint'
                    ? updatedResult.id
                    : undefined,
        };
        const savePaymentHistory =
            await PaymentHistory.create(paymentHistoryData);
        if (!savePaymentHistory)
            throw new CustomError(
                'Somthing went wrong.please try again.',
                httpStatusCode.BAD_REQUEST,
            );
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Payment has beeen made successfully.',
        );
    });
}

export default new PaymentController().router;
