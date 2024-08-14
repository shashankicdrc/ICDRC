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
    }

    #getUserByEmail = asyncHandler(async (req, res) => {
        const { email } = req.query;
        const isUserExist = await this.#userService.isUserExistByEmail(
            email,
            false,
        );

        logger.info(isUserExist);
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
