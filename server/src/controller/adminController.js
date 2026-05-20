import AdminAuthMiddleware from '#middlewares/AdminAuthMiddleware';
import adminModel from '#models/adminModel';
import usermodel from '#models/userModel';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import { httpStatus, httpStatusCode } from '#utils/constant';
import { Router } from 'express';

class AdminController extends Base {
    constructor() {
        super();
        this.router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.get('/admins', AdminAuthMiddleware, this.#getAdmins);
        this.router.get('/admins/:id', AdminAuthMiddleware, this.#getAdminById);
        this.router.put('/admins/role', AdminAuthMiddleware, this.#changeRole);
        this.router.delete('/admins', AdminAuthMiddleware, this.#deleteAdmins);
        this.router.put('/admins', AdminAuthMiddleware, this.#updateProfile);
        this.router.get(
            '/admin/users/email',
            AdminAuthMiddleware,
            this.#getUserByEmail,
        );
        this.router.get('/admin/users', AdminAuthMiddleware, this.#getUsers);
        this.router.get(
            '/admin/users/:id',
            AdminAuthMiddleware,
            this.#getUserById,
        );
        this.router.get(
            '/admins/recent/list',
            AdminAuthMiddleware,
            this.#recentAdmins,
        );
    }

    #recentAdmins = asyncHandler(async (req, res) => {
        const admins = await adminModel
            .find({ isDeleted: false })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('-password -updatedAt -isDeleted');

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Fetched',
            admins,
        );
    });

    #updateProfile = asyncHandler(async (req, res) => {
        const { name } = req.body;
        const update = await adminModel
            .findByIdAndUpdate(req.id, {
                name,
            })
            .select('-password');
        if (!update) {
            throw new CustomError(
                'Admin does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Your profile has been updated.',
            update,
        );
    });

    #getAdminById = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const admin = await adminModel
            .findById(id)
            .select('-password -isDeleted');
        if (!admin)
            throw new CustomError(
                'Admin does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Admin Fetched successfully.',
            admin,
        );
    });

    #deleteAdmins = asyncHandler(async (req, res) => {
        const { adminIds } = req.body;
        if (req.role !== 'admin') {
            throw new CustomError(
                "You don't have any right to change the admin role.",
                httpStatusCode.FORBIDDEN,
            );
        }
        const deleted = await adminModel.updateMany(
            { _id: { $in: adminIds } },
            { $set: { isDeleted: true } },
        );

        if (deleted.modifiedCount !== adminIds.length) {
            throw new CustomError(
                'One or more admins does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Admins have been deleted successfully.',
        );
    });

    #changeRole = asyncHandler(async (req, res) => {
        const { adminId, role } = req.body;
        if (req.role !== 'admin') {
            throw new CustomError(
                "You don't have any right to change the admin role.",
                httpStatusCode.FORBIDDEN,
            );
        }

        const updated = await adminModel
            .findByIdAndUpdate(adminId, { role })
            .select('-password -isDeleted');
        if (!updated) {
            throw new CustomError(
                'Admin does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Admin role has been updated successfully.',
        );
    });

    #getAdmins = asyncHandler(async (req, res) => {
        const admins = await adminModel
            .find({ isDeleted: false })
            .select('-password -isDeleted');
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Admins fetched',
            admins,
        );
    });

    #getUsers = asyncHandler(async (req, res) => {
        const { search, page = 1, limit = 20 } = req.query;

        const query =
            search && String(search).trim()
                ? {
                      $or: [
                          { email: { $regex: String(search).trim(), $options: 'i' } },
                          { name: { $regex: String(search).trim(), $options: 'i' } },
                      ],
                  }
                : {};

        const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
        const limitNumber = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);
        const skip = (pageNumber - 1) * limitNumber;

        const [total, users] = await Promise.all([
            usermodel.countDocuments(query),
            usermodel
                .find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNumber)
                .select('-password'),
        ]);

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Users fetched',
            {
                users,
                pagination: {
                    total,
                    page: pageNumber,
                    limit: limitNumber,
                    pages: Math.ceil(total / limitNumber) || 1,
                },
            },
        );
    });

    #getUserByEmail = asyncHandler(async (req, res) => {
        const { email } = req.query;
        if (!email) {
            throw new CustomError('Email is required.', httpStatusCode.BAD_REQUEST);
        }

        const user = await usermodel
            .findOne({ email: String(email).trim().toLowerCase() })
            .select('-password');

        if (!user) {
            throw new CustomError('User does not exist.', httpStatusCode.BAD_REQUEST);
        }

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'User fetched successfully.',
            user,
        );
    });

    #getUserById = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const user = await usermodel.findById(id).select('-password');
        if (!user) {
            throw new CustomError('User does not exist.', httpStatusCode.BAD_REQUEST);
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'User fetched successfully.',
            user,
        );
    });
}

export default new AdminController().router;
