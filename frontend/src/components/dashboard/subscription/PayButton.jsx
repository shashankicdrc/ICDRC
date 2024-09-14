'use client';
import { useSession } from 'next-auth/react';
import React, { Fragment, useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { initiateSubscription } from '../../../externalAPI/subscriptionService';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { IndianRupee, Loader2 } from 'lucide-react';
import {
    SubscriptionStatus,
    checkSubscriptionStatus,
} from '../../../lib/subscription';

export default function PayButton({ plan, subscription }) {
    const { data: session, status } = useSession();
    const [isLoading, setisLoading] = useState(false);
    const [subscriptionMessage, setsubscriptionMessage] = useState('');
    const [isSamePlan, setisSamePlan] = useState(false);

    useEffect(() => {
        if (!subscription) return;
        const planType = plan.name;
        const subscriptionStatus = checkSubscriptionStatus(
            subscription,
            planType,
        );
        switch (subscriptionStatus) {
            case SubscriptionStatus.EXPIRED:
                setsubscriptionMessage(
                    'Your subscription has expired. Please make payment to activate it.',
                );
                break;
            case SubscriptionStatus.VALID:
                setsubscriptionMessage(
                    'You have already  a subscription with same plan.',
                );
                const plans = subscription.plans
                    .map((item) => item.planId)
                    .some((item) => item._id === plan._id);
                setisSamePlan(plans);
                break;
            default:
                console.log('Unknown subscription status.');
        }
    }, [subscription]);

    const router = useRouter();

    if (status === 'loading') return <p>loading...</p>;
    const token = session.user.AccessToken;

    const initiatePayment = async () => {
        try {
            if (!token) return;
            setisLoading((prevState) => !prevState);
            const { error, data } = await initiateSubscription(token, plan._id);
            setisLoading((prevState) => !prevState);
            if (error) {
                toast.error(error);
                return;
            }
            router.push(data.instrumentResponse.redirectInfo.url);
        } catch (error) {
            setisLoading(false);
            toast.error(error.message);
        }
    };

    return (
        <Fragment>
            {!isSamePlan && (
                <p className="py-2 text-sm text-muted-foreground">
                    {subscriptionMessage}
                </p>
            )}
            {isSamePlan && (
                <p className="py-2 text-sm text-muted-foreground">
                    You have already subscribed for this plan.
                </p>
            )}
            <Button
                disabled={isLoading || isSamePlan}
                onClick={initiatePayment}
            >
                {isLoading ? (
                    <Fragment>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait...
                    </Fragment>
                ) : (
                    <Fragment>
                        Pay{' '}
                        <p className="ml-2 font-extrabold flex items-center">
                            <IndianRupee className="h-4 w-4" />{' '}
                            <span className="text-xl">{plan.price}</span>
                        </p>
                    </Fragment>
                )}
            </Button>
        </Fragment>
    );
}
