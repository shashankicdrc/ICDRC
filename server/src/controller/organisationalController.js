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
import { filterSort, parseFilters } from '#utils/filterSort';
import AdminAuthMiddleware from '#middlewares/AdminAuthMiddleware';
import pagination from '#utils/pagination';

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
        this.router.get(
            '/organisational/complaints/count',
            userAuthMiddleware,
            this.#totalComplaintsOfUser,
        );

        this.router.post(
            '/organisational/complaints',
            userAuthMiddleware,
            this.#addComplaints,
        );
        this.router.get(
            '/admin/organisational/complaints',
            AdminAuthMiddleware,
            this.#getadminsComplaint,
        );
        this.router.get(
            '/admin/organisational/complaints/recent',
            AdminAuthMiddleware,
            this.#adminRecentComplaints,
        );

        this.router.delete(
            '/admin/organisational/complaints',
            AdminAuthMiddleware,
            this.#adminComplaintDelete,
        );

        this.router.get(
            '/admin/organisational/complaints/organisationName',
            AdminAuthMiddleware,
            this.#getOrganizationName,
        );
        this.router.get(
            '/organisational/complaints/:id',
            userAuthMiddleware,
            this.#getOrganisationCaseById,
        );
        this.router.put(
            '/admin/organisational/complaints',
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

        const updateStatus = await orgComplaintModel.findByIdAndUpdate(id, {
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

    #getOrganisationCaseById = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const data = await orgComplaintModel.findById(id);
        if (!data)
            throw new CustomError(
                'Case does not exist.',
                httpStatusCode.BAD_REQUEST,
            );

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Fetched successfully',
            data,
        );
    });

    #adminRecentComplaints = asyncHandler(async (req, res) => {
        const complaints = await orgComplaintModel
            .find({})
            .sort({ createdAt: -1 })
            .limit(5)
            .select(
                'caseId paymentStatus status  mobile policyType  createdAt organizationName',
            );
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Recent organisational compalints fetched successfully.',
            complaints,
        );
    });

    #adminComplaintDelete = asyncHandler(async (req, res) => {
        const { organisationalIds } = req.body;
        const deletedData = await orgComplaintModel.updateMany(
            {
                _id: { $in: organisationalIds },
            },
            { $set: { isDeleted: true } },
        );
        if (deletedData.modifiedCount !== organisationalIds.length) {
            throw new CustomError(
                'One or more organisational complaints does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Organisational complaints have been deleted successfully.',
        );
    });

    #getOrganizationName = asyncHandler(async (req, res) => {
        const orgName = await orgComplaintModel
            .find({})
            .select('organizationName');
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Organization Name fetched successfully.',
            orgName,
        );
    });

    #getadminsComplaint = asyncHandler(async (req, res) => {
        let { perRow, page } = req.query;
        const { search } = new URL(req.url, `http://${req.headers.host}`);
        const { filters, Sorts } = filterSort(search);

        const filterQuery = { ...parseFilters(filters), isDeleted: false };

        page = Number(page) || 1;
        perRow = Number(perRow) || 20;

        const skip = pagination(page, perRow);

        const [complaints, totalCount] = await Promise.all([
            orgComplaintModel
                .find(filterQuery)
                .sort(Sorts)
                .skip(skip)
                .limit(perRow)
                .exec(),
            orgComplaintModel.countDocuments(filterQuery).exec(),
        ]);
        const data = {
            complaints,
            totalCount,
        };
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Organisational Complaint data has been fetched Successfully.',
            data,
        );
    });

    #totalComplaintsOfUser = asyncHandler(async (req, res) => {
        const count = await orgComplaintModel.countDocuments({
            userId: req.id,
        });

        return res.status(httpStatusCode.OK).json({
            status: httpStatus.SUCCESS,
            statusCode: httpStatusCode.OK,
            message: 'Total Organisational complaint fetched.',
            data: count,
        });
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

        let isOrganisationalPlanExist;
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
            // Clone the document
            const clonedSubscription = subscription.toObject();

            // Populate on the clone, not the original
            const subscriptionPlans = await subscriptionModel.populate(
                clonedSubscription,
                { path: 'plans.planId' },
            );

            const plans = subscriptionPlans.plans.map((plan) => plan.planId);

            isOrganisationalPlanExist = plans.filter(
                (plan) => plan.name === 'Organisational',
            );

            if (!isOrganisationalPlanExist.length) {
                throw new CustomError(
                    'Your subscription does not support organisational complaints. Please upgrade the subscription.',
                    httpStatusCode.BAD_REQUEST,
                );
            }

            const subscriptionStatus = checkSubscriptionStatus(
                subscription,
                isOrganisationalPlanExist[0]._id,
            );
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
                await subscriptionModel.findOneAndUpdate(
                    {
                        _id: subscriptionId,
                        'plans.planId': isOrganisationalPlanExist[0]._id,
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
            .find({ userId: req.id, isDeleted: false })
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
