import subscriptionModel from '#models/subscriptionModel';
import { queues } from '#queues/queue';
import { FRONTEND_URL, NOREPLYEMAIL, htmlTemplate } from '#utils/constant';

export const checkSubscriptions = async () => {
    const templateLink = '/src/templates/subscription/RenewSubscription.html';
    let emailData;

    const currentDate = new Date();
    const subscriptions = await subscriptionModel
        .find({
            'plans.endDate': { $gte: currentDate }, // Find subscriptions that haven't ended yet
        })
        .populate('userId', 'email name')
        .populate('plans.planId');

    subscriptions.forEach((subscription) => {
        subscription.plans.forEach((plan) => {
            const endDate = new Date(plan.endDate);
            const daysLeft = Math.floor(
                (endDate - currentDate) / (1000 * 60 * 60 * 24),
            );

            emailData = {
                name: subscription.userId.name,
                planName: plan.planId.name,
                endDate: endDate.toLocaleString(),
                daysLeft,
                subscriptionId: subscription._id.toString(),
                renewLink: `${FRONTEND_URL}/dashboard/subscription/renew?plan=${plan.planId._id.toString()}`,
            };

            if (daysLeft === 15) {
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

                queues.EmailQueue.add('send-email', NewMessage);
            }

            // 10 days before endDate
            if (daysLeft === 10) {
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
                queues.EmailQueue.add('send-email', NewMessage);
            }

            // From 7 days before endDate, send emails daily
            if (daysLeft <= 7 && daysLeft > 0) {
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
                queues.EmailQueue.add('send-email', NewMessage);
            }
        });
    });
};
