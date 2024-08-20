import partnerModel from '#models/partnerModel';
import { queues } from '#queues/queue';
import { Base } from '#utils/Base';
import CustomError from '#utils/CustomError';
import asyncHandler from '#utils/asyncHandler';
import {
    NOREPLYEMAIL,
    NewRegrecipients,
    htmlTemplate,
    httpStatus,
    httpStatusCode,
} from '#utils/constant';
import { filterSort, parseFilters } from '#utils/filterSort';
import pagination from '#utils/pagination';
import { Router } from 'express';

class PartnerController extends Base {
    constructor() {
        super();
        this.router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.post('/partners', this.#addPartner);
        this.router.get('/partners', this.#getPartners);
        this.router.delete('/partners', this.#deletePartners);
    }

    #deletePartners = asyncHandler(async (req, res) => {
        const { partnerIds } = req.body;
        const deletedData = await partnerModel.deleteMany({
            _id: { $in: partnerIds },
        });

        if (deletedData.deletedCount !== partnerIds.length) {
            throw new CustomError(
                'Partner data does not exist.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Chat bot data is deleted successfully.',
        );
    });

    #getPartners = asyncHandler(async (req, res) => {
        let { perRow, page } = req.query;
        const { search } = new URL(req.url, `http://${req.headers.host}`);
        const { filters, Sorts } = filterSort(search);

        const filterQuery = parseFilters(filters);

        page = Number(page) || 1;
        perRow = Number(perRow) || 20;

        const skip = pagination(page, perRow);

        const [partners, totalCount] = await Promise.all([
            partnerModel
                .find(filterQuery)
                .sort(Sorts)
                .skip(skip)
                .limit(perRow)
                .exec(),
            partnerModel.countDocuments(filterQuery).exec(),
        ]);

        const data = {
            partners,
            totalCount,
        };
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Partner data has been fetched Successfully.',
            data,
        );
    });

    #addPartner = asyncHandler(async (req, res) => {
        const { name, email, mobile, company } = req.body;
        const createPartner = await partnerModel.create({
            name,
            email,
            mobile,
            company,
        });

        const emailData = {
            name: createPartner.name,
            email: createPartner.email,
            mobile: createPartner.mobile,
            company: createPartner.company,
            date: createPartner.createdAt.toLocaleString(),
        };

        const templateLink = process.cwd() + `/src/templates/partner`;
        const emailTemplate = htmlTemplate(
            `${templateLink}/index.html`,
            emailData,
        );
        const emailTemplate2 = htmlTemplate(
            `${templateLink}/client.html`,
            emailData,
        );

        const emailMessage = {
            from: NOREPLYEMAIL,
            to: NewRegrecipients,
            subject: 'New Partner with Us Form Submission on ICDRC Website',
            html: emailTemplate,
        };
        const emailMessage2 = {
            from: NOREPLYEMAIL,
            to: [createPartner.email],
            subject: 'Thank You for Your Interest in Partnering with ICDRC',
            html: emailTemplate2,
        };
        queues.EmailQueue.add('send-mail', emailMessage);
        queues.EmailQueue.add('send-mail', emailMessage2);

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Thank you for your interest in partnering with ICDRC. Our team will contact you soon.',
        );
    });
}

export default new PartnerController().router;
