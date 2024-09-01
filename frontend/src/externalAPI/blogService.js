import { BASE_URL, httpStatus, httpStatusCode } from '../lib/constant';

export const getBlogById = async (id) => {
    const response = await fetch(`${BASE_URL}/api/blogs/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    const { status, statusCode, message, data } = await response.json();
    if (httpStatusCode.OK !== statusCode && httpStatus.SUCCESS !== status) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const getBlogs = async (url) => {
    const response = await fetch(`${url}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    const { status, statusCode, message, data } = await response.json();
    if (httpStatusCode.OK !== statusCode && httpStatus.SUCCESS !== status) {
        return { error: message };
    } else {
        return { message, data };
    }
};
