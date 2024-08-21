import { httpStatus, httpStatusCode } from "@/lib/commonEnum";
import { BASE_URL } from "@/lib/constant";

export const getCaseStudyById = async (id: string) => {
    const result = await fetch(`${BASE_URL}/api/case-study/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const { status, statusCode, message, data } = await result.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    } else {
        return { message, data };
    }
};


export const updateCaseStudy = async (token: string, values: any) => {
    const result = await fetch(`${BASE_URL}/api/case-study`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...values })
    });
    const { status, statusCode, message, data } = await result.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    } else {
        return { message, data };
    }
};


export const createCaseStudy = async (token: string, values: any) => {
    const result = await fetch(`${BASE_URL}/api/case-study`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...values })
    });
    const { status, statusCode, message, data } = await result.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const deleteCaseStudy = async (token: string, values: string[]) => {
    const result = await fetch(`${BASE_URL}/api/case-study`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ caseStudyIds: values }),
    });
    const { status, statusCode, message, data } = await result.json();
    if (status !== httpStatus.SUCCESS && statusCode !== httpStatusCode.OK) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const getCaseStudys = async (token: string, url: string) => {
    const result = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        next: {
            tags: ["getCaseStudy"],
        },
    });
    const { status, statusCode, message, data } = await result.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    } else {
        return { message, data };
    }
};
