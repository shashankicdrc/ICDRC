import AdminAuthMiddleware from '#middlewares/AdminAuthMiddleware';
import userAuthMiddleware from '#middlewares/UserAuthMiddleware ';
import indComplaintModel from '#models/indComplaintModel';
import subscriptionModel from '#models/subscriptionModel';
import { queues } from '#queues/queue';
import IndComplaintService from '#services/indComplaintService';
import SubscriptionService from '#services/subscriptionService';
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
import { filterSort, parseFilters } from '#utils/filterSort';
import pagination from '#utils/pagination';
import {
    SubscriptionStatus,
    checkSubscriptionStatus,
} from '#utils/subscription';
import { Router } from 'express';

class IndividualController extends Base {
    #indComplaintsService;
    #subscriptionService;
    constructor() {
        super();
        this.router = Router();
        this.#indComplaintsService = new IndComplaintService();
        this.#initializeRoutes();
        this.#subscriptionService = new SubscriptionService();
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
            '/individual/complaints/count',
            userAuthMiddleware,
            this.#totalComplaintsOfUser,
        );

        this.router.get(
            '/individual/complaints/:id',
            userAuthMiddleware,
            this.#getComplaintById,
        );
        this.router.get(
            '/admin/individual/complaints',
            AdminAuthMiddleware,
            this.#adminGetComplaints,
        );
    }

    #adminGetComplaints = asyncHandler(async (req, res) => {
        let { perRow, page } = req.query;
        const { search } = new URL(req.url, `http://${req.headers.host}`);
        const { filters, Sorts } = filterSort(search);

        const filterQuery = parseFilters(filters);

        page = Number(page) || 1;
        perRow = Number(perRow) || 20;

        const skip = pagination(page, perRow);

        const [complaints, totalCount] = await Promise.all([
            indComplaintModel
                .find(filterQuery)
                .sort(Sorts)
                .skip(skip)
                .limit(perRow)
                .exec(),
            indComplaintModel.countDocuments(filterQuery).exec(),
        ]);
        const data = {
            complaints,
            totalCount,
        };
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Individual Complaint data has been fetched Successfully.',
            data,
        );
    });

    #totalComplaintsOfUser = asyncHandler(async (req, res) => {
        const count = await indComplaintModel.countDocuments({
            userId: req.id,
        });

        const formattedCount = count < 10 ? `0${count}` : `${count}`;
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Total Individual complaint fetched susccessfully.',
            formattedCount,
        );
    });

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

    #getComplaints = asyncHandler(async (req, res) => {
        const complaints = await indComplaintModel
            .find({ userId: req.id })
            .sort({ createdAt: -1 });
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
            isSubscribed,
            subscriptionId,
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
            await this.#indComplaintsService.addComplaints(addData);
        if (!addComplaints)
            throw new CustomError(
                'Somthing went wrong please try agian.',
                httpStatusCode.BAD_REQUEST,
            );

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
