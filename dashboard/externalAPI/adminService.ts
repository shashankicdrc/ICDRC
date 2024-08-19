import { httpStatus, httpStatusCode } from "@/lib/commonEnum";
import { BASE_URL } from "@/lib/constant";

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
