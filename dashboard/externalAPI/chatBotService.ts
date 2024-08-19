import { httpStatus, httpStatusCode } from "@/lib/commonEnum";

export const getChatBots = async (token: string, url: string) => {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Beare ${token}`
        },
        next: {
            tags: ["getChatBots"],
        },
    });
    const { status, statusCode, message, data } = await response.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    }
    return { message, data };
}
