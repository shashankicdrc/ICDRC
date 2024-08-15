import { BASE_URL, httpStatus, httpStatusCode } from '../lib/constant';

export const addOrganizationComplaint = async (token, userData) => {
    const result = await fetch(`${BASE_URL}/api/organisational/complaints`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ ...userData }),
    });
    const { message, statusCode, status } = await result.json();
    if (httpStatusCode.OK !== statusCode && httpStatus.SUCCESS !== status) {
        return { error: message };
    } else {
        return { message };
    }
};

export const addIndividualComplaint = async (token, userData) => {
    const result = await fetch(`${BASE_URL}/api/individual/complaints`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ ...userData }),
    });
    const { message, statusCode, status } = await result.json();
    if (httpStatusCode.OK !== statusCode && httpStatus.SUCCESS !== status) {
        return { error: message };
    } else {
        return { message };
    }
};
