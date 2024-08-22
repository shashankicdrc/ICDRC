import { httpStatus, httpStatusCode } from "@/lib/commonEnum";
import { BASE_URL } from "@/lib/constant";

export const deleteContacts = async (token: string, arr: string[]) => {
    const response = await fetch(`${BASE_URL}/api/contacts`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ contactIds: arr })
    });
    const { status, statusCode, message, data } = await response.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    }
    return { message, data };
}

export const getContacts = async (url: string) => {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            tags: ["getContacts"],
        },
    });
    const { status, statusCode, message, data } = await response.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    }
    return { message, data };
}
