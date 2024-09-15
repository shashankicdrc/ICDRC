import { BASE_URL, httpStatusCode } from '../lib/constant';

export const getRecentChats = async (token) => {
    const response = await fetch(`${BASE_URL}/api/chats`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const { data, message } = await response.json();
    if (response.status !== httpStatusCode.OK) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const addMessage = async (values) => {
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

export const getChats = async (complaintId) => {
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
