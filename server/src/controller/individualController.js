import userAuthMiddleware from '#middlewares/UserAuthMiddleware ';
import indComplaintModel from '#models/indComplaintModel';
import { queues } from '#queues/queue';
import IndComplaintService from '#services/indComplaintService';
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

class IndividualController extends Base {
    #indComplaintsService;
    constructor() {
        super();
        this.router = Router();
        this.#indComplaintsService = new IndComplaintService();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.post(
            '/individual/complaints',
            userAuthMiddleware,
            this.#addComplaints,
        );
        this.router.get(
            '/individual/complaints',
            userAuthMiddleware,
            this.#getComplaints,
        );
        this.router.get(
            '/individual/complaints/:id',
            userAuthMiddleware,
            this.#getComplaintById,
        );
    }

    #getComplaintById = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const complaints = await indComplaintModel.findById(id);
        if (!complaints) {
            throw new CustomError(
                'complaints does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        if (complaints.userId.toString() !== req.id) {
            throw new CustomError(
                "You don't have any right to access the data.",
                httpStatusCode.UNAUTHORIZED,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Complaints fetched successfully.',
            complaints,
        );
    });

    #getComplaints = asyncHandler(async (req, res) => {
        const complaints = await indComplaintModel.find({ userId: req.id });
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Individual complaints fetched successfully.',
            complaints,
        );
    });

    #addComplaints = asyncHandler(async (req, res) => {
        const {
            name,
            mobile,
            email,
            state,
            city,
            address,
            language,
            policyCompany,
            policyType,
            problem,
            problemDetails,
        } = req.body;

        const addData = {
            name,
            mobile,
            email,
            state,
            city,
            address,
            language,
            policyCompany,
            policyType,
            problem,
            problemDetails,
            userId: req.id,
        };

        const addComplaints =
            await this.#indComplaintsService.addComplaints(addData);
        if (!addComplaints)
            throw new CustomError(
                'Somthing went wrong please try agian.',
                httpStatusCode.BAD_REQUEST,
            );

        const caseData = {
            name: addComplaints.name,
            email: addComplaints.email,
            mobile: addComplaints.mobile,
            date: addComplaints.createdAt.toLocaleString(),
        };

        const templateLink = '/src/templates/individual/NewRegTeam.html';

        const html = htmlTemplate(process.cwd() + templateLink, caseData);
        const NewMessage = {
            from: NOREPLYEMAIL,
            to: [...NewRegrecipients],
            subject:
                'New Registration Form Submission on ICDRC Website for an Individual',
            html,
        };

        queues.EmailQueue.add('send-email', NewMessage);
        const message = `Your case has been registered successfully.`;
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            message,
            addComplaints,
        );
    });
}

export default new IndividualController().router;
