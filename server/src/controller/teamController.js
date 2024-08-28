import AdminAuthMiddleware from '#middlewares/AdminAuthMiddleware';
import teamModel from '#models/teamModel';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import { httpStatus, httpStatusCode } from '#utils/constant';
import { Router } from 'express';

class TeamController extends Base {
    constructor() {
        super();
        this.router = Router();
        this.#initiateRoutes();
    }

    #initiateRoutes() {
        this.router.post('/teams', AdminAuthMiddleware, this.#addTeam);
        this.router.get('/teams', this.#getTeam);
        this.router.put('/teams', AdminAuthMiddleware, this.#updateTeam);
        this.router.delete('/teams', AdminAuthMiddleware, this.#deleteTeam);
        this.router.get('/teams/:id', this.#getTeamExpertsById);
    }

    #getTeamExpertsById = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const experts = await teamModel.findById(id);
        if (!experts) {
            throw new CustomError(
                'Experts does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Fetched',
            experts,
        );
    });

    #deleteTeam = asyncHandler(async (req, res) => {
        const { teamIds } = req.body;
        if (req.role !== 'admin') {
            throw new CustomError(
                "You dont' have any right to delete the team of experts.",
                httpStatusCode.BAD_REQUEST,
            );
        }
        const deleted = await teamModel.updateMany(
            { _id: { $in: teamIds } },
            { $set: { isDeleted: true } },
        );
        if (deleted.modifiedCount !== teamIds.length) {
            throw new CustomError(
                'One or more team of experts does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Team of experts is deleted successfully.',
        );
    });

    #updateTeam = asyncHandler(async (req, res) => {
        const { teamId, image, name, description } = req.body;
        const updateData = await teamModel.findByIdAndUpdate(teamId, {
            image,
            name,
            description,
        });
        if (!updateData) {
            throw new CustomError(
                'Team of Expert does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Updated succcessfully.',
        );
    });

    #getTeam = asyncHandler(async (req, res) => {
        const teams = await teamModel.find({ isDeleted: false });
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Fetched',
            teams,
        );
    });

    #addTeam = asyncHandler(async (req, res) => {
        const { name, image, description } = req.body;

        if (req.role !== 'admin') {
            throw new CustomError(
                "You don't have any right to add team of experts.",
                httpStatusCode.BAD_REQUEST,
            );
        }

        const addData = await teamModel.create({ name, image, description });
        if (!addData) {
            throw new CustomError(
                'Something went wrong please try again.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Team of expert is addedd successfully.',
        );
    });
}

export default new TeamController().router;
