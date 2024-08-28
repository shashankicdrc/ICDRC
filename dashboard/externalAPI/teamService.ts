import { httpStatus, httpStatusCode } from "@/lib/commonEnum";
import { BASE_URL } from "@/lib/constant";

export const getTeamById = async (id: string) => {
    const response = await fetch(`${BASE_URL}/api/teams/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const { status, statusCode, message, data } = await response.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    }
    return { message, data };
};


export const deleteTeams = async (token: string, values: string[]) => {
    const response = await fetch(`${BASE_URL}/api/teams`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ teamIds: values })
    });
    const { status, statusCode, message, data } = await response.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    }
    return { message };
};


export const updateTeams = async (token: string, values: any) => {
    const response = await fetch(`${BASE_URL}/api/teams`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(values)
    });
    const { status, statusCode, message, data } = await response.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    }
    return { message };
};


export const addTeams = async (token: string, values: any) => {
    const response = await fetch(`${BASE_URL}/api/teams`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(values)
    });
    const { status, statusCode, message, data } = await response.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    }
    return { message };
};

export const getTeams = async (token: string) => {
    const response = await fetch(`${BASE_URL}/api/teams`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        next: {
            tags: ["getTeams"],
        },
    });
    const { status, statusCode, message, data } = await response.json();
    if (httpStatus.SUCCESS !== status && httpStatusCode.OK !== statusCode) {
        return { error: message };
    }
    return { message, data };
};
