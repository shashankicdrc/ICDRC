import orgComplaintModel from '#models/orgComplaintModel';
import { Base } from '#utils/Base';
import { Router } from 'express';
import userAuthMiddleware from '#middlewares/UserAuthMiddleware ';
import OrgComplaintService from '#services/orgComplaintService';
import asyncHandler from '#utils/asyncHandler';
import {
    htmlTemplate,
    NOREPLYEMAIL,
    NewRegrecipients,
    httpStatus,
    httpStatusCode,
} from '#utils/constant';
import { queues } from '#queues/queue';

class OrgainsationalController extends Base {
    #orgComplaintService;

    constructor() {
        super();
        this.router = Router();
        this.#orgComplaintService = new OrgComplaintService();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.get(
            '/organisational/complaints',
            userAuthMiddleware,
            this.#getComplaints,
        );
        this.router.post(
            '/organisational/complaints',
            userAuthMiddleware,
            this.#addComplaints,
        );
    }

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
            organizationName,
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
            organizationName,
        };

        const addComplaints =
            await this.#orgComplaintService.addComplaints(addData);
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

        const templateLink = '/src/templates/organisational/NewRegTeam.html';

        const html = htmlTemplate(process.cwd() + templateLink, caseData);
        const NewMessage = {
            from: NOREPLYEMAIL,
            to: [...NewRegrecipients],
            subject:
                'New Registration Form Submission on ICDRC Website for an Organisation',
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

    #getComplaints = asyncHandler(async (req, res) => {
        const complaints = await orgComplaintModel.find({ userId: req.id });
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Organisational complaints fetched successfully.',
            complaints,
        );
    });
}

export default new OrgainsationalController().router;
