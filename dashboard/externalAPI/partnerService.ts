import { httpStatus, httpStatusCode } from "@/lib/commonEnum";

export const getPartners = async (url: string) => {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            tags: ["getPartners"],
        },
    });
    const { status, statusCode, message, data } = await response.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    }
    return { message, data };
};
