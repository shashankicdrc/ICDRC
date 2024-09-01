
import { httpStatus, httpStatusCode } from "@/lib/commonEnum";
import { BASE_URL } from "@/lib/constant";

export const deleteTestimonial = async (token: string, value: string[]) => {
    const result = await fetch(`${BASE_URL}/api/testimonials`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ testimonialIds: value }),
    });
    const { status, statusCode, message, data } = await result.json();
    if (status !== httpStatus.SUCCESS && statusCode !== httpStatusCode.OK) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const updateTestimonial = async (token: string, value: any) => {
    const result = await fetch(`${BASE_URL}/api/testimonials`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value),
    });
    const { status, statusCode, message, data } = await result.json();
    if (status !== httpStatus.SUCCESS && statusCode !== httpStatusCode.OK) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const addTestimonial = async (token: string, value: any) => {
    const result = await fetch(`${BASE_URL}/api/testimonials`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value),
    });
    const { status, statusCode, message } = await result.json();
    if (status !== httpStatus.SUCCESS && statusCode !== httpStatusCode.OK) {
        return { error: message };
    } else {
        return { message };
    }
};

export const getTestimonial = async (url: string) => {
    const result = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            tags: ["getTestimonials"],
        },
    });
    const { status, statusCode, message, data } = await result.json();
    if (status !== httpStatus.SUCCESS && statusCode !== httpStatusCode.OK) {
        return { error: message };
    } else {
        return { message, data };
    }
};
