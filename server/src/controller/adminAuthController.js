import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import {
    NOREPLYEMAIL,
    htmlTemplate,
    httpStatus,
    httpStatusCode,
} from '#utils/constant';
import express from 'express';
const { Router } = express;
import bcrypt from 'bcrypt';
import {
    getAccessToken,
    getRefreshToken,
    options,
    verifyToken,
} from '#utils/jwt';
import generateCode from '#utils/generateCode';
import { queues } from '#queues/queue';
import isValidDateTime from '#utils/validateTime';
import AdminService from '#services/adminService';
import AdminAuthMiddleware from '#middlewares/AdminAuthMiddleware';

class AdminAuthController extends Base {
    #adminService;
    constructor() {
        super();
        this.router = Router();
        this.#adminService = new AdminService();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.post(
            '/admin/auth/signup',
            AdminAuthMiddleware,
            this.#signup,
        );
        this.router.post('/admin/auth/signin', this.#signin);
        this.router.get('/admin/auth/token/rotation', this.#refereshToken);
        this.router.post(
            '/admin/auth/change/password',
            AdminAuthMiddleware,
            this.#changePassword,
        );
        this.router.post(
            '/admin/auth/reset/password/request',
            this.#resetPasswordRequest,
        );
        this.router.post('/admin/auth/reset/password', this.#resetPassword);
    }

    #resetPassword = asyncHandler(async (req, res) => {
        const { email, code, password } = req.body;
        const IsExist = await this.#adminService.isAdminExistByEmail(
            email,
            false,
        );
        if (!IsExist) {
            throw new CustomError(
                'Admin does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }

        const token = await this.#adminService.isPasswordTokenExist(IsExist.id);
        if (!token) {
            return this.response(
                res,
                httpStatusCode.BAD_REQUEST,
                httpStatus.ERROR,
                'Invalid Code',
            );
        }

        if (code !== token.code) {
            throw new CustomError(
                'Invalid code provided.',
                httpStatusCode.BAD_REQUEST,
            );
        }

        if (!isValidDateTime(token.expireTime, 15)) {
            await this.#adminService.deletePasswordToken(token.id);
            throw new CustomError(
                'Code has expired. Please request a new password reset.',
                httpStatusCode.BAD_REQUEST,
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const isUpdated = await this.#adminService.updateAdminAndDeleteToken(
            IsExist.id,
            token.id,
            hashedPassword,
        );
        if (!isUpdated) {
            throw new CustomError(
                'Something went wrong please try agin.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Password has been reset succesfully.',
        );
    });

    #resetPasswordRequest = asyncHandler(async (req, res) => {
        const { email } = req.body;
        const isAdminExist = await this.#adminService.isAdminExistByEmail(
            email,
            false,
        );
        if (!isAdminExist)
            throw new CustomError(
                'Admin does not exist.',
                httpStatusCode.BAD_REQUEST,
            );

        const isTokenExist = await this.#adminService.isPasswordTokenExist(
            isAdminExist.id,
        );

        if (isTokenExist) {
            const message = `Reset password link has been already sent to your email ${isAdminExist.email}.`;
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
            adminId: isAdminExist.id,
        };

        const passwordToken =
            await this.#adminService.addPasswordToken(passwordTokenData);
        if (!passwordToken) {
            throw new CustomError(
                'Something went wrong, please try agin.',
                httpStatusCode.BAD_REQUEST,
            );
        }

        const link =
            process.env.NODE_ENV === 'production'
                ? `${req.headers.origin}/auth/reset/password/?email=${isAdminExist.email}`
                : `${process.env.FRONTEND_URL}/auth/reset/password/?email=${isAdminExist.email}`;

        const templateLink = '/src/templates/ForgetPassword.html';
        const html = htmlTemplate(process.cwd() + templateLink, {
            link,
            code: passwordTokenData.code,
        });

        const NewMessage = {
            from: NOREPLYEMAIL,
            to: [isAdminExist.email],
            subject: 'Reset password link',
            html,
        };

        queues.EmailQueue.add('send-email', NewMessage);
        const msg = `Reset password link has been send to your ${isAdminExist.email} email.`;
        return this.response(res, httpStatusCode.OK, httpStatus.SUCCESS, msg);
    });

    #changePassword = asyncHandler(async (req, res) => {
        const { password, newPassword } = req.body;
        const isAdminExist = await this.#adminService.isAdminExistById(
            req.id,
            true,
        );
        if (!isAdminExist)
            throw new CustomError(
                'Admin does not exist.',
                httpStatusCode.BAD_REQUEST,
            );

        const isValidPassword = await bcrypt.compare(
            password,
            isAdminExist.password,
        );

        if (!isValidPassword) {
            throw new CustomError(
                'Invalid password,Please try again',
                httpStatusCode.BAD_REQUEST,
            );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedPassword = await this.#adminService.updatePassword(
            isAdminExist.id,
            hashedPassword,
        );
        if (!updatedPassword.updated)
            throw new CustomError(
                'Invalid password,Please try again',
                httpStatusCode.BAD_REQUEST,
            );

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Password has been changed Successfully.',
        );
    });

    #refereshToken = asyncHandler(async (req, res) => {
        const { refreshtoken } = req.query;
        const option = { ...options, expiresIn: '30d' };
        const { id, name, email, profilePic, role } = await verifyToken(
            refreshtoken,
            option,
        );
        const payload = {
            id,
            name,
            email,
            profilePic,
            role,
        };
        const token = await getAccessToken(payload);
        return res
            .status(httpStatusCode.OK)
            .json({ AccessToken: token, Refreshtoken: refreshtoken });
    });

    #signin = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const isAdminExist = await this.#adminService.isAdminExistByEmail(
            email,
            true,
        );

        if (!isAdminExist)
            throw new CustomError(
                'Invalid email/password',
                httpStatusCode.BAD_REQUEST,
            );
        const isValidPassword = await bcrypt.compare(
            password,
            isAdminExist.password,
        );

        if (!isValidPassword)
            throw new CustomError(
                'Invalid email/password',
                httpStatusCode.BAD_REQUEST,
            );

        const payload = {
            id: isAdminExist.id,
            name: isAdminExist.name,
            email: isAdminExist.email,
            profilePic: isAdminExist.profilePic,
            role: isAdminExist.role,
        };

        const token = await Promise.all([
            getAccessToken(payload),
            getRefreshToken(payload),
        ]);

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Login successfully.',
            { AccessToken: token[0], RefreshToken: token[1] },
        );
    });

    #signup = asyncHandler(async (req, res) => {
        const { name, email, password, role } = req.body;

        if (req.role === 'subadmin') {
            throw new CustomError(
                "You don't have any right to create subadmin.",
                httpStatusCode.FORBIDDEN,
            );
        }
        if (role === 'admin') {
            throw new CustomError(
                "You can't create Admin as role admin.",
                httpStatusCode.BAD_REQUEST,
            );
        }

        const isExist = await this.#adminService.isAdminExistByEmail(email);
        if (isExist) {
            throw new CustomError(
                'Admin already exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const AdminData = {
            email,
            name,
            password: hashedPassword,
            role,
        };
        const createAdmin = await this.#adminService.addNewAdmin(AdminData);
        if (!createAdmin.email) {
            throw new CustomError(
                'Something went wrong. Please try again.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        const message = `${createAdmin.email} has been created succesfully.`;
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            message,
        );
    });
}

export default new AdminAuthController().router;
