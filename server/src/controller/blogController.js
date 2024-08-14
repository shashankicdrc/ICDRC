import blogModel from '#models/blogsModel';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import { httpStatus, httpStatusCode } from '#utils/constant';
import { filterSort, parseFilters } from '#utils/filterSort';
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
        this.router.delete('/blogs', this.#deleteBlogs);
    }

    #getBlogById = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const getBlogData = await blogModel.findById(id);
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
        const deletedData = await blogModel.deleteMany({
            _id: { $in: blogIds },
        });

        if (deletedData.deletedCount !== blogIds.length) {
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

        const filterQuery = parseFilters(filters);

        page = Number(page) || 1;
        perRow = Number(perRow) || 20;

        const [blogs, totalCount] = await Promise.all([
            blogModel.find(filterQuery).sort(Sorts).limit(perRow).exec(),
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
