import {
    PHONE_PAY_AUTH_URL,
    buildPhonePeOAuthParams,
    phonePeEnv,
    httpStatusCode,
} from '#utils/constant';
import CustomError from '#utils/CustomError';
import logger from '#utils/logger';

/**
 * @param {string | number | undefined} explicitClientVersion - e.g. process.env.SALT_INDEX for pay, "1" for some status flows
 * @returns {Promise<string>} access_token
 */
export async function requestPhonePeAccessToken(explicitClientVersion) {
    const params = buildPhonePeOAuthParams(explicitClientVersion);
    if (!params.client_id || !params.client_secret) {
        throw new CustomError(
            'PhonePe OAuth: set MERCHANT_ID and SALT_KEY (or PHONEPE_CLIENT_ID / PHONEPE_CLIENT_SECRET).',
            httpStatusCode.BAD_REQUEST,
        );
    }

    const authRes = await fetch(PHONE_PAY_AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(params),
    });

    const raw = await authRes.text();
    let authData;
    try {
        authData = JSON.parse(raw);
    } catch {
        logger.warn('PhonePe OAuth non-JSON response', {
            status: authRes.status,
            snippet: raw.slice(0, 400),
        });
        throw new CustomError(
            `PhonePe auth failed (HTTP ${authRes.status}). Ensure PHONEPE_ENV matches your credentials (sandbox vs production).`,
            httpStatusCode.BAD_REQUEST,
        );
    }

    if (!authRes.ok || !authData.access_token) {
        const apiDetail = [
            authData.message,
            authData.error_description,
            authData.error,
            authData.code != null ? String(authData.code) : '',
        ]
            .filter(Boolean)
            .join(' — ');
        const detail = apiDetail || raw.slice(0, 280) || `HTTP ${authRes.status}`;
        logger.warn('PhonePe OAuth rejected', {
            httpStatus: authRes.status,
            phonePeEnv,
            authUrl: PHONE_PAY_AUTH_URL,
            authData,
        });
        const hint401 =
            authRes.status === 401
                ? ' Use Client ID, Client Secret, and Client Version from PhonePe Dashboard → Developer Settings (PG v2). Ensure PHONEPE_ENV matches those credentials (sandbox UAT vs production). Legacy SALT_KEY is not always the OAuth client_secret.'
                : '';
      throw new CustomError(
            `PhonePe auth failed (${authRes.status}): ${detail}.${hint401}`,
            httpStatusCode.BAD_REQUEST,
        );
    }

    return authData.access_token;
}
