import { httpStatus, httpStatusCode } from "@/lib/commonEnum";
import { BASE_URL } from "@/lib/constant";

export const deleteChatBots = async (token: string, arr: string[]) => {
    const response = await fetch(`${BASE_URL}/api/chat-bots`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Beare ${token}`
        },
        body: JSON.stringify({ chatbotIds: arr })
    });
    const { status, statusCode, message, data } = await response.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    }
    return { message, data };
}

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
