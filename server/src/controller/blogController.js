import AdminAuthMiddleware from '#middlewares/AdminAuthMiddleware';
import blogModel from '#models/blogsModel';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import { httpStatus, httpStatusCode } from '#utils/constant';
import { filterSort, parseFilters } from '#utils/filterSort';
import pagination from '#utils/pagination';
import { Router } from 'express';

class BlogController extends Base {
    constructor() {
        super();
        this.router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.post('/blogs', this.#addBlog);
        this.router.get('/blogs', this.#getBlog);
        this.router.get('/blogs/:id', this.#getBlogById);
        this.router.delete('/blogs', AdminAuthMiddleware, this.#deleteBlogs);
        this.router.put('/blogs', AdminAuthMiddleware, this.#updateBlog);
    }

    #updateBlog = asyncHandler(async (req, res) => {
        let { blogId, name, description, image, content, keywords } = req.body;
        const updateBlog = await blogModel.findByIdAndUpdate(blogId, {
            name,
            description,
            image,
            content,
            keywords,
        });
        if (!updateBlog) {
            throw new CustomError(
                'Blog does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Blog is updated successfully.',
        );
    });

    #getBlogById = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const getBlogData = await blogModel.findOne({
            _id: id,
            isDeleted: false,
        });
        if (!getBlogData) {
            throw new CustomError(
                'Blog does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Fetched Successfully',
            getBlogData,
        );
    });

    #deleteBlogs = asyncHandler(async (req, res) => {
        const { blogIds } = req.body;
        if (req.role !== 'admin') {
            throw new CustomError(
                "You dont' have right to delete the blog.",
                httpStatusCode.UNAUTHORIZED,
            );
        }
        const deletedData = await blogModel.updateMany(
            {
                _id: { $in: blogIds },
            },
            { $set: { isDeleted: true } },
        );

        if (deletedData.modifiedCount !== blogIds.length) {
            throw new CustomError(
                'Blog data does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Blog is deleted successfully.',
        );
    });

    #getBlog = asyncHandler(async (req, res) => {
        let { perRow, page } = req.query;
        const { search } = new URL(req.url, `http://${req.headers.host}`);
        const { filters, Sorts } = filterSort(search);

        const filterQuery = { ...parseFilters(filters), isDeleted: false };

        page = Number(page) || 1;
        perRow = Number(perRow) || 20;

        const skip = pagination(page, perRow);

        const [blogs, totalCount] = await Promise.all([
            blogModel
                .find(filterQuery)
                .sort(Sorts)
                .skip(skip)
                .limit(perRow)
                .exec(),
            blogModel.countDocuments(filterQuery).exec(),
        ]);

        const data = {
            blogs,
            totalCount,
        };
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Blog data has been fetched Successfully.',
            data,
        );
    });

    #addBlog = asyncHandler(async (req, res) => {
        let { name, description, image, content, keywords } = req.body;
        await blogModel.create({
            name,
            image,
            content,
            description,
            keywords,
        });

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'BLog has been added successfully.',
        );
    });
}

export default new BlogController().router;
