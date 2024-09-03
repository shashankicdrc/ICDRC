import { httpStatus, httpStatusCode } from "@/lib/commonEnum";
import { BASE_URL } from "@/lib/constant";

export const getMediaById = async (token: string, id: string) => {
    const result = await fetch(`${BASE_URL}/api/media/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        next: {
            tags: ['getMediaById']
        }
    });
    const { status, statusCode, message, data } = await result.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    } else {
        return { message, data };
    }

}

export const deleteMedia = async (token: string, values: any) => {
    const result = await fetch(`${BASE_URL}/api/media`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mediaIds: values })
    });
    const { status, statusCode, message } = await result.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    } else {
        return { message };
    }

}


export const editMedia = async (token: string, values: any) => {
    const result = await fetch(`${BASE_URL}/api/media`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values)
    });
    const { status, statusCode, message } = await result.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    } else {
        return { message };
    }

}

export const addMedia = async (token: string, values: any) => {
    const result = await fetch(`${BASE_URL}/api/media`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values)
    });
    const { status, statusCode, message } = await result.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    } else {
        return { message };
    }
};

export const getMedia = async (token: string, url: string) => {
    const result = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        next: {
            tags: ["getMedias"],
        },
    });
    const { status, statusCode, message, data } = await result.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    } else {
        return { message, data };
    }
};
