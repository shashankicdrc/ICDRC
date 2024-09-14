export const SubscriptionStatus = {
    EXPIRED: 'EXPIRED',
    LIMIT_EXCEEDED: 'LIMIT_EXCEEDED',
    NOT_ACTIVE: 'NOT_ACTIVE',
    VALID: 'VALID',
    DOES_NOT_EXIST: 'DOES_NOT_EXIST',
};

export function checkSubscriptionStatus(subscription, planType) {
    if (
        !subscription ||
        !subscription.plans ||
        subscription.plans.length === 0 ||
        !planType
    ) {
        return SubscriptionStatus.DOES_NOT_EXIST;
    }

    const now = new Date();

    // Find the specific plan by planId
    const plan = subscription.plans.find(
        (p) => p.planId.name.toString() === planType,
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

    if (subscription.isDeleted) {
        return SubscriptionStatus.NOT_ACTIVE;
    }

    return SubscriptionStatus.VALID;
}
