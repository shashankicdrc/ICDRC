import AdminService from '#services/adminService';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import { httpStatusCode } from '#utils/constant';
import { verifyToken } from '#utils/jwt';

const AdminAuthMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        throw new CustomError(
            "You don't have any right to access the data.",
            httpStatusCode.UNAUTHORIZED,
        );
    }

    const jwtToken = token.split(' ')[1];
    const isVerified = await verifyToken(jwtToken);

    if (!isVerified) {
        throw new CustomError(
            "You don't have any right to access the data.",
            httpStatusCode.UNAUTHORIZED,
        );
    }

    const isAdminExist = await new AdminService().isAdminExistById(
        isVerified.id,
        false,
    );
    if (!isAdminExist) {
        throw new CustomError(
            'Invalid token has been provided.',
            httpStatusCode.UNAUTHORIZED,
        );
    }
    if (isAdminExist.role !== isVerified.role) {
        throw new CustomError(
            'It seems like your role is changed. please login again.',
            httpStatusCode.UNAUTHORIZED,
        );
    }
    req.id = isAdminExist.id;
    req.email = isAdminExist.email;
    req.role = isAdminExist.role;
    next();
});

export default AdminAuthMiddleware;
