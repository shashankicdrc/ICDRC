import AdminAuthMiddleware from '#middlewares/AdminAuthMiddleware';
import adminModel from '#models/adminModel';
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
    }

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
        const admin = await adminModel.findById(id).select('-password');
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
        const deleted = await adminModel.deleteMany({ _id: { $in: adminIds } });
        if (deleted.deletedCount !== adminIds.length) {
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
            .select('-password');
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
            .find({ _id: { $ne: req.id } })
            .select('-password');
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Admins fetched',
            admins,
        );
    });
}

export default new AdminController().router;
