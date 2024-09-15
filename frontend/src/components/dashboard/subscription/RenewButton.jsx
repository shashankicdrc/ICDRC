'use client';
import { useSession } from 'next-auth/react';
import React, { Fragment, useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { initiateRenewSubscription } from '../../../externalAPI/subscriptionService';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { IndianRupee, Loader2 } from 'lucide-react';
import {
    SubscriptionStatus,
    checkSubscriptionStatus,
} from '../../../lib/subscription';
import { formatDate } from '@/lib/formateDate';

export default function RenewButton({ plan, subscription }) {
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
                const userPlan = subscription.plans
                    .map((plan) => plan)
                    .filter((item) => item.planId._id === plan._id);
                setsubscriptionMessage(
                    `Your subscription will be expired on ${formatDate(userPlan[0].endDate)}. Renew it now.`,
                );
                setisSamePlan(userPlan.length ? true : false);
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
            const { error, data } = await initiateRenewSubscription(
                token,
                plan._id,
            );
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
            {subscriptionMessage && (
                <p className="py-2 text-sm text-muted-foreground">
                    {subscriptionMessage}
                </p>
            )}
            <Button
                disabled={isLoading || !isSamePlan}
                onClick={initiatePayment}
            >
                {isLoading ? (
                    <Fragment>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait...
                    </Fragment>
                ) : (
                    <Fragment>
                        Renew Now{' '}
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
