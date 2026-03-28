import adminModel from '#models/adminModel';
import chatModel from '#models/chatModel';
import indComplaintModel from '#models/indComplaintModel';
import orgComplaintModel from '#models/orgComplaintModel';
import usermodel from '#models/userModel';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import { httpStatus, httpStatusCode } from '#utils/constant';
import { Router } from 'express';
import busboy from 'busboy';
import { EventEmitter } from 'node:events';
import logger from '#utils/logger';
import mongoose, { isValidObjectId } from 'mongoose';
import complaintMedia from '#models/complaintMediaModel';
import { v2 as cloudinary } from 'cloudinary';
import AdminAuthMiddleware from '#middlewares/AdminAuthMiddleware';
import userAuthMiddleware from '#middlewares/UserAuthMiddleware';

class ChatController extends Base {
    constructor() {
        super();
        this.router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.post('/chats', this.#addChat);
        this.router.get('/chats/:complaintId', this.#getChat);
        this.router.post('/chats/attachment', this.#attachment);
        this.router.get(
            '/admin/chats/recent',
            AdminAuthMiddleware,
            this.#recentadminRecentChats,
        );
        this.router.get('/admin/chats', AdminAuthMiddleware, this.#allChats);
        this.router.get('/chats', userAuthMiddleware, this.#userChats);
    }

    #userChats = asyncHandler(async (req, res) => {
        const allChats = await chatModel
            .find({ authorType: 'admins' })
            .sort({ createdAt: -1 })
            .populate({
                path: 'complaintId',
                select: 'userId caseId',
            })
            .exec();

        // Filter chats to only those that belong to the logged-in user
        const userSpecificChats = allChats.filter(
            (chat) =>
                chat.complaintId &&
                chat.complaintId.userId.toString() === req.id.toString(),
        );

        // Use a Map to keep track of the most recent chat per complaintId
        const recentChatsMap = new Map();

        // Iterate through the user-specific chats to select the most recent for each complaintId
        userSpecificChats.forEach((chat) => {
            const complaintId = chat.complaintId._id.toString();
            if (!recentChatsMap.has(complaintId)) {
                recentChatsMap.set(complaintId, chat);
            }
        });

        // Convert the Map values (which contains the most recent chats) to an array and limit to 5
        const recentChats = Array.from(recentChatsMap.values()).slice(0, 5);

        // Populate author details (e.g., name and email) for the recent chats
        const populatedChats = await chatModel.populate(recentChats, [
            { path: 'authorId', select: 'name email' },
        ]);

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Most recent chats fetched successfully.',
            populatedChats,
        );
    });

    #allChats = asyncHandler(async (req, res) => {
        const page = parseInt(req.query.page) || 1; // Current page, default to 1 if not provided
        const limit = parseInt(req.query.perRow) || 10;
        const caseId = req.query.caseId;

        if (caseId && caseId.length) {
            let complaintIds = [];

            const indComplaints = await indComplaintModel.find({
                caseId: { $regex: new RegExp(caseId, 'i') },
            });

            const orgComplaints = await orgComplaintModel.find({
                caseId: { $regex: new RegExp(caseId, 'i') },
            });

            indComplaints.forEach((complaint) =>
                complaintIds.push(complaint._id),
            );
            orgComplaints.forEach((complaint) =>
                complaintIds.push(complaint._id),
            );

            if (complaintIds.length === 0) {
                return this.response(
                    res,
                    httpStatusCode.OK,
                    httpStatus.SUCCESS,
                    'All chats fetched successfully.',
                    {
                        totalCount: 0,
                        chats: [],
                    },
                );
            }

            const allChats = await chatModel
                .aggregate([
                    {
                        $match: {
                            complaintId: { $in: complaintIds },
                        },
                    },
                    {
                        $sort: { complaintId: 1, createdAt: -1 },
                    },
                    {
                        $group: {
                            _id: '$complaintId',
                            mostRecentChat: { $first: '$$ROOT' },
                        },
                    },
                    {
                        $sort: { 'mostRecentChat.createdAt': -1 },
                    },
                    {
                        $project: {
                            _id: 1,
                            complaintId: '$mostRecentChat.complaintId',
                            authorId: '$mostRecentChat.authorId',
                            authorType: '$mostRecentChat.authorType',
                            text: '$mostRecentChat.text',
                            createdAt: '$mostRecentChat.createdAt',
                            attachment: '$mostRecentChat.attachment',
                            complaintType: '$mostRecentChat.complaintType',
                        },
                    },
                    {
                        $skip: (page - 1) * limit,
                    },
                    {
                        $limit: limit,
                    },
                ])
                .exec();

            const populatedChats = await chatModel.populate(allChats, [
                { path: 'authorId', select: 'name email' },
                { path: 'complaintId', select: 'caseId' },
            ]);

            return this.response(
                res,
                httpStatusCode.OK,
                httpStatus.SUCCESS,
                'All chats fetched successfully.',
                {
                    totalCount: populatedChats.length,
                    chats: populatedChats,
                },
            );
        }

        const totalChats = await chatModel
            .aggregate([
                {
                    $match: { authorType: 'user' },
                },
                {
                    $group: {
                        _id: '$complaintId',
                    },
                },
                {
                    $count: 'totalCount', // This will give the total number of grouped chats (by complaintId)
                },
            ])
            .exec();

        const totalCount = totalChats.length > 0 ? totalChats[0].totalCount : 0;

        // Now, get the paginated chats
        const allChats = await chatModel
            .aggregate([
                {
                    $match: { authorType: 'user' },
                },
                {
                    $sort: { complaintId: 1, createdAt: -1 },
                },
                {
                    $group: {
                        _id: '$complaintId',
                        mostRecentChat: { $first: '$$ROOT' },
                    },
                },
                {
                    $sort: { 'mostRecentChat.createdAt': -1 },
                },
                {
                    $project: {
                        _id: 1,
                        complaintId: '$mostRecentChat.complaintId',
                        authorId: '$mostRecentChat.authorId',
                        authorType: '$mostRecentChat.authorType',
                        text: '$mostRecentChat.text',
                        createdAt: '$mostRecentChat.createdAt',
                        attachment: '$mostRecentChat.attachment',
                        complaintType: '$mostRecentChat.complaintType',
                    },
                },
                {
                    $skip: (page - 1) * limit, // Skip previous pages
                },
                {
                    $limit: limit, // Limit to 'limit' number of results
                },
            ])
            .exec();

        const populatedChats = await chatModel.populate(allChats, [
            { path: 'authorId', select: 'name email' },
            { path: 'complaintId', select: 'caseId' },
        ]);

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'All chats fetched successfully.',
            {
                totalCount, // Send the total number of chats
                chats: populatedChats, // Send the paginated results
            },
        );
    });

    #recentadminRecentChats = asyncHandler(async (req, res) => {
        const recentChats = await chatModel
            .aggregate([
                {
                    $match: { authorType: 'user' },
                },
                {
                    $sort: { complaintId: 1, createdAt: -1 },
                },
                {
                    $group: {
                        _id: '$complaintId',
                        mostRecentChat: { $first: '$$ROOT' },
                    },
                },
                {
                    $sort: { 'mostRecentChat.createdAt': -1 },
                },
                {
                    $limit: 5,
                },
                {
                    $project: {
                        _id: 1,
                        complaintId: '$mostRecentChat.complaintId',
                        authorId: '$mostRecentChat.authorId',
                        authorType: '$mostRecentChat.authorType',
                        text: '$mostRecentChat.text',
                        createdAt: '$mostRecentChat.createdAt',
                        attachment: '$mostRecentChat.attachment',
                        complaintType: '$mostRecentChat.complaintType',
                    },
                },
            ])
            .exec();

        const populatedChats = await chatModel.populate(recentChats, [
            { path: 'authorId', select: 'name email' },
            { path: 'complaintId', select: 'caseId' },
        ]);

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Most recent chats fetched successfully.',
            populatedChats,
        );
    });

    #checkMissingFields(validFields, receivedFields) {
        const missingFields = validFields.filter(
            (field) => !receivedFields.includes(field),
        );
        if (missingFields.length > 0) {
            return {
                missing: true,
                message: `Missing fields: ${missingFields.join(', ')}`,
            };
        }
        return { missing: false };
    }

    #attachment = asyncHandler(async (req, res) => {
        const validFields = [
            'attachment_name',
            'complaintType',
            'complaintId',
            'authorType',
            'authorId',
        ];
        const complaintTypeArray = [
            'OrganizationComplaint',
            'IndividualComplaint',
        ];
        const authorTypeArr = ['user', 'admins'];
        const receivedFields = [];
        const fieldData = new Map();
        let hasError = false;

        const emitter = new EventEmitter();

        let filesCount = 0;
        const uploadedData = [];
        const bb = busboy({ headers: req.headers });

        async function handleError(fn) {
            try {
                await fn();
            } catch (e) {
                req.unpipe(bb);
                hasError = true;
            }
        }

        const uploader = () => {
            return cloudinary.uploader.upload_stream(
                { use_filename: true },
                (error, data) => {
                    if (error) {
                        return res.status(error.http_code).json({
                            message: error.message,
                            status: httpStatus.ERROR,
                            statusCode: httpStatusCode.BAD_REQUEST,
                        });
                    } else if (data) {
                        uploadedData.push({
                            url: data.secure_url,
                            public_id: data.public_id,
                        });
                        if (filesCount === uploadedData.length)
                            console.log('finished');
                        emitter.emit('updateDatabase');
                    }
                },
            );
        };

        emitter.on('updateDatabase', async () => {
            const attachment_name = fieldData.get('attachment_name');
            const complaintId = fieldData.get('complaintId');
            const complaintType = fieldData.get('complaintType');
            const authorType = fieldData.get('authorType');
            const authorId = fieldData.get('authorId');

            const newMedia = await complaintMedia.create({
                attachment_name,
                media: uploadedData,
            });

            const chatData = {
                complaintType,
                complaintId,
                authorType,
                authorId,
                attachment: newMedia._id,
            };

            const addChat = await chatModel.create(chatData);

            const comments = await addChat.populate([
                {
                    path: 'attachment',
                    select: '-media.public_id',
                },
                {
                    path: 'authorId',
                    select: 'name email',
                },
            ]);
            return res.status(httpStatusCode.OK).json({
                data: comments,
                message: 'Uploaded successfully',
                status: httpStatus.SUCCESS,
                statusCode: httpStatusCode.OK,
            });
        });

        bb.on('file', (filename, file) => {
            if (hasError) return;
            handleError(async () => {
                const checkField = this.#checkMissingFields(
                    validFields,
                    receivedFields,
                );
                if (checkField.missing) {
                    hasError = true;
                    return res.status(httpStatusCode.BAD_REQUEST).json({
                        message: checkField.message,
                        status: httpStatus.ERROR,
                    });
                }

                if (!checkField.missing) {
                    file.pipe(uploader());
                } else {
                    file.resume();
                }
            });

            file.on('end', () => (filesCount = filesCount + 1));
        });

        bb.on('field', (fieldName, value) => {
            if (hasError) return;
            receivedFields.push(fieldName);
            handleError(async () => {
                switch (fieldName) {
                    case 'authorType':
                        if (!authorTypeArr.includes(value)) {
                            hasError = true;
                            return res.status(httpStatusCode.BAD_REQUEST).json({
                                error: 'Invalid type',
                                status: httpStatus.ERROR,
                                statusCode: httpStatusCode.BAD_REQUEST,
                            });
                        }
                        fieldData.set(fieldName, value);
                        break;
                    case 'authorId':
                        if (!isValidObjectId(value)) {
                            hasError = true;
                            return res.status(httpStatusCode.BAD_REQUEST).json({
                                error: 'Invalid authorId',
                                status: httpStatus.ERROR,
                                statusCode: httpStatusCode.BAD_REQUEST,
                            });
                        }
                        fieldData.set(fieldName, value);
                        break;
                    case 'complaintType':
                        if (!complaintTypeArray.includes(value)) {
                            hasError = true;
                            return res.status(httpStatusCode.BAD_REQUEST).json({
                                error: 'Invalid complaint Type',
                                status: httpStatus.ERROR,
                                statusCode: httpStatusCode.BAD_REQUEST,
                            });
                        }
                        fieldData.set(fieldName, value);
                        break;
                    case 'complaintId':
                        if (!isValidObjectId(value)) {
                            hasError = true;
                            return res.status(httpStatusCode.BAD_REQUEST).json({
                                error: 'Invalid complaint Id',
                                status: httpStatus.ERROR,
                                statusCode: httpStatusCode.BAD_REQUEST,
                            });
                        }
                        fieldData.set(fieldName, value);
                        break;
                    case 'attachment_name':
                        if (value.length < 4) {
                            hasError = true;
                            return res.status(httpStatusCode.BAD_REQUEST).json({
                                error: 'Attachment Name must be atleast 4 characters.',
                                status: httpStatus.ERROR,
                                statusCode: httpStatusCode.BAD_REQUEST,
                            });
                        }
                        fieldData.set(fieldName, value);
                        break;
                }
            });
        });

        bb.on('error', (error) => {
            logger.error(error);
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: error,
                status: httpStatus.ERROR,
                statusCode: httpStatusCode.BAD_REQUEST,
            });
        });

        bb.on('finish', () => {
            if (!hasError) {
                logger.info('Finished');
            }
        });

        req.pipe(bb);
    });

    #getChat = asyncHandler(async (req, res) => {
        const { complaintId } = req.params;
        const chats = await chatModel
            .find({ complaintId })
            .populate({
                path: 'attachment',
                select: '-media.public_id',
            })
            .populate({
                path: 'authorId',
                select: 'name email',
            })
            .select('-updatedAt');
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Fetched successfully',
            chats,
        );
    });

    #addChat = asyncHandler(async (req, res) => {
        const { authorId, complaintId, authorType, complaintType, text } =
            req.body;
        let complaint;

        switch (complaintType) {
            case 'IndividualComplaint':
                complaint = await indComplaintModel.findById(complaintId);
                break;
            case 'OrganizationComplaint':
                complaint = await orgComplaintModel.findById(complaintId);
                break;
            default:
                throw new CustomError(
                    'Invalid complaint Type',
                    httpStatusCode.BAD_REQUEST,
                );
        }

        if (!complaint) {
            throw new CustomError('Complaint does not exist.');
        }

        let author;

        switch (authorType) {
            case 'admins':
                author = await adminModel.findById(authorId);
                break;
            case 'user':
                author = await usermodel.findById(authorId);
                break;
            default:
                throw new CustomError(
                    'Invalid author type',
                    httpStatusCode.BAD_REQUEST,
                );
        }

        let chatData = {
            authorId: author.id,
            authorType,
            complaintType,
            complaintId: complaint.id,
            text,
        };

        const chat = await chatModel.create(chatData);

        const newChat = await chat.populate({
            path: 'authorId',
            select: 'name email',
        });
        this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Chat is added successfully',
            newChat,
        );
    });
}

export default new ChatController().router;
