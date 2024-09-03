import AdminAuthMiddleware from '#middlewares/AdminAuthMiddleware';
import mediaModel from '#models/mediaModel';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import { httpStatus, httpStatusCode } from '#utils/constant';
import { filterSort, parseFilters } from '#utils/filterSort';
import logger from '#utils/logger';
import { Router } from 'express';

class MediaController extends Base {
    constructor() {
        super();
        this.router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.post('/media', AdminAuthMiddleware, this.#addMedia);
        this.router.get('/media', this.#getMedia);
        this.router.get('/media/:id', this.#getMediaById);
        this.router.delete('/media', AdminAuthMiddleware, this.#deleteMedias);
        this.router.put('/media', AdminAuthMiddleware, this.#updateMedia);
    }

    #updateMedia = asyncHandler(async (req, res) => {
        const { mediaId, type, video, image, name } = req.body;

        const updated = await mediaModel.findByIdAndUpdate(
            mediaId,
            {
                type,
                video,
                image,
                name,
            },
            { new: true },
        );
        logger.info(updated);
        if (!updated) {
            throw new CustomError(
                'Media does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Media has been updated successfully.',
        );
    });

    #getMediaById = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const getMediaData = await mediaModel.findById(id).select('-isDeleted');
        if (!getMediaData) {
            throw new CustomError(
                'Media does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Fetched Successfully',
            getMediaData,
        );
    });

    #deleteMedias = asyncHandler(async (req, res) => {
        const { mediaIds } = req.body;

        const deletedData = await mediaModel.updateMany(
            {
                _id: { $in: mediaIds },
            },
            { $set: { isDeleted: true } },
        );

        if (deletedData.modifiedCount !== mediaIds.length) {
            throw new CustomError(
                'Media data does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Media is deleted successfully.',
        );
    });

    #getMedia = asyncHandler(async (req, res) => {
        let { perRow, page } = req.query;
        const { search } = new URL(req.url, `http://${req.headers.host}`);
        const { filters, Sorts } = filterSort(search);

        const filterQuery = { ...parseFilters(filters), isDeleted: false };

        page = Number(page) || 1;
        perRow = Number(perRow) || 20;

        const [media, totalCount] = await Promise.all([
            mediaModel
                .find(filterQuery)
                .sort(Sorts)
                .limit(perRow)
                .select('-isDeleted')
                .exec(),
            mediaModel.countDocuments(filterQuery).exec(),
        ]);

        const data = {
            media,
            totalCount,
        };
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Media data has been fetched Successfully.',
            data,
        );
    });

    #addMedia = asyncHandler(async (req, res) => {
        let { name, type, image, video } = req.body;
        await mediaModel.create({
            name,
            image,
            video,
            type,
        });

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Media has been added successfully.',
        );
    });
}

export default new MediaController().router;
