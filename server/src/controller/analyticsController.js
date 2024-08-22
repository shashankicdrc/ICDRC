import indComplaintModel from '#models/indComplaintModel';
import orgComplaintModel from '#models/orgComplaintModel';
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
        this.router.get('/analytics/complaints', this.#getComplaintsChartData);
    }

    #getComplaintsChartData = asyncHandler(async (req, res) => {
        const { days } = req.query;
        // Calculate the start date based on the number of days
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(days));

        // Fetch individual and organizational complaints created after the start date
        const [individualComplaints, organizationalComplaints] =
            await Promise.all([
                indComplaintModel.find({ createdAt: { $gte: startDate } }),
                orgComplaintModel.find({ createdAt: { $gte: startDate } }),
            ]);

        // Initialize a map to store the counts for each date
        const chartDataMap = {};

        // Function to add data to the map
        const addDataToMap = (complaints, type) => {
            complaints.forEach((complaint) => {
                const date = complaint.createdAt.toISOString().split('T')[0]; // Extract date in YYYY-MM-DD format
                if (!chartDataMap[date]) {
                    chartDataMap[date] = {
                        date,
                        individual: 0,
                        organisational: 0,
                    };
                }
                chartDataMap[date][type]++;
            });
        };

        // Add individual and organizational complaints to the map
        addDataToMap(individualComplaints, 'individual');
        addDataToMap(organizationalComplaints, 'organisational');

        // Convert the map to an array
        const chartData = Object.values(chartDataMap);
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
