import userAuthMiddleware from '#middlewares/UserAuthMiddleware ';
import usermodel from '#models/userModel';
import UserService from '#services/userService';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import { httpStatus, httpStatusCode } from '#utils/constant';
import logger from '#utils/logger';
import { Router } from 'express';

class UserController extends Base {
    #userService;
    constructor() {
        super();
        this.router = Router();
        this.#userService = new UserService();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.get('/users/email', this.#getUserByEmail);
        this.router.get('/users', userAuthMiddleware, this.#getUserDetails);
        this.router.put('/users', userAuthMiddleware, this.#updateProfile);
    }

    #getUserDetails = asyncHandler(async (req, res) => {
        const userDetails = await usermodel
            .findById(req.id)
            .select('-password');
        if (!userDetails)
            throw new CustomError(
                "User doesn't exist.",
                httpStatusCode.BAD_REQUEST,
            );
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'User profile fetched successfully.',
            userDetails,
        );
    });

    #updateProfile = asyncHandler(async (req, res) => {
        const { name } = req.body;
        const updateName = await usermodel
            .findByIdAndUpdate(
                req.id,
                {
                    name,
                },
                { new: true },
            )
            .select('-password');
        if (!updateName)
            throw new CustomError(
                "User doesn't exist.",
                httpStatusCode.BAD_REQUEST,
            );
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Your profile has been udpated successfully.',
            updateName,
        );
    });

    #getUserByEmail = asyncHandler(async (req, res) => {
        const { email } = req.query;
        const isUserExist = await this.#userService.isUserExistByEmail(
            email,
            false,
        );

        if (!isUserExist) {
            throw new CustomError(
                'User does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'User fetched successfully.',
            isUserExist,
        );
    });
}

export default new UserController().router;
