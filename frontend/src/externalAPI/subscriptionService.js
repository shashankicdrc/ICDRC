import { BASE_URL, httpStatus, httpStatusCode } from '../lib/constant';

export const getUserSubscription = async (token) => {
    const result = await fetch(`${BASE_URL}/api/subscription/user`, {
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

export const initiateSubscription = async (token, planId) => {
    const result = await fetch(
        `${BASE_URL}/api/subscription/initiate?planId=${planId}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        },
    );
    const { message, statusCode, status, data } = await result.json();
    if (httpStatusCode.OK !== statusCode && httpStatus.SUCCESS !== status) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const getPlanById = async (id) => {
    const result = await fetch(`${BASE_URL}/api/plans/${id}`);
    const { message, statusCode, status, data } = await result.json();
    if (httpStatusCode.OK !== statusCode && httpStatus.SUCCESS !== status) {
        return { error: message };
    } else {
        return { message, data };
    }
};
