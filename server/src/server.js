import connectDb from '#config/connectDb';
import adminAuthController from '#controller/adminAuthController';
import adminController from '#controller/adminController';
import blogController from '#controller/blogController';
import caseStudyController from '#controller/caseStudyController';
import chatBotController from '#controller/chatBotController';
import complaintsController from '#controller/complaintsController';
import contactController from '#controller/contactController';
import individualController from '#controller/individualController';
import mediaController from '#controller/mediaController';
import organisationalController from '#controller/organisationalController';
import partnerController from '#controller/partnerController';
import paymentController from '#controller/paymentController';
import userAuthController from '#controller/userAuthController';
import ErrorMiddleware from '#middlewares/ErroMiddleware';
import asyncHandler from '#utils/asyncHandler';
import { httpStatus, httpStatusCode } from '#utils/constant';
import logger from '#utils/logger';
import express from 'express';
import cors from 'cors';
import userController from '#controller/userController';
import planController from '#controller/planController';
import subscriptionController from '#controller/subscriptionController';
import chatController from '#controller/chatController';
import cloudinaryConfiguration from '#config/cloudinaryConfiguration';
import analyticsController from '#controller/analyticsController';
import teamController from '#controller/teamController';
import textTestimonial from '#controller/textTestimonial';

const startServer = async () => {
    const app = express();
    const port = process.env.PORT || 8080;
    app.use(express.json());
    app.use(cors());
    cloudinaryConfiguration();

    app.get(
        '/',
        asyncHandler(async (req, res, next) => {
            return res.status(httpStatusCode.OK).json({
                status: httpStatus.SUCCESS,
                message: 'Hello Developers',
            });
        }),
    );

    app.use('/api', userAuthController);
    app.use('/api', individualController);
    app.use('/api', organisationalController);
    app.use('/api', paymentController);
    app.use('/api', chatBotController);
    app.use('/api', partnerController);
    app.use('/api', caseStudyController);
    app.use('/api', contactController);
    app.use('/api', blogController);
    app.use('/api', mediaController);
    app.use('/api', adminAuthController);
    app.use('/api', adminController);
    app.use('/api', complaintsController);
    app.use('/api', userController);
    // app.use('/api', planController);
    app.use('/api', subscriptionController);
    app.use('/api', chatController);
    app.use('/api', analyticsController);
    app.use('/api', teamController);
    app.use('/api', textTestimonial);

    app.use(ErrorMiddleware);

    const isConnected = await connectDb();
    if (isConnected) {
        app.listen(port, () => {
            logger.info(`http://localhost:${port}`);
        });
    }
};

export default startServer;
