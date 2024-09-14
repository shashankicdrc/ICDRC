import planModel from '#models/planModel';
import subscriptionModel from '#models/subscriptionModel';

class SubscriptionService {
    async updateSubscription(id, data) {
        const { planId, ...restData } = data; // Extract planId from the data

        const updatedSubscription = await subscriptionModel.findOneAndUpdate(
            {
                _id: id,
                'plans.planId': planId, // Check if planId exists in plans array
            },
            {
                $set: { 'plans.$': { planId, ...restData } }, // Update the existing plan
            },
            {
                new: true,
                upsert: false, // Prevents creating a new document if no match is found
            },
        );

        // If planId does not exist, push the new plan
        if (!updatedSubscription) {
            return await subscriptionModel.findByIdAndUpdate(
                id,
                {
                    $push: { plans: { planId, ...restData } }, // Push new plan
                },
                { new: true },
            );
        }

        return updatedSubscription; // Return the updated subscription
    }
    checkSamePlan(subscription, planId) {
        const isSamePlan = subscription.plans.some(
            (plan) => plan.planId.toString() === planId.toString(),
        );
        return isSamePlan;
    }

    async getSubscriptionById(id) {
        return await subscriptionModel.findById(id);
    }

    async getUserSubscription(userId) {
        const subscription = await subscriptionModel
            .findOne({ userId })
            .populate('plans.planId')
            .exec();
        return subscription;
    }

    async createSubscription(planId, userId) {
        const plan = await planModel.findById(planId);
        const addSubscription = await subscriptionModel.create({
            userId,
            plans: {
                planId,
                complaintLimit: plan.complaintLimit,
                endDate: new Date(
                    Date.now() + plan.durationInDays * 24 * 60 * 60 * 1000,
                ),
            },
        });
        return addSubscription;
    }
}

export default SubscriptionService;
