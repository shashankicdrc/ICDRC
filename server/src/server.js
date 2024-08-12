
import connectDb from '#config/connectDb';
import ErrorMiddleware from '#middlewares/ErroMiddleware';
import asyncHandler from '#utils/asyncHandler';
import { httpStatus, httpStatusCode } from '#utils/constant';
import logger from '#utils/logger';
import express from 'express';

const startServer = async () => {
    const app = express();
    const port = process.env.PORT || 8080;
    app.use(express.json());

    app.get('/', asyncHandler(async (req, res, next) => {
        return res.status(httpStatusCode.OK).json({ status: httpStatus.SUCCESS, message: "Hello Developers" })
    }))

    app.use(ErrorMiddleware)

    const isConnected = await connectDb()
    if (isConnected) {
        app.listen(port, () => {
            logger.info(`http://localhost:${port}`);
        });
    }
}

export default startServer; 
