import logger from "#utils/logger";
import fs from 'fs'
import ejs from 'ejs'

export const NOREPLYEMAIL = "no_reply@icdrc.in";

export const htmlTemplate = (templatePath, data) => {
    logger.info(`filePath: ${templatePath}`);
    const emailTemplate = fs.readFileSync(templatePath, "utf-8");
    const renderedEmail = ejs.render(emailTemplate, data);
    return renderedEmail;
};

export const httpStatusCode = {
    UNPROCESSABLE_ENTITY: 422,
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

export const httpStatus = {
    SUCCESS: "success",
    FAIL: "fail",
    ERROR: "error"
};
