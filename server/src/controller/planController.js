import planModel from '#models/planModel';
import { Base } from '#utils/Base';
import asyncHandler from '#utils/asyncHandler';
import { httpStatus, httpStatusCode } from '#utils/constant';
import { Router } from 'express';

class PlanController extends Base {
    constructor() {
        super();
        this.router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.post('/plans', this.#addPlan);
        this.router.get('/plans', this.#getPlans);
    }

    #addPlan = asyncHandler(async (req, res) => {
        const { name } = req.body;
        const createPlan = await planModel.create({ name });
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            `${createPlan.name} has been created Successfully.`,
        );
    });

    #getPlans = asyncHandler(async (req, res) => {
        const plans = await planModel.find();
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Plans feched Successfully.',
            plans,
        );
    });
}

export default new PlanController().router;
