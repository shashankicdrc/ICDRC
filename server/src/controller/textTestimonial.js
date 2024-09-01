import AdminAuthMiddleware from '#middlewares/AdminAuthMiddleware';
import textTestimonialModel from '#models/reviewModel';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import { httpStatus, httpStatusCode } from '#utils/constant';
import { filterSort, parseFilters } from '#utils/filterSort';
import pagination from '#utils/pagination';
import { Router } from 'express';

class TextTestimonialController extends Base {
    constructor() {
        super();
        this.router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.post(
            '/testimonials',
            AdminAuthMiddleware,
            this.#addTestimonial,
        );

        this.router.get('/testimonials', this.#getTestimoials);
        this.router.put(
            '/testimonials',
            AdminAuthMiddleware,
            this.#editTestimonials,
        );
        this.router.delete(
            '/testimonials',
            AdminAuthMiddleware,
            this.#deleteTestimonials,
        );
    }

    #deleteTestimonials = asyncHandler(async (req, res) => {
        const { testimonialIds } = req.body;

        if (req.role !== 'admin') {
            throw new CustomError(
                "You dont' have right to delete the testimonials.",
                httpStatusCode.UNAUTHORIZED,
            );
        }

        const deleteData = await textTestimonialModel.updateMany(
            {
                _id: { $in: testimonialIds },
            },
            { isDeleted: true },
        );

        if (deleteData.modifiedCount !== testimonialIds.length) {
            throw new CustomError(
                'One or more testimonials does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Testimonial is deleted sucessfully.',
        );
    });

    #editTestimonials = asyncHandler(async (req, res) => {
        const { name, designation, stars, review, testimonialId } = req.body;
        const update = await textTestimonialModel.findByIdAndUpdate(
            testimonialId,
            {
                name,
                designation,
                stars,
                review,
            },
        );

        if (!update) {
            throw new CustomError(
                'Testimonial does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Testimonial is updated.',
        );
    });

    #getTestimoials = asyncHandler(async (req, res) => {
        let { perRow, page } = req.query;
        const { search } = new URL(req.url, `http://${req.headers.host}`);
        const { filters, Sorts } = filterSort(search);

        const filterQuery = { ...parseFilters(filters), isDeleted: false };

        page = Number(page) || 1;
        perRow = Number(perRow) || 20;

        const skip = pagination(page, perRow);

        const [testimonials, totalCount] = await Promise.all([
            textTestimonialModel
                .find(filterQuery)
                .sort(Sorts)
                .skip(skip)
                .limit(perRow)
                .select('-isDeleted')
                .exec(),
            textTestimonialModel.countDocuments(filterQuery).exec(),
        ]);

        const data = {
            testimonials,
            totalCount,
        };
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Testimonials data has been fetched Successfully.',
            data,
        );
    });

    #addTestimonial = asyncHandler(async (req, res) => {
        const { name, review, stars, designation } = req.body;

        const add = await textTestimonialModel.create({
            name,
            review,
            stars,
            designation,
        });

        if (!add)
            throw new CustomError(
                'Something went wrong please agian.',
                httpStatusCode.BAD_REQUEST,
            );

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Testimonial have been added successfully.',
        );
    });
}

export default new TextTestimonialController().router;
