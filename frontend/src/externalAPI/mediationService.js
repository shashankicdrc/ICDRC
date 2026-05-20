import { BASE_URL, httpStatus, httpStatusCode } from '../lib/constant';

export const addMediationCase = async (token, mediationData) => {
    const result = await fetch(`${BASE_URL}/api/mediation/cases`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...mediationData }),
    });
    const { message, statusCode, status, data } = await result.json();
    if (httpStatusCode.OK !== statusCode && httpStatus.SUCCESS !== status) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const getMediationCases = async (token) => {
    const result = await fetch(`${BASE_URL}/api/mediation/cases`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const { message, statusCode, status, data } = await result.json();
    if (httpStatusCode.OK !== statusCode && httpStatus.SUCCESS !== status) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const getMediationCaseById = async (token, id) => {
    const result = await fetch(`${BASE_URL}/api/mediation/cases/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const { message, statusCode, status, data } = await result.json();
    if (httpStatusCode.OK !== statusCode && httpStatus.SUCCESS !== status) {
        return { error: message };
    } else {
        return { message, data };
    }
};
