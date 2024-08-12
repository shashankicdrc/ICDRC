import UserService from "#services/userService";
import { Base } from "#utils/Base";
import CustomError from "#utils/CustomError";
import asyncHandler from "#utils/asyncHandler";
import { httpStatus, httpStatusCode } from "#utils/constant";
import express from 'express'
const { Router } = express;
import bcrypt from 'bcrypt';
import { getAccessToken, getRefreshToken, options, verifyToken } from "#utils/jwt";
import logger from "#utils/logger";

class UserController extends Base {
    #userService;
    constructor() {
        super()
        this.router = Router();
        this.#userService = new UserService();
        this.#initializeRoutes()
    }

    #initializeRoutes() {
        this.router.post('/auth/signup', this.#signup)
        this.router.post('/auth/signin', this.#signin)
        this.router.get('/auth/token/rotation', this.#refereshToken)
    }

    #refereshToken = asyncHandler(
        async (req, res) => {
            const { refreshtoken } = req.query;
            const option = { ...options, expiresIn: "30d" };
            const { id, name, email, profilePic } = await verifyToken(
                refreshtoken,
                option,
            );
            const payload = {
                id,
                name,
                email,
                profilePic,
            };
            const token = await getAccessToken(payload);
            return res
                .status(httpStatusCode.OK)
                .json({ AccessToken: token, Refreshtoken: refreshtoken });
        },
    )

    #signin = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const isUserExist = await this.#userService.isUserExistByEmail(email, true);

        if (!isUserExist)
            throw new CustomError(
                "Invalid email/password",
                httpStatusCode.BAD_REQUEST,
            );
        const isValidPassword = await bcrypt.compare(
            password,
            isUserExist.password,
        );

        if (!isValidPassword)
            throw new CustomError(
                "Invalid email/password",
                httpStatusCode.BAD_REQUEST,
            );

        const payload = {
            id: isUserExist.id,
            name: isUserExist.name,
            email: isUserExist.email,
            profilePic: isUserExist.profilePic,
        };


        const token = await Promise.all([
            getAccessToken(payload),
            getRefreshToken(payload),
        ]);

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            "Login successfully.",
            { AccessToken: token[0], RefreshToken: token[1] },
        );
    });

    #signup = asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;
        const isExist = await this.#userService.isUserExistByEmail(email)
        if (isExist) {
            throw new CustomError('User already exist.', httpStatusCode.BAD_REQUEST)
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const userData = {
            email,
            name,
            password: hashedPassword
        }
        const createUser = await this.#userService.addNewUser(userData)
        if (!createUser.email) {
            throw new CustomError('Something went wrong. Please try again.', httpStatusCode.BAD_REQUEST)
        }
        const message = `${createUser.email} has been created succesfully.`
        return this.response(res, httpStatusCode.OK, httpStatus.SUCCESS, message)
    })
}


export default new UserController().router;

