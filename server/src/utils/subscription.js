export const SubscriptionStatus = {
    EXPIRED: 'EXPIRED',
    NOT_ACTIVE: 'NOT_ACTIVE',
    LIMIT_EXCEEDED: 'LIMIT_EXCEEDED',
    VALID: 'VALID',
    DOES_NOT_EXIST: 'DOES_NOT_EXIST',
};

export function checkSubscriptionStatus(subscription, planId) {
    if (!subscription) {
        return SubscriptionStatus.DOES_NOT_EXIST;
    }

    if (subscription.plans.length === 0) {
        return SubscriptionStatus.DOES_NOT_EXIST;
    }

    const now = new Date();

    // Find the specific plan by planId
    const plan = subscription.plans.find(
        (p) => p.planId.toString() === planId.toString(),
    );

    // If the plan doesn't exist, return DOES_NOT_EXIST
    if (!plan) {
        return SubscriptionStatus.DOES_NOT_EXIST;
    }

    // Check the status of the specific plan
    if (now > new Date(plan.endDate)) {
        return SubscriptionStatus.EXPIRED;
    }

    if (plan.usedComplaints >= plan.complaintLimit) {
        return SubscriptionStatus.LIMIT_EXCEEDED;
    }

    if (plan.isDeleted) {
        return SubscriptionStatus.NOT_ACTIVE;
    }

    return SubscriptionStatus.VALID;
}
