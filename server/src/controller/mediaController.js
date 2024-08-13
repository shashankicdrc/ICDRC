import mediaModel from '#models/mediaModel';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import { httpStatus, httpStatusCode } from '#utils/constant';
import { filterSort, parseFilters } from '#utils/filterSort';
import { Router } from 'express';

class MediaController extends Base {
    constructor() {
        super();
        this.router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.post('/media', this.#addMedia);
        this.router.get('/media', this.#getMedia);
        this.router.get('/media/:id', this.#getMediaById);
        this.router.delete('/media', this.#deleteMedias);
    }

    #getMediaById = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const getMediaData = await mediaModel.findById(id);
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
        const deletedData = await mediaModel.deleteMany({
            _id: { $in: mediaIds },
        });

        if (deletedData.deletedCount !== mediaIds.length) {
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

        const filterQuery = parseFilters(filters);

        page = Number(page) || 1;
        perRow = Number(perRow) || 20;

        const [media, totalCount] = await Promise.all([
            mediaModel.find(filterQuery).sort(Sorts).limit(perRow).exec(),
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
        let { name, image, video } = req.body;
        await mediaModel.create({
            name,
            image,
            video,
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
