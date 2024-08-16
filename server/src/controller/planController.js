import planModel from '#models/planModel';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
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
        this.router.get('/plans/:id', this.#particularPlan);
    }

    #particularPlan = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const plan = await planModel.findById(id);
        if (!plan)
            throw new CustomError(
                'Plan does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Plan fetched successfully',
            plan,
        );
    });

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
