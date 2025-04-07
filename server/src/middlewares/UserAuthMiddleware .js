import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import { httpStatusCode } from '#utils/constant';
import { options, verifyToken } from '#utils/jwt';

const userAuthMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        throw new CustomError(
            'you are unauthorized.',
            httpStatusCode.UNAUTHORIZED,
        );
    const isValidatoken = await verifyToken(token, options);
    if (!isValidatoken)
        throw new CustomError(
            'Something went wrong',
            httpStatusCode.INTERNAL_SERVER_ERROR,
        );
    req.id = isValidatoken.id;
    req.email = isValidatoken.email;
    req.name = isValidatoken.name;
    next();
});

export default userAuthMiddleware;
