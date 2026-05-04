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
import userAuthMiddleware from '#middlewares/UserAuthMiddleware';
import AdminAuthMiddleware from '#middlewares/AdminAuthMiddleware';
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
import CustomError from '#utils/CustomError';
import MediationCase from '#models/mediationCaseModel';
import renewSubscriptionController from '#controller/renewSubscriptionController';
import mediationCaseController from '#controller/mediationCaseController';
import mediationPaymentController from '#controller/mediationPaymentController';
import mediatorApplicationController from '#controller/mediatorApplicationController';
import { assignMediator } from './controller/mediationAssignEmail.js';
import { requestSession, caseAccept } from './controller/scheduleController.js';
import promBundle from 'express-prom-bundle';
const startServer = async () => {
    const app = express();

    const metricsMiddleware = promBundle({
        includeMethod: true,
        includePath: true,
        promClient: {
            collectDefaultMetrics: {} // Grabs CPU, RAM, and Node.js specific data
        }
    });
    // Attach the middleware
    app.use(metricsMiddleware);

    const port = process.env.PORT || 8080;

    var allowlist = [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://dev-api.icdrc.in',
        'http://77.37.45.141:3000',
        'http://77.37.45.141:3001',
        'https://icdrc.in',
        'https://www.icdrc.in',
        'https://dashboard.icdrc.in',
        'https://dev.icdrc.in',
        'https://admin.icdrc.in'
    ];

    app.use(express.json());

    // NEW CORS (FIXED)
    app.use(cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);

            if (allowlist.includes(origin)) {
                callback(null, true);
            } else {
                console.log("Blocked by CORS:", origin); // debug
                callback(new Error("CORS not allowed"));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    // VERY IMPORTANT (preflight fix)
    app.options('*', cors());
    // var corsOptionsDelegate = function (req, callback) {
    //     var corsOptions;
    //     if (allowlist.indexOf(req.header('Origin')) !== -1) {
    //         corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    //     } else {
    //         corsOptions = { origin: false }; // disable CORS for this request
    //     }
    //     callback(null, corsOptions); // callback expects two parameters: error and options
    // };

    // app.use(express.json());
    // app.use(cors(corsOptionsDelegate));
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
    app.use('/api', mediatorApplicationController);

    app.post('/api/cases/:caseId/assign-mediator', AdminAuthMiddleware, assignMediator);

    // Naye routes:
    app.put('/api/cases/:caseId/request-session', userAuthMiddleware, requestSession); // User ke liye
    app.put('/api/cases/:caseId/caseAccept', AdminAuthMiddleware, caseAccept);   // Admin ke liye
    app.put(
        '/api/cases/:caseId/close',
        AdminAuthMiddleware,
        asyncHandler(async (req, res) => {
            const { caseId } = req.params;
            const mediationCase = await MediationCase.findById(caseId);

            if (!mediationCase) {
                throw new CustomError('Mediation case not found.', httpStatusCode.NOT_FOUND);
            }

            if (mediationCase.status === 'Closed') {
                throw new CustomError('Mediation case is already closed.', httpStatusCode.BAD_REQUEST);
            }

            const updatedCase = await MediationCase.findByIdAndUpdate(
                caseId,
                { status: 'Closed' },
                { new: true },
            );

            return res.status(httpStatusCode.OK).json({
                status: httpStatus.SUCCESS,
                message: 'Case closed successfully.',
                data: updatedCase,
            });
        }),
    );

    // Schedule a cron job to run every day at midnight
    cron.schedule('0 0 * * *', async () => {
        logger.info('Checking subscriptions to send reminder emails...');
        try {
            await checkSubscriptions();
        } catch (error) {
            logger.error(`[cron] checkSubscriptions failed: ${error.message}`);
        }
    });

    app.use(ErrorMiddleware);

    const isConnected = await connectDb();
    if (isConnected) {
        const server = app.listen(port, () => {
            logger.info(`http://localhost:${port}`);
        });

        server.on('error', (err) => {
            if (err && err.code === 'EADDRINUSE') {
                logger.error(`Port ${port} already in use. Set process.env.PORT to a free port or stop the process using this port.`);
            } else {
                logger.error('Server error', err);
            }
            process.exit(1);
        });
    }
};

export default startServer;
