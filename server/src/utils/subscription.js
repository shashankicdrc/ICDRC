export const SubscriptionStatus = {
    EXPIRED: 'EXPIRED',
    NOT_ACTIVE: 'NOT_ACTIVE',
    LIMIT_EXCEEDED: 'LIMIT_EXCEEDED',
    VALID: 'VALID',
    DOES_NOT_EXIST: 'DOES_NOT_EXIST',
};

export function checkSubscriptionStatus(subscription) {
    if (!subscription) {
        return SubscriptionStatus.DOES_NOT_EXIST;
    }

    const now = new Date();

    if (now > new Date(subscription.endDate)) {
        return SubscriptionStatus.EXPIRED;
    }

    if (subscription.usedComplaints >= subscription.complaintLimit) {
        return SubscriptionStatus.LIMIT_EXCEEDED;
    }

    if (subscription.isDeleted) {
        return SubscriptionStatus.NOT_ACTIVE;
    }

    return SubscriptionStatus.VALID;
}
