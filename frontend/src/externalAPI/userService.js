import { BASE_URL, httpStatus, httpStatusCode } from '../lib/constant';

export const resetPassword = async (values) => {
    const result = await fetch(`${BASE_URL}/api/auth/reset/password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    const { message, statusCode, status, data } = await result.json();
    if (httpStatusCode.OK !== statusCode && httpStatus.SUCCESS !== status) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const resetPasswordReq = async (values) => {
    const result = await fetch(`${BASE_URL}/api/auth/reset/password/request`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    const { message, statusCode, status, data } = await result.json();
    if (httpStatusCode.OK !== statusCode && httpStatus.SUCCESS !== status) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const signup = async (values) => {
    const result = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    const { message, statusCode, status, data } = await result.json();
    if (httpStatusCode.OK !== statusCode && httpStatus.SUCCESS !== status) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const changePassword = async (token, values) => {
    const result = await fetch(`${BASE_URL}/api/auth/change/password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
    });
    const { message, statusCode, status, data } = await result.json();
    if (httpStatusCode.OK !== statusCode && httpStatus.SUCCESS !== status) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const updateProfile = async (token, values) => {
    const result = await fetch(`${BASE_URL}/api/users`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
    });
    const { message, statusCode, status, data } = await result.json();
    if (httpStatusCode.OK !== statusCode && httpStatus.SUCCESS !== status) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const verifySocialtoken = async (token) => {
    try {
        const result = await fetch(`${BASE_URL}/api/auth/token/verification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idToken: token,
            }),
        });
        const response = await result.json();
        if (result.status !== 200) {
            return { error: response.error };
        }
        return {
            access_token: response.access_token,
            refresh_token: response.refresh_token,
        };
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

export const createUser = async (userData) => {
    const result = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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

export const getUserDetails = async (token) => {
    const result = await fetch(`${BASE_URL}/api/users`, {
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

export const getUserByEmail = async (email) => {
    const result = await fetch(`${BASE_URL}/api/users/email?email=${email}`);
    const { message, statusCode, status, data } = await result.json();
    if (httpStatusCode.OK !== statusCode && httpStatus.SUCCESS !== status) {
        return { error: message };
    } else {
        return { message, data };
    }
};
