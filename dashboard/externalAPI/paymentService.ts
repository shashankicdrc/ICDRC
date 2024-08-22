import { httpStatus, httpStatusCode } from "@/lib/commonEnum";
import { BASE_URL } from "@/lib/constant";

export const getRecentPaymentHistory = async (token: string) => {
    const response = await fetch(`${BASE_URL}/api/admin/payments/history/recent`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });
    const { status, statusCode, message, data } = await response.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    }
    return { message, data };
};

export const getPaymentHistory = async (token: string, url: string) => {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        next: {
            tags: ["getPaymentHistory"],
        },
    });
    const { status, statusCode, message, data } = await response.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    }
    return { message, data };
};
