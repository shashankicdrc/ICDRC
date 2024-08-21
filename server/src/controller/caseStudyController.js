import AdminAuthMiddleware from '#middlewares/AdminAuthMiddleware';
import caseStudyModel from '#models/caseStudyModel';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import { httpStatus, httpStatusCode } from '#utils/constant';
import { filterSort, parseFilters } from '#utils/filterSort';
import pagination from '#utils/pagination';
import { Router } from 'express';

class CaseStudyController extends Base {
    constructor() {
        super();
        this.router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.post(
            '/case-study',
            AdminAuthMiddleware,
            this.#addCaseStudy,
        );
        this.router.get('/case-study', this.#getCaseStudy);
        this.router.get('/case-study/:id', this.#getCaseStudyById);
        this.router.delete(
            '/case-study',
            AdminAuthMiddleware,
            this.#deleteCaseStudys,
        );
        this.router.put(
            '/case-study',
            AdminAuthMiddleware,
            this.#updateCaseStudy,
        );
    }

    #updateCaseStudy = asyncHandler(async (req, res) => {
        let { caseStudyId, name, description, image, content } = req.body;
        if (req.role !== 'admin') {
            throw new CustomError("You don't have any right to delete.");
        }
        const updateCaseStudy = await caseStudyModel.findByIdAndUpdate(
            caseStudyId,
            {
                name,
                description,
                image,
                content,
            },
        );
        if (!updateCaseStudy) {
            throw new CustomError(
                'Blog does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Case Study is updated successfully.',
        );
    });

    #getCaseStudyById = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const getCaseStudyData = await caseStudyModel.findById(id);
        if (!getCaseStudyData) {
            throw new CustomError(
                'Case study does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Fetched Successfully',
            getCaseStudyData,
        );
    });

    #deleteCaseStudys = asyncHandler(async (req, res) => {
        const { caseStudyIds } = req.body;
        if (req.role !== 'admin') {
            throw new CustomError("You don't have any right to delete.");
        }

        const deletedData = await caseStudyModel.deleteMany({
            _id: { $in: caseStudyIds },
        });

        if (deletedData.deletedCount !== caseStudyIds.length) {
            throw new CustomError(
                'CaseStudy data does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Case Study data is deleted successfully.',
        );
    });

    #getCaseStudy = asyncHandler(async (req, res) => {
        let { perRow, page } = req.query;
        const { search } = new URL(req.url, `http://${req.headers.host}`);
        const { filters, Sorts } = filterSort(search);

        const filterQuery = parseFilters(filters);

        page = Number(page) || 1;
        perRow = Number(perRow) || 20;
        const skip = pagination(page, perRow);

        const [caseStudy, totalCount] = await Promise.all([
            caseStudyModel
                .find(filterQuery)
                .skip(skip)
                .sort(Sorts)
                .limit(perRow)
                .exec(),
            caseStudyModel.countDocuments(filterQuery).exec(),
        ]);

        const data = {
            caseStudy,
            totalCount,
        };
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'CaseStudy data has been fetched Successfully.',
            data,
        );
    });

    #addCaseStudy = asyncHandler(async (req, res) => {
        let { name, description, image, content } = req.body;
        await caseStudyModel.create({
            name,
            image,
            content,
            description,
        });

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Case Study has been added successfully.',
        );
    });
}

export default new CaseStudyController().router;
