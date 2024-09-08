import AdminAuthMiddleware from '#middlewares/AdminAuthMiddleware';
import userAuthMiddleware from '#middlewares/UserAuthMiddleware ';
import indComplaintModel from '#models/indComplaintModel';
import orgComplaintModel from '#models/orgComplaintModel';
import PaymentHistory from '#models/paymentHistoryModel';
import subscriptionModel from '#models/subscriptionModel';
import { Base } from '#utils/Base';
import asyncHandler from '#utils/asyncHandler';
import { httpStatus, httpStatusCode } from '#utils/constant';
import logger from '#utils/logger';
import { checkSubscriptionStatus } from '#utils/subscription';
import { Router } from 'express';

class AnalyticsController extends Base {
    constructor() {
        super();
        this.router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.get(
            '/analytics/complaints',
            AdminAuthMiddleware,
            this.#getComplaintsChartData,
        );
        this.router.get(
            '/analytics/revenue',
            AdminAuthMiddleware,
            this.#getRevenueChart,
        );
        this.router.get(
            '/analytics/subscription',
            AdminAuthMiddleware,
            this.#getSubscription,
        );
        this.router.get(
            '/analytics/subscription/total',
            this.#getTotalSubscription,
        );

        this.router.get(
            '/analytics/user/subscription',
            userAuthMiddleware,
            this.#getSubscriptionDetails,
        );
    }

    #getSubscriptionDetails = asyncHandler(async (req, res) => {
        const subscription = await subscriptionModel
            .find({ userId: req.id })
            .populate('planId');
        let subscriptionData = {
            remainingDays: 0,
            usedDays: 0,
            isActive: false,
            subscription,
        };

        if (!subscription.length) {
            logger.info('hit');
            return this.response(
                res,
                httpStatusCode.OK,
                httpStatus.SUCCESS,
                'Subscription Details',
                subscriptionData,
            );
        }

        subscriptionData.isActive =
            checkSubscriptionStatus(subscription[0]) === 'VALID' ? true : false;

        const currentDate = new Date();
        const startDate = new Date(subscription[0].startDate);
        const endDate = new Date(subscription[0].endDate);

        // Calculate used days
        subscriptionData.usedDays = Math.floor(
            (currentDate - startDate) / (1000 * 60 * 60 * 24),
        );

        // Calculate remaining days
        subscriptionData.remainingDays = Math.floor(
            (endDate - currentDate) / (1000 * 60 * 60 * 24),
        );

        subscriptionData.chartData = [
            {
                days: 'remaining',
                total: subscriptionData.remainingDays,
                fill: `var(--color-remaining)`,
            },
            {
                days: 'used',
                total: subscriptionData.usedDays,
                fill: `var(--color-used)`,
            },
        ];
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Subscription Details',
            subscriptionData,
        );
    });

    #getTotalSubscription = asyncHandler(async (req, res) => {
        const totalSubscription = await subscriptionModel.countDocuments();
        return res.status(httpStatusCode.OK).json({
            status: httpStatus.SUCCESS,
            statusCode: httpStatusCode.OK,
            message: 'Total Subscriptions',
            data: totalSubscription,
        });
    });

    #getSubscription = asyncHandler(async (req, res) => {
        const subscriptions = await subscriptionModel
            .find({})
            .populate({ path: 'planId', select: 'name' });

        const planDataMap = {
            Organisational: 0,
            Individual: 0,
        };

        const addSubscriptionToMap = (subscriptions) => {
            subscriptions.forEach((subscription) => {
                const planType = subscription.planId.name;

                if (planDataMap[planType] !== undefined) {
                    planDataMap[planType]++;
                }
            });
        };

        addSubscriptionToMap(subscriptions);

        // Convert the map to an array of objects for the chart
        const chartData = Object.entries(planDataMap).map(([plan, total]) => ({
            plan,
            total,
            fill: `var(--color-${plan})`,
        }));

        const totalSubscription = chartData.reduce(
            (acc, curr) => acc + curr.total,
            0,
        );

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Fetched',
            { chartData, totalSubscription },
        );
    });

    #getRevenueChart = asyncHandler(async (req, res) => {
        const { days } = req.query;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(days));

        const paymentsHistory = await PaymentHistory.find({
            createdAt: { $gte: startDate },
        }).select('paymentFor amount createdAt');

        const chartDataMap = {};

        const addDataToMap = (complaints) => {
            complaints.forEach((complaint) => {
                const date = complaint.createdAt.toISOString().split('T')[0]; // Extract date in YYYY-MM-DD format
                const amount = complaint.amount;
                let type;

                // Determine the type based on the amount
                if (amount === 500) {
                    type = 'individual';
                } else if (amount > 500) {
                    type = 'organisational';
                } else {
                    type = 'subscription';
                }

                // Initialize the date entry if it doesn't exist
                if (!chartDataMap[date]) {
                    chartDataMap[date] = {
                        date,
                        individual: 0,
                        organisational: 0,
                        subscription: 0,
                    };
                }

                // Add the amount to the appropriate type
                chartDataMap[date][type] += amount;
            });
        };
        addDataToMap(paymentsHistory);
        const newData = Object.values(chartDataMap);
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Fetched',
            newData,
        );
    });

    #getComplaintsChartData = asyncHandler(async (req, res) => {
        const [individualComplaints, organizationalComplaints] =
            await Promise.all([
                indComplaintModel.countDocuments(),
                orgComplaintModel.countDocuments(),
            ]);

        const chartData = [
            {
                complaint: 'individual',
                total: individualComplaints,
                fill: `var(--color-individual)`,
            },
            {
                complaint: 'organisational',
                total: organizationalComplaints,
                fill: `var(--color-organisational)`,
            },
        ];
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Complaitns Analytics fetched successfully.',
            chartData,
        );
    });
}

export default new AnalyticsController().router;
