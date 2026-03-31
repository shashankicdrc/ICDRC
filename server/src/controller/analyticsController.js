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
        const subscription = await subscriptionModel.findOne({
            userId: req.id,
        });

        if (!subscription) {
            // If no subscription found, return default data
            const subscriptionData = {
                individual: {
                    remainingDays: 0,
                    usedDays: 0,
                    isActive: false,
                    data: null,
                },
                organisational: {
                    remainingDays: 0,
                    usedDays: 0,
                    isActive: false,
                    data: null,
                },
            };
            return this.response(
                res,
                httpStatusCode.OK,
                httpStatus.SUCCESS,
                'Subscription Details',
                subscriptionData,
            );
        }

        // Clone the subscription document
        const clonedSubscription = subscription.toObject();

        // Populate the `planId` in each plan
        const subscriptionPlans = await subscriptionModel.populate(
            clonedSubscription,
            { path: 'plans.planId' },
        );

        let subscriptionData = {
            individual: {
                remainingDays: 0,
                usedDays: 0,
                isActive: false,
                data: null,
                chartData: null,
            },
            organisational: {
                remainingDays: 0,
                usedDays: 0,
                isActive: false,
                data: null,
                chartData: null,
            },
        };

        const currentDate = new Date();

        // Loop through the plans and calculate data for individual and organizational plans
        subscriptionPlans.plans.forEach((planObj) => {
            const plan = planObj.planId;

            if (plan.name === 'Individual') {
                subscriptionData.individual.isActive =
                    checkSubscriptionStatus(subscription, plan._id) === 'VALID';

                const startDate = new Date(planObj.startDate);
                const endDate = new Date(planObj.endDate);

                // Calculate used and remaining days for the individual plan
                subscriptionData.individual.usedDays = Math.floor(
                    (currentDate - startDate) / (1000 * 60 * 60 * 24),
                );
                subscriptionData.individual.remainingDays = Math.floor(
                    (endDate - currentDate) / (1000 * 60 * 60 * 24),
                );

                subscriptionData.individual.data = planObj;
            }

            if (plan.name === 'Organisational') {
                subscriptionData.organisational.isActive =
                    checkSubscriptionStatus(subscription, plan._id) === 'VALID';

                const startDate = new Date(planObj.startDate);
                const endDate = new Date(planObj.endDate);

                // Calculate used and remaining days for the organizational plan
                subscriptionData.organisational.usedDays = Math.floor(
                    (currentDate - startDate) / (1000 * 60 * 60 * 24),
                );
                subscriptionData.organisational.remainingDays = Math.floor(
                    (endDate - currentDate) / (1000 * 60 * 60 * 24),
                );
                subscriptionData.organisational.data = planObj;
            }
        });

        subscriptionData.individual.chartData = [
            {
                days: 'remaining',
                total: subscriptionData.individual.remainingDays,
                fill: `var(--color-remaining)`,
            },
            {
                days: 'used',
                total: subscriptionData.individual.usedDays,
                fill: `var(--color-used)`,
            },
        ];

        subscriptionData.organisational.chartData = [
            {
                days: 'remaining',
                total: subscriptionData.organisational.remainingDays,
                fill: `var(--color-remaining)`,
            },
            {
                days: 'used',
                total: subscriptionData.organisational.usedDays,
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
            .populate({ path: 'plans.planId', select: 'name' }); // Populate the `planId` inside the `plans` array

        const planDataMap = {
            Organisational: 0,
            Individual: 0,
        };

        const addSubscriptionToMap = (subscriptions) => {
            subscriptions.forEach((subscription) => {
                // Loop through each plan in the `plans` array
                subscription.plans.forEach((planObj) => {
                    const planType = planObj.planId.name;

                    if (planDataMap[planType] !== undefined) {
                        planDataMap[planType]++;
                    }
                });
            });
        };

        // Add subscription data to the map
        addSubscriptionToMap(subscriptions);

        // Convert the map to an array of objects for the chart
        const chartData = Object.entries(planDataMap).map(([plan, total]) => ({
            plan,
            total,
            fill: `var(--color-${plan})`,
        }));

        // Calculate total subscriptions
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
                } else if (amount === 5000) {
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
                complaint: 'organizational',
                total: organizationalComplaints,
                fill: `var(--color-organizational)`,
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
