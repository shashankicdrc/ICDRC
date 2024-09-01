import { httpStatus, httpStatusCode } from '../lib/constant';

export const getBlogs = async (url) => {
    const response = await fetch(`${url}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    const { status, statusCode, message, data } = await response.json();
    if (httpStatusCode.OK !== statusCode && httpStatus.SUCCESS !== status) {
        return { error };
    } else {
        return { message, data };
    }
};
