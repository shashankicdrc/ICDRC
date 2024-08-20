import { httpStatus, httpStatusCode } from "@/lib/commonEnum";
import { BASE_URL } from "@/lib/constant";

export const getOrganisationName = async (token: string) => {
    const response = await fetch(`${BASE_URL}/api/admin/organisational/complaints/organisationName`, {
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


export const getOrganisationalCase = async (token: string, url: string) => {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        next: {
            tags: ["getOrganisationalCase"],
        },
    });
    const { status, statusCode, message, data } = await response.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    }
    return { message, data };
};
