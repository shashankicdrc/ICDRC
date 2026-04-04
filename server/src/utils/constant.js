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

/**
 * Which PhonePe hosts to call. Set PHONEPE_ENV=production when using live
 * dashboard credentials while NODE_ENV is not production (e.g. local tests).
 * Set PHONEPE_ENV=sandbox for UAT credentials on a production Node process.
 */
export const phonePeEnv =
    process.env.PHONEPE_ENV === 'production' ||
    process.env.PHONEPE_ENV === 'sandbox'
        ? process.env.PHONEPE_ENV
        : process.env.NODE_ENV === 'production'
          ? 'production'
          : 'sandbox';

// PhonePe v2 Checkout API - pay endpoint
export const PHONE_PAY_URL =
    phonePeEnv === 'production'
        ? 'https://api.phonepe.com/apis/pg/checkout/v2'
        : 'https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2';

// PhonePe v2 OAuth token (prod uses identity-manager per official docs)
export const PHONE_PAY_AUTH_URL =
    phonePeEnv === 'production'
        ? 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token'
        : 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';

/**
 * Form body for POST .../oauth/token. Use explicitClientVersion for initiate
 * (often SALT_INDEX) vs status checks (often "1") per integration notes.
 */
function _trimEnv(value) {
    if (value === undefined || value === null) return value;
    const s = String(value).trim();
    return s === '' ? undefined : s;
}

export function buildPhonePeOAuthParams(explicitClientVersion) {
    let clientVersion;
    if (
        explicitClientVersion !== undefined &&
        explicitClientVersion !== null &&
        String(explicitClientVersion).trim() !== ''
    ) {
        clientVersion = String(explicitClientVersion).trim();
    } else {
        clientVersion =
            _trimEnv(process.env.PHONEPE_CLIENT_VERSION) ||
            _trimEnv(process.env.SALT_INDEX) ||
            '1';
    }
    const clientId =
        _trimEnv(process.env.PHONEPE_CLIENT_ID) ||
        _trimEnv(process.env.MERCHANT_ID);
    const clientSecret =
        _trimEnv(process.env.PHONEPE_CLIENT_SECRET) ||
        _trimEnv(process.env.SALT_KEY);
    return {
        client_id: clientId,
        client_secret: clientSecret,
        client_version: clientVersion,
        grant_type: 'client_credentials',
    };
}
