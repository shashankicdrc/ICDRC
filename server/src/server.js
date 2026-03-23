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
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import cron from 'node-cron';
import { checkSubscriptions } from '#utils/checkSubscription';
import renewSubscriptionController from '#controller/renewSubscriptionController';
import mediationCaseController from '#controller/mediationCaseController';
import mediationPaymentController from '#controller/mediationPaymentController';

const startServer = async () => {
    const app = express();
    const port = process.env.PORT || 8080;

    var allowlist = [
        'http://localhost:3000',
        'http://localhost:3001',

        'https://dev-api.icdrc.in',
        'https://icdrc.in',
        'https://www.icdrc.in',
        'https://dashboard.icdrc.in',
    ];
    var corsOptionsDelegate = function (req, callback) {
        var corsOptions;
        if (allowlist.indexOf(req.header('Origin')) !== -1) {
            corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
        } else {
            corsOptions = { origin: false }; // disable CORS for this request
        }
        callback(null, corsOptions); // callback expects two parameters: error and options
    };

    app.use(express.json());
    app.use(cors(corsOptionsDelegate));
    app.set('trust proxy', 1);
    cloudinaryConfiguration();

    app.disable('x-powered-by');

    const limiter = rateLimit({
        windowMs: 10 * 60 * 1000,
        max: 300,
        message: 'You have exceeded the 300 requests in 10 minute limit!',
        standardHeaders: true,
        legacyHeaders: false,
    });

    app.use(helmet());
    app.use(hpp());
    app.use(limiter);

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
    app.use('/api', planController);
    app.use('/api', subscriptionController);
    app.use('/api', chatController);
    app.use('/api', analyticsController);
    app.use('/api', teamController);
    app.use('/api', textTestimonial);
    app.use('/api', renewSubscriptionController);
    app.use('/api', mediationCaseController);
    app.use('/api', mediationPaymentController);

    // Schedule a cron job to run every day at midnight
    cron.schedule('0 0 * * *', () => {
        console.log('Checking subscriptions to send reminder emails...');
        checkSubscriptions();
    });

    app.use(ErrorMiddleware);

    const isConnected = await connectDb();
    if (isConnected) {
        app.listen(port, () => {
            logger.info(`http://localhost:${port}`);
        });
    }
};

export default startServer;
