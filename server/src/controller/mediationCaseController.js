import UserService from '#services/userService';
import MediationCase from '#models/mediationCaseModel';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import { httpStatus, httpStatusCode } from '#utils/constant';
import userAuthMiddleware from '#middlewares/UserAuthMiddleware';
import AdminAuthMiddleware from '#middlewares/AdminAuthMiddleware';
import pagination from '#utils/pagination';
import express from 'express';
import busboy from 'busboy';
import { v2 as cloudinary } from 'cloudinary';
import { queues } from '#queues/queue';

const { Router } = express;

class MediationCaseController extends Base {
    #userService;

    constructor() {
        super();
        this.router = Router();
        this.#userService = new UserService();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.get(
            '/mediation/cases',
            userAuthMiddleware,
            this.#listCasesForUser,
        );
        this.router.get(
            '/mediation/cases/:id',
            userAuthMiddleware,
            this.#getCaseByIdForUser,
        );
        this.router.put(
            '/mediation/cases/:id',
            userAuthMiddleware,
            this.#updateCaseForUser,
        );
        // Frontend (dashboard) single-submit endpoint (auth)
        // Accepts payload shape from frontend MediationForm.jsx
        this.router.post(
            '/mediation/cases',
            userAuthMiddleware,
            this.#createCaseFromFrontend,
        );

        this.router.get(
            '/admin/mediation/cases',
            AdminAuthMiddleware,
            this.#adminListMediationCases,
        );
        this.router.get(
            '/admin/mediation/cases/:id',
            AdminAuthMiddleware,
            this.#adminGetMediationCaseById,
        );
        this.router.put(
            '/admin/mediation/cases/:id/accept',
            AdminAuthMiddleware,
            this.#acceptCase,
        );
        this.router.put(
            '/admin/mediation/cases/:id/close',
            AdminAuthMiddleware,
            this.#closeCase,
        );
    }

    #listCasesForUser = asyncHandler(async (req, res) => {
        const cases = await MediationCase.find({ userId: req.id }).sort({
            createdAt: -1,
        });
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Mediation cases fetched successfully.',
            cases,
        );
    });

    #getCaseByIdForUser = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const mediationCase = await MediationCase.findById(id);
        if (!mediationCase) {
            throw new CustomError(
                'Mediation case not found.',
                httpStatusCode.NOT_FOUND,
            );
        }
        if (String(mediationCase.userId) !== String(req.id)) {
            throw new CustomError(
                "You don't have permission to access this case.",
                httpStatusCode.UNAUTHORIZED,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Mediation case fetched successfully.',
            mediationCase,
        );
    });

    #adminListMediationCases = asyncHandler(async (req, res) => {
        let { perRow, page, paymentStatus } = req.query;
        page = Number(page) || 1;
        perRow = Number(perRow) || 20;
        const skip = pagination(page, perRow);

        const filter = {};

        // Back-compat: some clients may send "Paid" / "Pending"
        const normalizedPaymentStatus = paymentStatus
            ? String(paymentStatus).trim()
            : undefined;

        if (normalizedPaymentStatus === 'Paid') {
            filter.paymentStatus = 'Success';
        } else if (normalizedPaymentStatus === 'Pending') {
            filter.paymentStatus = 'Pending';
        } else if (
            normalizedPaymentStatus &&
            ['Pending', 'Success', 'Failed'].includes(normalizedPaymentStatus)
        ) {
            filter.paymentStatus = normalizedPaymentStatus;
        }

        const [cases, totalCount] = await Promise.all([
            MediationCase.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(perRow)
                .populate('userId', 'name email profilePic')
                .lean(),
            MediationCase.countDocuments(filter),
        ]);

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Mediation cases fetched successfully.',
            { cases, totalCount, page, perRow },
        );
    });

    #adminGetMediationCaseById = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const mediationCase = await MediationCase.findById(id)
            .populate('userId', 'name email profilePic')
            .lean();
        if (!mediationCase) {
            throw new CustomError(
                'Mediation case not found.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Mediation case fetched successfully.',
            mediationCase,
        );
    });

    #acceptCase = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const mediationCase = await MediationCase.findById(id);
        if (!mediationCase) {
            throw new CustomError(
                'Mediation case not found.',
                httpStatusCode.NOT_FOUND,
            );
        }

        if (mediationCase.status !== 'Submitted') {
            throw new CustomError(
                'Case must be in Submitted status to be accepted.',
                httpStatusCode.BAD_REQUEST,
            );
        }

        if (mediationCase.paymentStatus !== 'Paid' && mediationCase.paymentStatus !== 'Success') {
            throw new CustomError(
                'Case payment must be successful before accepting.',
                httpStatusCode.BAD_REQUEST,
            );
        }

        const updatedCase = await MediationCase.findByIdAndUpdate(
            id,
            { status: 'Accepted' },
            { new: true },
        );

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Case accepted successfully.',
            updatedCase,
        );
    });

    #closeCase = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const mediationCase = await MediationCase.findById(id);

        if (!mediationCase) {
            throw new CustomError('Mediation case not found.', httpStatusCode.NOT_FOUND);
        }

        if (mediationCase.status === 'Closed') {
            throw new CustomError('Mediation case is already closed.', httpStatusCode.BAD_REQUEST);
        }

        // Optionally you can restrict allowed statuses to close
        // if (![ 'Settled', 'Not Settled', 'In Mediation', 'Mediator Assigned' ].includes(mediationCase.status)) {
        //     throw new CustomError('Case cannot be closed from current status.', httpStatusCode.BAD_REQUEST);
        // }

        const updatedCase = await MediationCase.findByIdAndUpdate(
            id,
            { status: 'Closed' },
            { new: true },
        );

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Case closed successfully.',
            updatedCase,
        );
    });

    async #findEditableCaseForUser(userId) {
        // "Editable" = not paid yet (or failed) and not closed.
        return await MediationCase.findOne({
            userId,
            status: { $in: ['Draft', 'Submitted'] },
            paymentStatus: { $in: ['Pending', 'Failed'] },
        }).sort({ createdAt: -1 });
    }

    #assertEditable(mediationCase) {
        if (!mediationCase) return;
        if (mediationCase.status === 'Paid' || mediationCase.paymentStatus === 'Success') {
            throw new CustomError(
                'This case is already paid and cannot be edited.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        if (mediationCase.status === 'Closed') {
            throw new CustomError(
                'This case is closed and cannot be edited.',
                httpStatusCode.BAD_REQUEST,
            );
        }
    }

    #normalizeFiles(files) {
        return Array.isArray(files)
            ? files
                  .map((f) => {
                      if (!f) return null;
                      if (typeof f === 'string') return { name: f, url: f };
                      if (typeof f === 'object')
                          return { name: f.name, url: f.url };
                      return null;
                  })
                  .filter(Boolean)
            : undefined;
    }

    #updateCaseForUser = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const mediationCase = await MediationCase.findById(id);
        if (!mediationCase) {
            throw new CustomError(
                'Mediation case not found.',
                httpStatusCode.NOT_FOUND,
            );
        }
        if (String(mediationCase.userId) !== String(req.id)) {
            throw new CustomError(
                "You don't have permission to edit this case.",
                httpStatusCode.UNAUTHORIZED,
            );
        }
        this.#assertEditable(mediationCase);

        const contentType = req.headers['content-type'] || '';
        const isMultipart =
            typeof contentType === 'string' &&
            contentType.includes('multipart/form-data');

        if (isMultipart) {
            const { fields, uploaded } = await this.#parseMultipartAndUpload(req);
            const patch = {
                fullName: fields.get('fullName') ?? mediationCase.fullName,
                email: (fields.get('email') || req.email || mediationCase.email),
                opponentName:
                    fields.get('opponentName') ?? mediationCase.opponentName,
                description:
                    fields.get('description') ?? mediationCase.description,
                category: fields.get('category') ?? mediationCase.category,
                amount:
                    fields.get('amount') === '' ||
                    fields.get('amount') === null ||
                    fields.get('amount') === undefined
                        ? mediationCase.amount
                        : Number(fields.get('amount')),
                timeline: fields.get('timeline') ?? mediationCase.timeline,
                jurisdiction:
                    fields.get('jurisdiction') ?? mediationCase.jurisdiction,
                language: fields.get('language') ?? mediationCase.language,
                resolution: fields.get('resolution') ?? mediationCase.resolution,
                isSubscribed:
                    fields.get('isSubscribed') === true ||
                    fields.get('isSubscribed') === 'true' ||
                    fields.get('isSubscribed') === '1' ||
                    mediationCase.isSubscribed,
                subscriptionId:
                    fields.get('subscriptionId') ??
                    mediationCase.subscriptionId ??
                    undefined,
            };

            const newFiles = uploaded
                .filter((u) => u?.url)
                .map((u) => ({ name: u.name, url: u.url }));
            if (newFiles.length) patch.files = newFiles;

            const updated = await MediationCase.findByIdAndUpdate(
                mediationCase.id,
                patch,
                { new: true },
            );

            return this.response(
                res,
                httpStatusCode.OK,
                httpStatus.SUCCESS,
                'Mediation case updated successfully.',
                updated,
            );
        }

        const {
            fullName,
            email,
            opponentName,
            description,
            category,
            amount,
            timeline,
            jurisdiction,
            language,
            resolution,
            files,
            isSubscribed,
            subscriptionId,
        } = req.body;

        const patch = {
            fullName: fullName ?? mediationCase.fullName,
            email: (email || req.email || mediationCase.email),
            opponentName: opponentName ?? mediationCase.opponentName,
            description: description ?? mediationCase.description,
            category: category ?? mediationCase.category,
            amount:
                amount === '' || amount === null || amount === undefined
                    ? mediationCase.amount
                    : Number(amount),
            timeline: timeline ?? mediationCase.timeline,
            jurisdiction: jurisdiction ?? mediationCase.jurisdiction,
            language: language ?? mediationCase.language,
            resolution: resolution ?? mediationCase.resolution,
            isSubscribed:
                isSubscribed === undefined || isSubscribed === null
                    ? mediationCase.isSubscribed
                    : Boolean(isSubscribed),
            subscriptionId:
                subscriptionId ?? mediationCase.subscriptionId ?? undefined,
        };

        const normalizedFiles = this.#normalizeFiles(files);
        if (normalizedFiles) patch.files = normalizedFiles;

        const updated = await MediationCase.findByIdAndUpdate(
            mediationCase.id,
            patch,
            { new: true },
        );

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Mediation case updated successfully.',
            updated,
        );
    });

    async #parseMultipartAndUpload(req) {
        return await new Promise((resolve, reject) => {
            const fields = new Map();
            const uploads = [];

            const bb = busboy({ headers: req.headers });

            bb.on('field', (name, value) => {
                fields.set(name, value);
            });

            bb.on('file', (fieldName, file, info) => {
                const filename = info?.filename || 'file';
                const mimeType = info?.mimeType || info?.mime || undefined;

                const uploadPromise = new Promise((res, rej) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: 'mediation_cases',
                            resource_type: 'auto',
                            filename_override: filename,
                            use_filename: true,
                        },
                        (error, result) => {
                            if (error) return rej(error);
                            return res({
                                name: filename,
                                url: result?.secure_url,
                                mimeType,
                                fieldName,
                            });
                        },
                    );
                    file.pipe(stream);
                });

                uploads.push(uploadPromise);
            });

            bb.on('error', (err) => reject(err));
            bb.on('finish', async () => {
                try {
                    const uploaded = await Promise.all(uploads);
                    resolve({ fields, uploaded });
                } catch (e) {
                    reject(e);
                }
            });

            req.pipe(bb);
        });
    }

    #createCaseFromFrontend = asyncHandler(async (req, res) => {
        const contentType = req.headers['content-type'] || '';
        const isMultipart =
            typeof contentType === 'string' &&
            contentType.includes('multipart/form-data');

        if (isMultipart) {
            const { fields, uploaded } = await this.#parseMultipartAndUpload(req);

            const fullName = fields.get('fullName');
            const email = fields.get('email');
            const opponentName = fields.get('opponentName');
            const description = fields.get('description');
            const category = fields.get('category');
            const amount = fields.get('amount');
            const timeline = fields.get('timeline');
            const jurisdiction = fields.get('jurisdiction');
            const language = fields.get('language');
            const resolution = fields.get('resolution');
            const isSubscribedRaw = fields.get('isSubscribed');
            const subscriptionId = fields.get('subscriptionId');

            if (
                !fullName ||
                !opponentName ||
                !description ||
                !category ||
                !jurisdiction
            ) {
                throw new CustomError(
                    'Missing required fields.',
                    httpStatusCode.BAD_REQUEST,
                );
            }

            const finalEmail = email || req.email;
            if (!finalEmail) {
                throw new CustomError(
                    'Email is required.',
                    httpStatusCode.BAD_REQUEST,
                );
            }

            const isSubscribed =
                isSubscribedRaw === true ||
                isSubscribedRaw === 'true' ||
                isSubscribedRaw === '1';

            const files = uploaded
                .filter((u) => u?.url)
                .map((u) => ({ name: u.name, url: u.url }));

            const existing = await this.#findEditableCaseForUser(req.id);
            if (existing) {
                this.#assertEditable(existing);
                const updated = await MediationCase.findByIdAndUpdate(
                    existing.id,
                    {
                        fullName,
                        email: finalEmail,
                        opponentName,
                        description,
                        category,
                        amount:
                            amount === '' || amount === null || amount === undefined
                                ? undefined
                                : Number(amount),
                        timeline,
                        jurisdiction,
                        language,
                        resolution,
                        files: files?.length ? files : existing.files,
                        isSubscribed,
                        subscriptionId: subscriptionId || undefined,
                        status: 'Submitted',
                        paymentStatus:
                            existing.paymentStatus === 'Failed'
                                ? 'Pending'
                                : existing.paymentStatus,
                    },
                    { new: true },
                );
                return this.response(
                    res,
                    httpStatusCode.OK,
                    httpStatus.SUCCESS,
                    'Mediation case updated successfully.',
                    {
                        caseId: updated.id,
                        status: updated.status,
                        paymentStatus: updated.paymentStatus,
                    },
                    
                );
            }

            const mediationCase = await MediationCase.create({
                userId: req.id,
                fullName,
                email: finalEmail,
                opponentName,
                description,
                category,
                amount:
                    amount === '' || amount === null || amount === undefined
                        ? undefined
                        : Number(amount),
                timeline,
                jurisdiction,
                language,
                resolution,
                files,
                isSubscribed,
                subscriptionId: subscriptionId || undefined,
                status: 'Submitted',
                paymentStatus: 'Pending',
            });

            return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Mediation case submitted successfully.',
            {
                caseId: mediationCase.id,
                status: mediationCase.status,
                paymentStatus: mediationCase.paymentStatus,
    },
);
        }

        const {
            fullName,
            email,
            opponentName,
            description,
            category,
            amount,
            timeline,
            jurisdiction,
            language,
            resolution,
            files,
            isSubscribed,
            subscriptionId,
        } = req.body;

        if (
            !fullName ||
            !opponentName ||
            !description ||
            !category ||
            !jurisdiction
        ) {
            throw new CustomError(
                'Missing required fields.',
                httpStatusCode.BAD_REQUEST,
            );
        }

        const finalEmail = email || req.email;
        if (!finalEmail) {
            throw new CustomError(
                'Email is required.',
                httpStatusCode.BAD_REQUEST,
            );
        }

        const normalizedFiles = Array.isArray(files)
            ? this.#normalizeFiles(files)
            : undefined;

        const existing = await this.#findEditableCaseForUser(req.id);
        if (existing) {
            this.#assertEditable(existing);
            const updated = await MediationCase.findByIdAndUpdate(
                existing.id,
                {
                    fullName,
                    email: finalEmail,
                    opponentName,
                    description,
                    category,
                    amount:
                        amount === '' || amount === null || amount === undefined
                            ? undefined
                            : Number(amount),
                    timeline,
                    jurisdiction,
                    language,
                    resolution,
                    files: normalizedFiles ?? existing.files,
                    isSubscribed: Boolean(isSubscribed),
                    subscriptionId: subscriptionId || undefined,
                    status: 'Submitted',
                    paymentStatus:
                        existing.paymentStatus === 'Failed'
                            ? 'Pending'
                            : existing.paymentStatus,
                },
                { new: true },
            );

            return this.response(
                res,
                httpStatusCode.OK,
                httpStatus.SUCCESS,
                'Mediation case updated successfully.',
                {
    caseId: updated.id,
    status: updated.status,
    paymentStatus: updated.paymentStatus,
},
            );
        }

        const mediationCase = await MediationCase.create({
            userId: req.id,
            fullName,
            email: finalEmail,
            opponentName,
            description,
            category,
            amount:
                amount === '' || amount === null || amount === undefined
                    ? undefined
                    : Number(amount),
            timeline,
            jurisdiction,
            language,
            resolution,
            files: normalizedFiles,
            isSubscribed: Boolean(isSubscribed),
            subscriptionId: subscriptionId || undefined,
            status: 'Submitted',
            paymentStatus: 'Pending',
        });

        return this.response(
        res,
        httpStatusCode.OK,
        httpStatus.SUCCESS,
        'Mediation case submitted successfully.',
    {
        caseId: mediationCase.id,
        status: mediationCase.status,
        paymentStatus: mediationCase.paymentStatus,
    },
);
    });
}

export default new MediationCaseController().router;