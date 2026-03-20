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
        // Frontend (dashboard) single-submit endpoint (auth)
        // Accepts payload shape from frontend MediationForm.jsx
        this.router.post(
            '/mediation/cases',
            userAuthMiddleware,
            this.#createCaseFromFrontend,
        );
    }

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