import subscriptionModel from '#models/subscriptionModel';
import { queues } from '#queues/queue';
import { FRONTEND_URL, NOREPLYEMAIL, htmlTemplate } from '#utils/constant';
import logger from '#utils/logger';

export const checkSubscriptions = async () => {
    const templateLink = '/src/templates/subscription/RenewSubscription.html';

    const currentDate = new Date();

    let subscriptions;
    try {
        subscriptions = await subscriptionModel
            .find({
                'plans.endDate': { $gte: currentDate },
            })
            .populate('userId', 'email name')
            .populate('plans.planId');
    } catch (dbError) {
        logger.error(`[checkSubscriptions] Failed to query subscriptions: ${dbError.message}`);
        return;
    }

    for (const subscription of subscriptions) {
        try {
            // Skip orphaned subscriptions where the user no longer exists
            if (!subscription.userId) {
                logger.warn(
                    `[checkSubscriptions] Skipping subscription ${subscription._id} — userId is null (user may have been deleted)`,
                );
                continue;
            }

            for (const plan of subscription.plans) {
                try {
                    // Skip plans where the plan document no longer exists
                    if (!plan.planId) {
                        logger.warn(
                            `[checkSubscriptions] Skipping plan in subscription ${subscription._id} — planId is null (plan may have been deleted)`,
                        );
                        continue;
                    }

                    const endDate = new Date(plan.endDate);
                    const daysLeft = Math.floor(
                        (endDate - currentDate) / (1000 * 60 * 60 * 24),
                    );

                    const emailData = {
                        name: subscription.userId.name,
                        planName: plan.planId.name,
                        endDate: endDate.toLocaleString(),
                        daysLeft,
                        subscriptionId: subscription._id.toString(),
                        renewLink: `${FRONTEND_URL}/dashboard/subscription/renew?plan=${plan.planId._id.toString()}`,
                    };

                    const shouldSendEmail =
                        daysLeft === 15 ||
                        daysLeft === 10 ||
                        (daysLeft <= 7 && daysLeft > 0);

                    if (shouldSendEmail) {
                        const html = htmlTemplate(
                            process.cwd() + templateLink,
                            emailData,
                        );
                        const NewMessage = {
                            from: NOREPLYEMAIL,
                            to: [subscription.userId.email],
                            subject: 'Subscription plan expiration',
                            html,
                        };
                        await queues.EmailQueue.add('send-email', NewMessage);
                    }
                } catch (planError) {
                    logger.error(
                        `[checkSubscriptions] Error processing plan in subscription ${subscription._id}: ${planError.message}`,
                    );
                    // Continue to next plan
                }
            }
        } catch (subError) {
            logger.error(
                `[checkSubscriptions] Error processing subscription ${subscription._id}: ${subError.message}`,
            );
            // Continue to next subscription
        }
    }

    logger.info(`[checkSubscriptions] Finished checking ${subscriptions.length} subscriptions.`);
};
