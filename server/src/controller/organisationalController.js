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
import SubscriptionService from '#services/subscriptionService';
import {
    SubscriptionStatus,
    checkSubscriptionStatus,
} from '#utils/subscription';
import CustomError from '#utils/CustomError';
import subscriptionModel from '#models/subscriptionModel';
import logger from '#utils/logger';

class OrgainsationalController extends Base {
    #orgComplaintService;
    #subscriptionService;

    constructor() {
        super();
        this.router = Router();
        this.#orgComplaintService = new OrgComplaintService();
        this.#subscriptionService = new SubscriptionService();
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

    #checkSubscription(subscriptionStatus) {
        switch (subscriptionStatus) {
            case SubscriptionStatus.EXPIRED:
                throw new CustomError(
                    'Your subscription has expired.',
                    httpStatusCode.BAD_REQUEST,
                );
            case SubscriptionStatus.NOT_ACTIVE:
                throw new CustomError(
                    'Your subscription is not active.',
                    httpStatusCode.BAD_REQUEST,
                );
            case SubscriptionStatus.DOES_NOT_EXIST:
                throw new CustomError(
                    'Subscription does not exist.',
                    httpStatusCode.BAD_REQUEST,
                );
            case SubscriptionStatus.LIMIT_EXCEEDED:
                throw new CustomError(
                    'You have exceeded your complaints limit.',
                    httpStatusCode.BAD_REQUEST,
                );
            case SubscriptionStatus.VALID:
                return true;
        }
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
            isSubscribed,
            subscriptionId,
        } = req.body;

        let addData = {
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

        if (isSubscribed) {
            const subscription =
                await this.#subscriptionService.getSubscriptionById(
                    subscriptionId,
                );
            const subscriptionStatus = checkSubscriptionStatus(subscription);
            this.#checkSubscription(subscriptionStatus);
            addData.paymentStatus = 'Paid';
        }

        const addComplaints =
            await this.#orgComplaintService.addComplaints(addData);
        if (!addComplaints) {
            throw new CustomError(
                'Something went wrong, please try again.',
                httpStatusCode.BAD_REQUEST,
            );
        }

        if (isSubscribed) {
            logger.info('subscription Updated');
            const updateSubscriptionLimit =
                await subscriptionModel.findByIdAndUpdate(
                    subscriptionId,
                    { $inc: { usedComplaints: 1 } },
                    { new: true },
                );

            if (!updateSubscriptionLimit) {
                throw new CustomError(
                    'Subscription does not exist.',
                    httpStatusCode.BAD_REQUEST,
                );
            }
        }

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
        const complaints = await orgComplaintModel
            .find({ userId: req.id })
            .sort({ createdAt: -1 });
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
