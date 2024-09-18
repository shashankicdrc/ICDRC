'use client';
import { getUserSubscription } from '@/externalAPI/subscriptionService';
import {
    checkSubscriptionStatus,
    SubscriptionStatus,
} from '@/lib/subscription';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

export default function CheckSubscriptionActive({ type }) {
    const [isIndSubscriptionActive, setisIndSubscriptionActive] =
        useState(false);
    const [isOrgSubscriptionActive, setisOrgSubscriptionActive] =
        useState(false);
    const [subscriptionData, setsubscriptionData] = useState({});

    const { data: session, status } = useSession();
    const token = session?.user.AccessToken;

    useEffect(() => {
        const getSubscription = async () => {
            const { data } = await getUserSubscription(token);
            setsubscriptionData(data);
            const subscriptionStatus = checkSubscriptionStatus(data, type);
            if (subscriptionStatus === SubscriptionStatus.VALID) {
                if (type === 'Individual') {
                    setisIndSubscriptionActive(true);
                } else if (type === 'Organisational') {
                    setisOrgSubscriptionActive(true);
                }
            }
        };
        if (status === 'authenticated') {
            getSubscription();
        }
    }, [type, token, status]);

    if (status === 'loading') {
        return <p>loading...</p>;
    }

    return type == 'Individual' ? (
        <p>
            <span className="capitalize font-bold">
                Individual subscription:
            </span>{' '}
            {isIndSubscriptionActive ? (
                <span className="uppercase text-green-700">active</span>
            ) : (
                <span className="uppercase text-red-600">INACTIVE</span>
            )}
        </p>
    ) : (
        <p>
            |
            <span className="capitalize font-bold ml-1">
                Organizational subscription:{' '}
            </span>
            {isOrgSubscriptionActive ? (
                <span className="uppercase text-green-700">active</span>
            ) : (
                <span className="uppercase text-red-600">INACTIVE</span>
            )}
        </p>
    );
}
