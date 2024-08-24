import { httpStatus, httpStatusCode } from "@/lib/commonEnum";
import { BASE_URL } from "@/lib/constant";

export const getRevenueData = async (token: string, url: string) => {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    });
    const { data, message } = await response.json();
    if (response.status !== httpStatusCode.OK) {
        return { error: message };
    } else {
        return { message, data };
    }
};


export const getSubscriptionData = async (token: string) => {
    const response = await fetch(`${BASE_URL}/api/analytics/subscription`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    });
    const { data, message } = await response.json();
    if (response.status !== httpStatusCode.OK) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const getCompalintChartData = async (token: string) => {
    const result = await fetch(`${BASE_URL}/api/analytics/complaints`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
    const { status, statusCode, message, data } = await result.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    } else {
        return { message, data };
    }
}
