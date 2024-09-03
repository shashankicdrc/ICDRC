import { httpStatusCode } from "@/lib/commonEnum";
import { BASE_URL } from "@/lib/constant";

export const getAllChats = async (token: string) => {
    const response = await fetch(`${BASE_URL}/api/admin/chats`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        cache: "no-cache",
    });
    const { data, message } = await response.json();
    if (response.status !== httpStatusCode.OK) {
        return { error: message };
    } else {
        return { message, data };
    }
};


export const getRecentMessage = async (token: string) => {
    const response = await fetch(`${BASE_URL}/api/admin/chats/recent`, {
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


export const addMessage = async (values: any) => {
    const response = await fetch(`${BASE_URL}/api/chats`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values }),
    });
    const { data, message } = await response.json();
    if (response.status !== httpStatusCode.OK) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const getChats = async (complaintId: string) => {
    const response = await fetch(`${BASE_URL}/api/chats/${complaintId}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });
    const { data, message } = await response.json();
    if (response.status !== httpStatusCode.OK) {
        return { error: message };
    } else {
        return { message, data };
    }
};
