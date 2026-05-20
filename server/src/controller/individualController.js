import AdminAuthMiddleware from '#middlewares/AdminAuthMiddleware';
import userAuthMiddleware from '#middlewares/UserAuthMiddleware';
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
import logger from '#utils/logger';
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
        this.router.get(
            '/admin/individual/complaints/recent',
            AdminAuthMiddleware,
            this.#adminRecentComplaints,
        );

        this.router.delete(
            '/admin/individual/complaints',
            AdminAuthMiddleware,
            this.#adminDeleteComplaints,
        );
        this.router.put(
            '/admin/individual/complaints',
            AdminAuthMiddleware,
            this.#updateCaseStatus,
        );
    }

    #updateCaseStatus = asyncHandler(async (req, res) => {
        const { id, status } = req.body;
        if (req.role !== 'admin') {
            throw new CustomError(
                "You dont' have any right to change the case  status.",
                httpStatusCode.BAD_REQUEST,
            );
        }

        const updateStatus = await indComplaintModel.findByIdAndUpdate(id, {
            status,
        });
        if (!updateStatus) {
            throw new CustomError(
                'Complaint does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Case status has been updated successfully.',
        );
    });

    #adminRecentComplaints = asyncHandler(async (req, res) => {
        const complaints = await indComplaintModel
            .find({})
            .sort({ createdAt: -1 })
            .limit(5)
            .select(
                'caseId paymentStatus status  mobile policyType  createdAt email',
            );
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Recent individual compalints fetched successfully.',
            complaints,
        );
    });

    #adminDeleteComplaints = asyncHandler(async (req, res) => {
        const { individualIds } = req.body;
        if (req.role !== 'admin') {
            throw new CustomError(
                "You don't have any right to change the admin role.",
                httpStatusCode.FORBIDDEN,
            );
        }
        const deleted = await indComplaintModel.updateMany(
            { _id: { $in: individualIds } },
            { $set: { isDeleted: true } },
        );

        if (deleted.modifiedCount !== individualIds.length) {
            throw new CustomError(
                'One or more individual complaints does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Individual complaints have been deleted successfully.',
        );
    });

    #adminGetComplaints = asyncHandler(async (req, res) => {
        let { perRow, page } = req.query;
        const { search } = new URL(req.url, `http://${req.headers.host}`);
        const { filters, Sorts } = filterSort(search);

        const filterQuery = { ...parseFilters(filters), isDeleted: false };

        page = Number(page) || 1;
        perRow = Number(perRow) || 20;

        const skip = pagination(page, perRow);

        const [complaints, totalCount] = await Promise.all([
            indComplaintModel
                .find(filterQuery)
                .sort(Sorts)
                .skip(skip)
                .limit(perRow)
                .select('-isDeleted')
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
            isDeleted: false,
        });
        return res.status(httpStatusCode.OK).json({
            status: httpStatus.SUCCESS,
            statusCode: httpStatusCode.OK,
            message: 'Total Individual complaint fetched.',
            data: count,
        });
    });

    #getComplaintById = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const complaints = await indComplaintModel
            .findById(id)
            .select('-isDeleted');
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
            .find({ userId: req.id, isDeleted: false })
            .select('-isDeleted')
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
        let isIndividualPlanExist;

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

            // Clone the document
            const clonedSubscription = subscription.toObject();

            // Populate on the clone, not the original
            const subscriptionPlans = await subscriptionModel.populate(
                clonedSubscription,
                { path: 'plans.planId' },
            );

            const plans = subscriptionPlans.plans.map((plan) => plan.planId);

            isIndividualPlanExist = plans.filter(
                (plan) => plan.name === 'Individual',
            );
            if (!isIndividualPlanExist.length) {
                throw new CustomError(
                    'Your subscription does not support individual complaints. Please upgrade the subscription.',
                    httpStatusCode.BAD_REQUEST,
                );
            }
            const subscriptionStatus = checkSubscriptionStatus(
                subscription,
                isIndividualPlanExist[0]._id,
            );
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
            const updateSubscriptionLimit =
                await subscriptionModel.findOneAndUpdate(
                    {
                        _id: subscriptionId,
                        'plans.planId': isIndividualPlanExist[0]._id,
                    }, // Match subscription and specific plan
                    { $inc: { 'plans.$.usedComplaints': 1 } }, // Increment the `usedComplaints` for the matched plan
                    { new: true }, // Return the updated document
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
