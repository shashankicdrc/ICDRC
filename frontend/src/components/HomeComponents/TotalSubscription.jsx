'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { BASE_URL, httpStatus, httpStatusCode } from '@/lib/constant';
import toast from 'react-hot-toast';
import { GiftIcon } from 'lucide-react';
import Image from 'next/image';

export default function TotalSubscription() {
    const [totalSubscriptions, settotalSubscriptions] = useState(0);
    useEffect(() => {
        const getTotalSubscription = async () => {
            const response = await fetch(
                `${BASE_URL}/api/analytics/subscription/total`,
            );
            const { data, statusCode, status, message } = await response.json();
            if (
                httpStatusCode.OK !== statusCode &&
                httpStatus.SUCCESS !== status
            ) {
                return toast.error(message);
            }
            settotalSubscriptions(data);
        };
        getTotalSubscription();
    }, []);
    return (
        <div className="container max-w-screen-sm mx-auto my-5 md:my-10">
            <Card className="hover:border-primary shadow-md mx-5">
                <CardContent className="mt-2 min-h-40 flex flex-col justify-center items-center">
                    <div className="flex flex-col md:flex-row items-center mt-2 space-x-6">
                        <Image
                            src={
                                'https://res.cloudinary.com/dztkzhtla/image/upload/v1707654792/WebDesys-Main%20Website/nrebamxchh9zf1vcs2xz.webp'
                            }
                            width={100}
                            height={100}
                            alt="Logo"
                        />{' '}
                        <h2 className="font-semibold text-4xl capitalize text-center">
                            {totalSubscriptions}
                        </h2>
                        <h3 className="text-4xl font-bold capitalize text-center">
                            Subscribed Users
                        </h3>
                    </div>
                </CardContent>
            </Card>{' '}
        </div>
    );
}
