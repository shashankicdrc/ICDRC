import { httpStatus, httpStatusCode } from "@/lib/commonEnum";
import { BASE_URL } from "@/lib/constant";
import { MediationCasesResponse, MediationCase } from "@/types/mediation";

/**
 * Fetches all mediation cases for the admin view.
 *
 * @param token Admin access token
 * @param page Page number
 * @param perRow Number of cases per row/page
 * @param paymentStatus Filter by payment status (optional)
 * @returns An object containing the fetched data or an error message
 */
export const getMediationCases = async (
    token: string,
    page = 1,
    perRow = 20,
    paymentStatus?: string
): Promise<{ data?: MediationCasesResponse; error?: string }> => {
    let url = `${BASE_URL}/api/admin/mediation/cases?page=${page}&perRow=${perRow}`;
    if (paymentStatus) {
        url += `&paymentStatus=${paymentStatus}`;
    }

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            next: {
                tags: ["getMediationCases"],
            },
        });

        const { status, statusCode, message, data } = await response.json();

        if (status !== httpStatus.SUCCESS && statusCode !== httpStatusCode.OK) {
            return { error: message || "Failed to fetch mediation cases." };
        }

        return { data };
    } catch (error: any) {
        return { error: error.message || "An unexpected error occurred." };
    }
};

/**
 * Fetches a single mediation case by its ID.
 *
 * @param token Admin access token
 * @param id The ID of the mediation case
 * @returns An object containing the mediation case details or an error message
 */
export const getMediationCaseById = async (
    token: string,
    id: string
): Promise<{ data?: MediationCase; error?: string }> => {
    const url = `${BASE_URL}/api/admin/mediation/cases/${id}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const { status, statusCode, message, data } = await response.json();

        if (status !== httpStatus.SUCCESS && statusCode !== httpStatusCode.OK) {
            return { error: message || "Failed to fetch mediation case details." };
        }

        return { data };
    } catch (error: any) {
        return { error: error.message || "An unexpected error occurred." };
    }
};


export const acceptMediationCase = async (
    token: string,
    caseId: string
): Promise<{ success?: boolean; error?: string }> => {
    try {
        const response = await fetch(
            `${BASE_URL}/api/cases/${caseId}/caseAccept`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            return { error: data.message || "Failed to accept case" };
        }

        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
};

/**
 * Submits a session request from the user/client side.
 * Calls PUT /api/cases/:caseId/request-session with session details.
 *
 * @param token User/client access token
 * @param caseId The ID of the mediation case
 * @param sessionDetails Session mode, date, start time, and end time
 * @returns An object containing success status or an error message
 */
export const requestMediationSession = async (
    token: string,
    caseId: string,
    sessionDetails: {
        sessionMode: string;
        sessionDate: string;
        sessionStartTime: string;
        sessionEndTime: string;
    }
): Promise<{ success?: boolean; error?: string; data?: any }> => {
    try {
        const response = await fetch(
            `${BASE_URL}/api/cases/${caseId}/request-session`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(sessionDetails),
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            return { error: data.message || "Failed to submit session request" };
        }

        return { success: true, data: data.data };
    } catch (error: any) {
        return { error: error.message };
    }
};

/**
 * Admin accepts the session request and assigns a mediator.
 * Triggers Google Meet link generation (if Online) and sends email.
 * Calls POST /api/cases/:caseId/assign-mediator.
 *
 * @param token Admin access token
 * @param caseId The ID of the mediation case
 * @returns An object containing success status or an error message
 */
export const acceptMediationSession = async (
    token: string,
    caseId: string
): Promise<{ success?: boolean; error?: string }> => {
    try {
        const response = await fetch(
            `${BASE_URL}/api/cases/${caseId}/assign-mediator`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            return { error: data.message || "Failed to accept session" };
        }

        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
};

/**
 * Admin closes a mediation case.
 * Calls PUT /api/cases/:caseId/close.
 *
 * @param token Admin access token
 * @param caseId The ID of the mediation case
 * @returns An object containing success status or an error message
 */
export const closeMediationCase = async (
    token: string,
    caseId: string
): Promise<{ success?: boolean; error?: string }> => {
    try {
        const response = await fetch(
            `${BASE_URL}/api/cases/${caseId}/close`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            return { error: data.message || "Failed to close case" };
        }

        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
};