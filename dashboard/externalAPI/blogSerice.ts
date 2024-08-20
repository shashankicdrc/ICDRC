import { httpStatus, httpStatusCode } from "@/lib/commonEnum";
import { BASE_URL } from "@/lib/constant";

export const getBlogById = async (id: string) => {
    const result = await fetch(`${BASE_URL}/api/blogs/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const { status, statusCode, message, data } = await result.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    } else {
        return { message, data };
    }
};


export const updateBlog = async (token: string, values: any) => {
    const result = await fetch(`${BASE_URL}/api/blogs`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...values })
    });
    const { status, statusCode, message, data } = await result.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    } else {
        return { message, data };
    }
};


export const createBlog = async (token: string, values: any) => {
    const result = await fetch(`${BASE_URL}/api/blogs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...values })
    });
    const { status, statusCode, message, data } = await result.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const deleteBlog = async (token: string, values: string[]) => {
    const result = await fetch(`${BASE_URL}/api/blogs`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ blogIds: values }),
    });
    const { status, statusCode, message, data } = await result.json();
    if (status !== httpStatus.SUCCESS && statusCode !== httpStatusCode.OK) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const getBlogs = async (token: string, url: string) => {
    const result = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        next: {
            tags: ["getBlogs"],
        },
    });
    const { status, statusCode, message, data } = await result.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    } else {
        return { message, data };
    }
};
