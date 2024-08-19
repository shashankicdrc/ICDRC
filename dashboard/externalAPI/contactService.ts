import { httpStatus, httpStatusCode } from "@/lib/commonEnum";

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
