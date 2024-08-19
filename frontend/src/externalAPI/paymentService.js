import { BASE_URL, httpStatus, httpStatusCode } from '../lib/constant';

export const userRecentPayments = async (token) => {
    const result = await fetch(`${BASE_URL}/api/payments/history/recent`, {
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

export const userPaymentHistory = async (token) => {
    const result = await fetch(`${BASE_URL}/api/payments/history`, {
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

export const initiatePayment = async (token, values) => {
    const result = await fetch(`${BASE_URL}/api/payments/initiate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...values }),
    });
    const { message, statusCode, status, data } = await result.json();
    if (httpStatusCode.OK !== statusCode && httpStatus.SUCCESS !== status) {
        return { error: message };
    } else {
        return { message, data };
    }
};
