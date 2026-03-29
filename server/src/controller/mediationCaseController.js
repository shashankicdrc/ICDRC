import UserService from '#services/userService';
import MediationCase from '#models/mediationCaseModel';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import { httpStatus, httpStatusCode } from '#utils/constant';
import userAuthMiddleware from '#middlewares/UserAuthMiddleware';
import express from 'express';
import busboy from 'busboy';
import { v2 as cloudinary } from 'cloudinary';
import { Transform } from 'node:stream';

const { Router } = express;

/** Mediation multipart uploads: per-file and combined limits before Cloudinary. */
const MEDIATION_MAX_FILE_BYTES = 5 * 1024 * 1024;
const MEDIATION_MAX_TOTAL_BYTES = 20 * 1024 * 1024;

class MediationCaseController extends Base {
    #userService;

    constructor() {
        super();
        this.router = Router();
        this.#userService = new UserService();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        // Frontend (dashboard) single-submit endpoint (auth)
        // Accepts payload shape from frontend MediationForm.jsx
        this.router.post(
            '/mediation/cases',
            userAuthMiddleware,
            this.#createCaseFromFrontend,
        );
    }

    /**
     * Streams one file to Cloudinary while enforcing per-file (5 MB) and
     * total (20 MB) size limits. Mutates totalCommittedRef on success.
     */
    #uploadMediationFileWithLimits(file, info, totalCommittedRef) {
        const filename = info?.filename || 'file';
        const mimeType = info?.mimeType || info?.mime || undefined;
        let fileBytes = 0;

        return new Promise((res, rej) => {
            const limiter = new Transform({
                transform(chunk, enc, cb) {
                    fileBytes += chunk.length;
                    if (fileBytes > MEDIATION_MAX_FILE_BYTES) {
                        cb(
                            new CustomError(
                                'Each file must be 5 MB or smaller.',
                                httpStatusCode.BAD_REQUEST,
                            ),
                        );
                        return;
                    }
                    if (
                        totalCommittedRef.value + fileBytes >
                        MEDIATION_MAX_TOTAL_BYTES
                    ) {
                        cb(
                            new CustomError(
                                'Total attachment size must be 20 MB or smaller.',
                                httpStatusCode.BAD_REQUEST,
                            ),
                        );
                        return;
                    }
                    cb(null, chunk);
                },
            });

            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'mediation_cases',
                    resource_type: 'auto',
                    filename_override: filename,
                    use_filename: true,
                },
                (error, result) => {
                    if (error) return rej(error);
                    totalCommittedRef.value += fileBytes;
                    return res({
                        name: filename,
                        url: result?.secure_url,
                        mimeType,
                    });
                },
            );

            const fail = (err) => {
                file.destroy();
                limiter.destroy();
                uploadStream.destroy();
                rej(err);
            };

            limiter.on('error', fail);
            uploadStream.on('error', fail);
            file.on('error', fail);

            file.pipe(limiter).pipe(uploadStream);
        });
    }

    async #parseMultipartAndUpload(req) {
        return await new Promise((resolve, reject) => {
            const fields = new Map();
            const uploaded = [];
            const totalCommittedRef = { value: 0 };
            let uploadsChain = Promise.resolve();

            const bb = busboy({ headers: req.headers });

            bb.on('field', (name, value) => {
                fields.set(name, value);
            });

            // Consume each file stream in order (busboy parses parts sequentially).
            bb.on('file', (fieldName, file, info) => {
                uploadsChain = uploadsChain.then(async () => {
                    uploaded.push(
                        await this.#uploadMediationFileWithLimits(
                            file,
                            info,
                            totalCommittedRef,
                        ),
                    );
                });
            });

            bb.on('error', (err) => reject(err));
            bb.on('finish', async () => {
                try {
                    await uploadsChain;
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
            });

            return this.response(
                res,
                httpStatusCode.OK,
                httpStatus.SUCCESS,
                'Mediation case submitted successfully.',
                { caseId: mediationCase.id, status: mediationCase.status },
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
        });

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Mediation case submitted successfully.',
            { caseId: mediationCase.id, status: mediationCase.status },
        );
    });
}

export default new MediationCaseController().router;