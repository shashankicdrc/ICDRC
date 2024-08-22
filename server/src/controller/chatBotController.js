import chatBotModel from '#models/chatBotModel';
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

class ChatBotController extends Base {
    constructor() {
        super();
        this.router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes() {
        this.router.post('/chat-bots', this.#addChatBot);
        this.router.get('/chat-bots', this.#getChatBots);
        this.router.delete('/chat-bots', this.#deleteChatBots);
    }

    #deleteChatBots = asyncHandler(async (req, res) => {
        const { chatbotIds } = req.body;
        const deletedData = await chatBotModel.updateMany(
            { _id: { $in: chatbotIds } },
            { $set: { isDeleted: true } },
        );

        if (deletedData.modifiedCount !== chatbotIds.length) {
            throw new CustomError(
                'Some chat bot data does not exist or is already deleted.',
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

    #getChatBots = asyncHandler(async (req, res) => {
        let { perRow, page } = req.query;
        const { search } = new URL(req.url, `http://${req.headers.host}`);
        const { filters, Sorts } = filterSort(search);

        const filterQuery = { ...parseFilters(filters), isDeleted: false };

        page = Number(page) || 1;
        perRow = Number(perRow) || 20;

        const skip = pagination(page, perRow);

        const [chatbots, totalCount] = await Promise.all([
            chatBotModel
                .find(filterQuery)
                .sort(Sorts)
                .skip(skip)
                .limit(perRow)
                .exec(),
            chatBotModel.countDocuments(filterQuery).exec(),
        ]);

        const data = {
            chatbots,
            totalCount,
        };
        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Chat bot data has been fetched Successfully.',
            data,
        );
    });

    #addChatBot = asyncHandler(async (req, res) => {
        const { name, email, mobile, issue } = req.body;
        const createChatBot = await chatBotModel.create({
            name,
            email,
            mobile,
            issue,
        });

        const emailData = {
            name: createChatBot.name,
            email: createChatBot.email,
            mobile: createChatBot.mobile,
            content: createChatBot.issue,
            date: createChatBot.createdAt.toLocaleString(),
        };

        const templateLink = process.cwd() + `/src/templates/chatbot`;
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
            subject: 'New enquiry received in chatbot on ICDRC Website',
            html: emailTemplate,
        };
        const emailMessage2 = {
            from: NOREPLYEMAIL,
            to: [createChatBot.email],
            subject: 'Acknowledgement of Your Inquiry at ICDRC',
            html: emailTemplate2,
        };
        queues.EmailQueue.add('send-mail', emailMessage);
        queues.EmailQueue.add('send-mail', emailMessage2);

        return this.response(
            res,
            httpStatusCode.OK,
            httpStatus.SUCCESS,
            'Chat bot data has ben submitted Successfully.',
        );
    });
}

export default new ChatBotController().router;
