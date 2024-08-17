import planModel from '#models/planModel';
import subscriptionModel from '#models/subscriptionModel';

class SubscriptionService {
    async getSubscriptionById(id) {
        return await subscriptionModel.findById(id);
    }

    async getUserSubscription(userId) {
        const subscription = await subscriptionModel.findOne({ userId }).exec();
        return subscription;
    }

    async createSubscription(planId, userId) {
        const plan = await planModel.findById(planId);
        const addSubscription = await subscriptionModel.create({
            userId,
            planId,
            complaintLimit: plan.complaintLimit,
            endDate: new Date(
                Date.now() + plan.durationInDays * 24 * 60 * 60 * 1000,
            ),
        });
        return addSubscription;
    }
}

export default SubscriptionService;
