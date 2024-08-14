import AdminAuthMiddleware from '#middlewares/AdminAuthMiddleware';
import indComplaintModel from '#models/indComplaintModel';
import orgComplaintModel from '#models/orgComplaintModel';
import { queues } from '#queues/queue';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import {
    NOREPLYEMAIL,
    NewRegrecipients,
    htmlTemplate,
    httpStatus,
    httpStatusCode,
} from '#utils/constant';
import { Router } from 'express';

class ComplaintsController extends Base {
    constructor() {
        super();
        this.router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.put(
            '/complaints',
            AdminAuthMiddleware,
            this.#updateComplaints,
        );
    }

    #updateComplaints = asyncHandler(async (req, res) => {
        const { id, complaintType, status } = req.body;
        let updatedResult;
        switch (complaintType) {
            case 'IndividualComplaint':
                updatedResult = await indComplaintModel.findByIdAndUpdate(id, {
                    status,
                });
                break;
            case 'OrganizationComplaint':
                updatedResult = await orgComplaintModel.findByIdAndUpdate(id, {
                    status,
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

        const complaintData = {
            caseId: updatedResult.caseId,
            name:
                complaintType === 'IndividualComplaint'
                    ? updatedResult.name
                    : updatedResult.organizationName,
            date: updatedResult.updatedAt.toLocaleString(),
            status: updatedResult.status,
        };
        const template = htmlTemplate(
            process.cwd() + `/src/templates/UpdateCase.html`,
            complaintData,
        );

        const message = {
            from: NOREPLYEMAIL,
            to: [...NewRegrecipients, updatedResult.email],
            subject: ` Update on Your Case Status with ICDRC - Case ID:  ${updatedResult.caseId}`,
            html: template,
        };
        queues.EmailQueue.add('send-email', message);
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Complaints has been updated successfully.',
        );
    });
}

export default new ComplaintsController().router;
