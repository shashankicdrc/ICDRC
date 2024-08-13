import caseStudyModel from '#models/caseStudyModel';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import { httpStatus, httpStatusCode } from '#utils/constant';
import { filterSort, parseFilters } from '#utils/filterSort';
import { Router } from 'express';

class CaseStudyController extends Base {
    constructor() {
        super();
        this.router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.post('/case-study', this.#addCaseStudy);
        this.router.get('/case-study', this.#getCaseStudy);
        this.router.get('/case-study/:id', this.#getCaseStudyById);
        this.router.delete('/case-study', this.#deleteCaseStudys);
    }

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

        const [caseStudy, totalCount] = await Promise.all([
            caseStudyModel.find(filterQuery).sort(Sorts).limit(perRow).exec(),
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
