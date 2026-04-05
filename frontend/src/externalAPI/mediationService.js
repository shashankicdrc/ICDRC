import { BASE_URL, httpStatus, httpStatusCode } from '../lib/constant';

export const addMediationCase = async (token, mediationData) => {
    const formData = new FormData();

    formData.append('fullName', mediationData.fullName);
    formData.append('email', mediationData.email);
    formData.append('opponentName', mediationData.opponentName);
    formData.append('description', mediationData.description);
    formData.append('category', mediationData.category);
    formData.append('amount', mediationData.amount);
    formData.append('timeline', mediationData.timeline);
    formData.append('jurisdiction', mediationData.jurisdiction);
    formData.append('language', mediationData.language);
    formData.append('resolution', mediationData.resolution);
    formData.append('isSubscribed', mediationData.isSubscribed);

    if (mediationData.subscriptionId) {
        formData.append('subscriptionId', mediationData.subscriptionId);
    }

    if (mediationData.files && mediationData.files.length > 0) {
        mediationData.files.forEach((file) => {
            formData.append('files', file);
        });
    }

    const result = await fetch(`${BASE_URL}/api/mediation/cases`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    const { message, statusCode, status, data } = await result.json();
    if (httpStatusCode.OK !== statusCode && httpStatus.SUCCESS !== status) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const getUserMediationCases = async (token) => {
    const result = await fetch(`${BASE_URL}/api/mediation/cases`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const { message, statusCode, status, data } = await result.json();
    if (httpStatusCode.OK !== statusCode && httpStatus.SUCCESS !== status) {
        return { error: message };
    } else {
        return { message, data };
    }
};

export const requestMediationSession = async (token, caseId, sessionData) => {
    try {
        const response = await fetch(`${BASE_URL}/api/cases/${caseId}/request-session`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(sessionData),
        });

        const data = await response.json();
        if (!response.ok) {
            return { error: data.message || 'Failed to request session' };
        }
        return { message: data.message, data: data.data };
    } catch (error) {
        return { error: error.message || 'Network error' };
    }
};
