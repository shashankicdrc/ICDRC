import UserService from "#services/userService";
import { Base } from "#utils/Base";
import CustomError from "#utils/CustomError";
import asyncHandler from "#utils/asyncHandler";
import { NOREPLYEMAIL, htmlTemplate, httpStatus, httpStatusCode } from "#utils/constant";
import express from 'express'
const { Router } = express;
import bcrypt from 'bcrypt';
import { getAccessToken, getRefreshToken, options, verifyToken } from "#utils/jwt";
import userAuthMiddleware from "#middlewares/UserAuthMiddleware ";
import generateCode from "#utils/generateCode";
import { queues } from "#queues/queue";
import isValidDateTime from "#utils/validateTime";

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
        this.router.post('/auth/change/password', userAuthMiddleware, this.#changePassword)
        this.router.post('/auth/reset/password/request', this.#resetPasswordRequest)
        this.router.post('/auth/reset/password', this.#resetPassword)
    }

    #resetPassword = asyncHandler(async (req, res) => {
        const { email, code, password } = req.body;
        const IsExist = await this.#userService.isUserExistByEmail(email, false);
        if (!IsExist) {
            throw new CustomError("User does not exist.", httpStatusCode.BAD_REQUEST);
        }

        const token = await this.#userService.isPasswordTokenExist(IsExist.id);
        if (!token) {
            return this.response(
                res,
                httpStatusCode.BAD_REQUEST,
                httpStatus.ERROR,
                "Invalid Code",
            );
        }

        if (code !== token.code) {
            throw new CustomError(
                "Invalid code provided.",
                httpStatusCode.BAD_REQUEST,
            );
        }

        if (!isValidDateTime(token.expireTime, 15)) {
            await this.#userService.deletePasswordToken(token.id);
            throw new CustomError(
                "Code has expired. Please request a new password reset.",
                httpStatusCode.BAD_REQUEST,
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const isUpdated = await this.#userService.updateUserAndDeleteToken(IsExist.id, token.id, hashedPassword)
        if (!isUpdated) {
            throw new CustomError('Something went wrong please try agin.', httpStatusCode.BAD_REQUEST);
        }
        return this.response(res, httpStatusCode.OK, httpStatus.SUCCESS, 'Password has been reset succesfully.')

    })

    #resetPasswordRequest = asyncHandler(async (req, res) => {
        const { email } = req.body;
        const isUserExist = await this.#userService.isUserExistByEmail(email, false);
        if (!isUserExist)
            throw new CustomError("User does not exist.", httpStatusCode.BAD_REQUEST);


        const isTokenExist = await this.#userService.isPasswordTokenExist(
            isUserExist.id,
        );

        if (isTokenExist) {
            const message = `Reset password link has been already sent to your email ${isUserExist.email}.`;
            return this.response(
                res,
                httpStatusCode.OK,
                httpStatus.SUCCESS,
                message,
            );
        }

        const passwordTokenData = {
            code: generateCode(),
            expireTime: new Date(Date.now() + 15 * 60 * 1000),
            userId: isUserExist.id,
        };

        const passwordToken =
            await this.#userService.addPasswordToken(passwordTokenData);
        if (!passwordToken) {
            throw new CustomError(
                "Something went wrong, please try agin.",
                httpStatusCode.BAD_REQUEST,
            );
        }

        const link =
            process.env.NODE_ENV === "production"
                ? `${req.headers.origin}/auth/reset/password/?email=${isUserExist.email}`
                : `${process.env.FRONTEND_URL}/auth/reset/password/?email=${isUserExist.email}`;

        const templateLink = '/src/templates/ForgetPassword.html'
        const html = htmlTemplate(process.cwd() + templateLink, {
            link,
            code: passwordTokenData.code,
        });

        const NewMessage = {
            from: NOREPLYEMAIL,
            to: [isUserExist.email],
            subject: "Reset password link",
            html,
        };

        queues.EmailQueue.add('send-email', NewMessage)
        const msg = `Reset password link has been send to your ${isUserExist.email} email.`;
        return this.response(res, httpStatusCode.OK, httpStatus.SUCCESS, msg);
    })

    #changePassword = asyncHandler(async (req, res) => {
        const { password, newPassword } = req.body;
        const isUserExist = await this.#userService.isUserExistById(req.id, true);
        if (!isUserExist)
            throw new CustomError("User does not exist.", httpStatusCode.BAD_REQUEST);

        const isValidPassword = await bcrypt.compare(
            password,
            isUserExist.password,
        );

        if (!isValidPassword) {
            throw new CustomError(
                "Invalid password,Please try again",
                httpStatusCode.BAD_REQUEST,
            );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedPassword = await this.#userService.updatePassword(
            isUserExist.id,
            hashedPassword,
        );
        if (!updatedPassword.updated)
            throw new CustomError(
                "Invalid password,Please try again",
                httpStatusCode.BAD_REQUEST,
            );

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            "Password has been changed Successfully.",
        );
    });

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

