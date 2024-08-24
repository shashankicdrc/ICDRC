import AdminAuthMiddleware from '#middlewares/AdminAuthMiddleware';
import indComplaintModel from '#models/indComplaintModel';
import orgComplaintModel from '#models/orgComplaintModel';
import PaymentHistory from '#models/paymentHistoryModel';
import subscriptionModel from '#models/subscriptionModel';
import { Base } from '#utils/Base';
import asyncHandler from '#utils/asyncHandler';
import { httpStatus, httpStatusCode } from '#utils/constant';
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
    }

    #getSubscription = asyncHandler(async (req, res) => {
        const subscriptions = await subscriptionModel
            .find({})
            .populate({ path: 'planId', select: 'name' });

        const planDataMap = {
            Basic: 0,
            Premium: 0,
            Enterprise: 0,
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
