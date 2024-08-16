'use client';
import { useSession } from 'next-auth/react';
import React, { Fragment, useState } from 'react';
import { Button } from '../../ui/button';
import { initiateSubscription } from '../../../externalAPI/subscriptionService';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function PayButton({ plan }) {
    const { data: session, status } = useSession();
    const [isLoading, setisLoading] = useState(false);
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
            console.log(data);
            router.push(data.instrumentResponse.redirectInfo.url);
        } catch (error) {
            setisLoading(false);
            toast.error(error.message);
        }
    };

    return (
        <Fragment>
            <Button disable={isLoading} onClick={initiatePayment}>
                {isLoading ? (
                    <Fragment>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait...
                    </Fragment>
                ) : (
                    <Fragment>
                        Pay{' '}
                        <span className="ml-2 font-extrabold">
                            ${plan.price}
                        </span>
                    </Fragment>
                )}
            </Button>
        </Fragment>
    );
}
