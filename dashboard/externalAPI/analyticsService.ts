import { httpStatus, httpStatusCode } from "@/lib/commonEnum";

export const getCompalintChartData = async (token: string, url: string) => {
    const result = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        next: {
            tags: ["getCompalintChartData"],
        },
    });
    const { status, statusCode, message, data } = await result.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    } else {
        return { message, data };
    }
}
