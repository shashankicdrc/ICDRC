import logger from '#utils/logger';
import fs from 'fs';
import ejs from 'ejs';

export const NOREPLYEMAIL = process.env.NOREPLYEMAIL || 'no_reply@icdrc.in';

export const policyTypeToEmail = {
    'Life Insurance': 'lifeinsurance@icdrc.in',
    'Health Insurance': 'kartikey090803@gmail.com',
    'Motor Insurance': 'motorinsurance@icdrc.in',
    'Travel Insurance': 'travelinsurance@icdrc.in',
    'Crop Insurance': 'crop@icdrc.in',
    'Fire Insurance': 'fireinsurance@icdrc.in',
    'Marine Insurance': 'marineinsurance@icdrc.in',
    'Liability Insurance': 'liabilityinsurance@icdrc.in',
    'Cyber Insurance': 'cyberinsurance@icdrc.in',
    'Personal Accident Insurance': 'personalaccidentinsurance@icdrc.in',
    'Property Insurance': 'propertyinsurance@icdrc.in',
    'Professional Indemnity Insurance':
        'professionalindemnityinsurance@icdrc.in',
    'Event Insurance': 'eventinsurance@icdrc.in',
};

export const getPolicyEmail = (type) => {
    return policyTypeToEmail[type];
};

export const NewRegrecipients = ['admin@icdrc.in', 'info@icdrc.in'];

export const htmlTemplate = (templatePath, data) => {
    logger.info(`filePath: ${templatePath}`);
    const emailTemplate = fs.readFileSync(templatePath, 'utf-8');
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
    INTERNAL_SERVER_ERROR: 500,
};

export const httpStatus = {
    SUCCESS: 'success',
    FAIL: 'fail',
    ERROR: 'error',
};

export const FRONTEND_URL =
    process.env.FRONTEND_URL || 'http://localhost:3000';

// PhonePe v2 Checkout API - pay endpoint
export const PHONE_PAY_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://api.phonepe.com/apis/pg/checkout/v2'
        : 'https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2';

// PhonePe v2 OAuth token endpoint
export const PHONE_PAY_AUTH_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://api.phonepe.com/apis/pg/v1/oauth/token'
        : 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';
