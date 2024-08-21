import { httpStatus, httpStatusCode } from "@/lib/commonEnum";

export const getSubscriptions = async (token: string, url: string) => {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        next: {
            tags: ["getSubscriptions"],
        },
    });
    const { status, statusCode, message, data } = await response.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    }
    return { message, data };
};
