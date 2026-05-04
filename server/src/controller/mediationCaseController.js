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

const { Router } = express;

class MediationCaseController extends Base {
    constructor() {
        super();
        this.router = Router();
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
        if (paymentStatus) {
            const normalized = paymentStatus === 'Paid' ? 'Success' : paymentStatus;
            if (['Pending', 'Success', 'Failed'].includes(normalized)) {
                filter.paymentStatus = normalized;
            }
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

        return this.response(res, httpStatusCode.OK, httpStatus.SUCCESS, 'Mediation cases fetched successfully.', { cases, totalCount, page, perRow });
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

    #validateRequiredFields(data) {
        const missingFields = [];
        if (!data.fullName) missingFields.push('fullName');
        if (!data.contactNumber) missingFields.push('contactNumber');
        if (!data.whatsappNumber) missingFields.push('whatsappNumber');
        if (!data.opponentName) missingFields.push('opponentName');
        if (!data.opponentEmail) missingFields.push('opponentEmail');
        if (!data.opponentContact) missingFields.push('opponentContact');
        if (!data.description) missingFields.push('description');
        if (!data.amount) missingFields.push('amount');
        if (!data.caseType) missingFields.push('caseType');
        
        const termsAcceptedValid = data.termsAccepted === 'true' || 
                                   data.termsAccepted === '1' || 
                                   data.termsAccepted === 'on' || 
                                   data.termsAccepted === true;
        if (!termsAcceptedValid) missingFields.push('termsAccepted');

        if (missingFields.length > 0) {
            throw new CustomError(
                `Missing or invalid required fields: ${missingFields.join(', ')}`,
                httpStatusCode.BAD_REQUEST,
            );
        }
    }

    #updateCaseForUser = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const mediationCase = await MediationCase.findById(id);
        if (!mediationCase) {
            throw new CustomError('Mediation case not found.', httpStatusCode.NOT_FOUND);
        }
        if (String(mediationCase.userId) !== String(req.id)) {
            throw new CustomError("You don't have permission to edit this case.", httpStatusCode.UNAUTHORIZED);
        }
        this.#assertEditable(mediationCase);

        const contentType = req.headers['content-type'] || '';
        const isMultipart = contentType.includes('multipart/form-data');

        let updates = {};
        if (isMultipart) {
            const { fields } = await this.#parseMultipartAndUpload(req);
            updates = {
                fullName: fields.get('fullName') || mediationCase.fullName,
                email: fields.get('email') || req.email || mediationCase.email,
                contactNumber: fields.get('contactNumber') || mediationCase.contactNumber,
                whatsappNumber: fields.get('whatsappNumber') || mediationCase.whatsappNumber,
                opponentName: fields.get('opponentName') || mediationCase.opponentName,
                opponentEmail: fields.get('opponentEmail') || mediationCase.opponentEmail,
                opponentContact: fields.get('opponentContact') || mediationCase.opponentContact,
                description: fields.get('description') || mediationCase.description,
                amount: fields.get('amount') ? Number(fields.get('amount')) : mediationCase.amount,
                termsAccepted: fields.get('termsAccepted') === 'true' || fields.get('termsAccepted') === '1',
            };
        } else {
            const { fullName, email, contactNumber, whatsappNumber, opponentName, opponentEmail, opponentContact, description, amount, termsAccepted } = req.body;
            updates = {
                fullName: fullName || mediationCase.fullName,
                email: email || req.email || mediationCase.email,
                contactNumber: contactNumber || mediationCase.contactNumber,
                whatsappNumber: whatsappNumber || mediationCase.whatsappNumber,
                opponentName: opponentName || mediationCase.opponentName,
                opponentEmail: opponentEmail || mediationCase.opponentEmail,
                opponentContact: opponentContact || mediationCase.opponentContact,
                description: description || mediationCase.description,
                amount: amount ? Number(amount) : mediationCase.amount,
                termsAccepted: termsAccepted !== undefined ? Boolean(termsAccepted) : mediationCase.termsAccepted,
            };
        }

        const updated = await MediationCase.findByIdAndUpdate(id, updates, { new: true });
        return this.response(res, httpStatusCode.OK, httpStatus.SUCCESS, 'Mediation case updated successfully.', updated);
    });

    async #parseMultipartAndUpload(req) {
        return await new Promise((resolve, reject) => {
            const fields = new Map();
            const uploads = [];

            const bb = busboy({ headers: req.headers });

            bb.on('field', (name, value) => {
                // Trim field names to remove any leading/trailing whitespace
                const trimmedName = name.trim();
                fields.set(trimmedName, value);
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
        const isMultipart = contentType.includes('multipart/form-data');

        let formData = {};
        if (isMultipart) {
            const { fields } = await this.#parseMultipartAndUpload(req);
            formData = {
                fullName: fields.get('fullName'),
                email: fields.get('email'),
                contactNumber: fields.get('contactNumber'),
                whatsappNumber: fields.get('whatsappNumber'),
                opponentName: fields.get('opponentName'),
                opponentEmail: fields.get('opponentEmail'),
                opponentContact: fields.get('opponentContact'),
                description: fields.get('description'),
                amount: fields.get('amount'),
                termsAccepted: fields.get('termsAccepted'),
                caseType: fields.get('caseType'),
            };
        } else {
            formData = req.body;
        }

        // Validate required fields
        this.#validateRequiredFields(formData);

        const finalEmail = formData.email || req.email;
        if (!finalEmail) {
            throw new CustomError('Email is required.', httpStatusCode.BAD_REQUEST);
        }

        const termsAccepted = formData.termsAccepted === 'true' || 
                              formData.termsAccepted === '1' || 
                              formData.termsAccepted === true;
        const amount = Number(formData.amount);

        const existing = await this.#findEditableCaseForUser(req.id);
        if (existing) {
            this.#assertEditable(existing);
            const updated = await MediationCase.findByIdAndUpdate(
                existing.id,
                {
                    fullName: formData.fullName,
                    email: finalEmail,
                    contactNumber: formData.contactNumber,
                    whatsappNumber: formData.whatsappNumber,
                    opponentName: formData.opponentName,
                    opponentEmail: formData.opponentEmail,
                    opponentContact: formData.opponentContact,
                    description: formData.description,
                    amount,
                    termsAccepted,
                    caseType: formData.caseType,
                    status: 'Submitted',
                    paymentStatus: existing.paymentStatus === 'Failed' ? 'Pending' : existing.paymentStatus,
                },
                { new: true },
            );
            return this.response(
                res,
                httpStatusCode.OK,
                httpStatus.SUCCESS,
                'Mediation case updated successfully.',
                { caseId: updated.id, status: updated.status, paymentStatus: updated.paymentStatus },
            );
        }

        const mediationCase = await MediationCase.create({
            userId: req.id,
            fullName: formData.fullName,
            email: finalEmail,
            contactNumber: formData.contactNumber,
            whatsappNumber: formData.whatsappNumber,
            opponentName: formData.opponentName,
            opponentEmail: formData.opponentEmail,
            opponentContact: formData.opponentContact,
            description: formData.description,
            amount,
            termsAccepted,
            caseType: formData.caseType,
            status: 'Submitted',
            paymentStatus: 'Pending',
        });

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Mediation case submitted successfully.',
            { caseId: mediationCase.id, status: mediationCase.status, paymentStatus: mediationCase.paymentStatus },
        );
    });
}

export default new MediationCaseController().router;