import { httpStatus, httpStatusCode } from "@/lib/commonEnum";
import { BASE_URL } from "@/lib/constant";

export const RecentIndividualCase = async (token: string) => {
    const response = await fetch(`${BASE_URL}/api/admin/individual/complaints/recent`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    const { status, statusCode, message, data } = await response.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    }
    return { message, data };
};

export const deleteIndividualCase = async (token: string, arr: string[]) => {
    const response = await fetch(`${BASE_URL}/api/admin/individual/complaints`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ individualIds: arr })
    });
    const { status, statusCode, message, data } = await response.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    }
    return { message, data };
};

export const getIndividualCase = async (token: string, url: string) => {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        next: {
            tags: ["getIndividualCase"],
        },
    });
    const { status, statusCode, message, data } = await response.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    }
    return { message, data };
};
