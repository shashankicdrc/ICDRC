import { changePasswordInput } from "@/components/form/settings/ChangePasswordForm";
import { httpStatus, httpStatusCode } from "@/lib/commonEnum";
import { BASE_URL } from "@/lib/constant";

export const getRecentAdmins = async (token: string) => {
    const result = await fetch(`${BASE_URL}/api/admins/recent/list`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const { status, statusCode, message, data } = await result.json();
    if (status !== httpStatus.SUCCESS && statusCode !== httpStatusCode.OK) {
        return { error: message };
    } else {
        return { message, data };
    }
};


export const deleteAdmins = async (token: string, value: string[]) => {
    const result = await fetch(`${BASE_URL}/api/admins`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ adminIds: value }),
    });
    const { status, statusCode, message, data } = await result.json();
    if (status !== httpStatus.SUCCESS && statusCode !== httpStatusCode.OK) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const getAdminById = async (token: string, id: any) => {
    const result = await fetch(`${BASE_URL}/api/admins/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const { status, statusCode, message, data } = await result.json();
    if (status !== httpStatus.SUCCESS && statusCode !== httpStatusCode.OK) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const changePassword = async (
    token: string,
    value: changePasswordInput,
) => {
    const result = await fetch(`${BASE_URL}/api/admin/auth/change/password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...value }),
    });
    const { message, statusCode, status } = await result.json();
    if (statusCode !== 200 && status !== "success") {
        return { error: message };
    } else {
        return { message };
    }
};

export const updateProfile = async (token: string, value: any) => {
    const result = await fetch(`${BASE_URL}/api/admins`, {
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

export const changeRole = async (token: string, value: any) => {
    const result = await fetch(`${BASE_URL}/api/admins/role`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value),
        next: {
            tags: ["changeRole"],
        },
    });
    const { status, statusCode, message, data } = await result.json();
    if (status !== httpStatus.SUCCESS && statusCode !== httpStatusCode.OK) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const createAdmin = async (token: string, values: any) => {
    const result = await fetch(`${BASE_URL}/api/admin/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...values }),
    });
    const { status, statusCode, message, data } = await result.json();
    if (status !== httpStatus.SUCCESS && statusCode !== httpStatusCode.OK) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const getAdmins = async (token: string) => {
    const result = await fetch(`${BASE_URL}/api/admins`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        next: {
            tags: ["getAdmins"],
        },
    });
    const { status, statusCode, message, data } = await result.json();
    if (status !== httpStatus.SUCCESS && statusCode !== httpStatusCode.OK) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const adminLogin = async (credential: any) => {
    const result = await fetch(`${BASE_URL}/api/admin/auth/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
    });
    const { status, statusCode, message, data } = await result.json();
    if (status !== httpStatus.SUCCESS && statusCode !== httpStatusCode.OK) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const adminTokenRotation = async (
    accessToken: string,
    refreshtoken: string,
) => {
    try {
        const tokenResponse = await fetch(
            `${BASE_URL}/api/admin/auth/token/rotation?refreshtoken=${refreshtoken}`,
            {
                method: "GET",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const { AccessToken, Refreshtoken, error } = await tokenResponse.json();
        if (tokenResponse.status !== 200) {
            return Promise.reject(new Error(error));
        }
        return { AccessToken, Refreshtoken };
    } catch (error: any) {
        return {
            AccessToken: accessToken,
            Refreshtoken: refreshtoken,
            error: "RefreshAccessTokenError",
        };
    }
};
