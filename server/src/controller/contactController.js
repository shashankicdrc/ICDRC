import contactModel from '#models/contactModel';
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

class ContactController extends Base {
    constructor() {
        super();
        this.router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.post('/contacts', this.#addContact);
        this.router.get('/contacts', this.#getContacts);
        this.router.delete('/contacts', this.#deleteContacts);
    }

    #deleteContacts = asyncHandler(async (req, res) => {
        const { contactIds } = req.body;
        const deletedData = await contactModel.updateMany(
            { _id: { $in: contactIds } },
            { $set: { isDeleted: true } },
        );

        if (deletedData.modifiedCount !== contactIds.length) {
            throw new CustomError(
                'Some contact data does not exist or is already deleted.',
                httpStatusCode.BAD_REQUEST,
            );
        }
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Contact data is deleted successfully.',
        );
    });

    #getContacts = asyncHandler(async (req, res) => {
        let { perRow, page } = req.query;
        const { search } = new URL(req.url, `http://${req.headers.host}`);
        const { filters, Sorts } = filterSort(search);

        const filterQuery = { ...parseFilters(filters), isDeleted: false };

        page = Number(page) || 1;
        perRow = Number(perRow) || 20;

        const skip = pagination(page, perRow);

        const [contacts, totalCount] = await Promise.all([
            contactModel
                .find(filterQuery)
                .sort(Sorts)
                .skip(skip)
                .limit(perRow)
                .exec(),
            contactModel.countDocuments(filterQuery).exec(),
        ]);

        const data = {
            contacts,
            totalCount,
        };
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Contact data has been fetched Successfully.',
            data,
        );
    });

    #addContact = asyncHandler(async (req, res) => {
        const { name, email, mobile, whatsapp, message } = req.body;
        const createContact = await contactModel.create({
            name,
            email,
            mobile,
            message,
            whatsapp,
        });

        const emailData = {
            name: createContact.name,
            email: createContact.email,
            mobile: createContact.mobile,
            content: createContact.message,
            date: createContact.createdAt.toLocaleString(),
        };

        const templateLink = process.cwd() + `/src/templates/contact`;
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
            subject: 'New Contact Form Submission on ICDRC Website',
            html: emailTemplate,
        };
        const emailMessage2 = {
            from: NOREPLYEMAIL,
            to: [createContact.email],
            subject: 'Acknowledgement of Your Inquiry at ICDRC',
            html: emailTemplate2,
        };
        queues.EmailQueue.add('send-mail', emailMessage);
        queues.EmailQueue.add('send-mail', emailMessage2);

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Your message has ben sent.',
        );
    });
}

export default new ContactController().router;
