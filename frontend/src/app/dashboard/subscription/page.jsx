import React from 'react';
import {
    getPlanById,
    getUserSubscription,
} from '../../../externalAPI/subscriptionService';
import PayButton from '../../../components/dashboard/subscription/PayButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/authOptions';
import { IndianRupee } from 'lucide-react';

export default async function page({ searchParams }) {
    const session = await getServerSession(authOptions);
    const { plan } = searchParams;
    if (!plan) throw new Error('Page is broken.');
    const { data, error } = await getPlanById(plan);
    if (error) {
        return (
            <div className="flex justify-center text-center mx-auto my-5">
                <p className="text-destructive">{error}</p>
            </div>
        );
    }
    const token = session.user.AccessToken;
    const subscription = await getUserSubscription(token);
    return (
        <main className="p-4 sm:px-6 sm:py-0 md:gap-8">
            <h1 className="my-2 text-4xl font-semibold">
                Subscription for `{data.name}`
            </h1>
            <section className="my-5 md:my-10">
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border xl:p-8">
                    <h3 className="mb-4 text-2xl font-semibold">{data.name}</h3>
                    <p className="font-light text-gray-500 sm:text-lg">
                        Best option for personal use & for your next project.
                    </p>
                    <div className="flex justify-center items-baseline my-8">
                        <span className="mr-2 text-5xl font-extrabold flex items-center">
                            <IndianRupee /> {data.price}
                        </span>
                        <span className="text-gray-500">/month</span>
                    </div>
                    <ul role="list" className="mb-8 space-y-4 text-left">
                        <li className="flex items-center space-x-3">
                            <svg
                                className="flex-shrink-0 w-5 h-5 text-green-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span>
                                Duration:{' '}
                                <span className="font-semibold">
                                    {data.durationInDays} days
                                </span>
                            </span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <svg
                                className="flex-shrink-0 w-5 h-5 text-green-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span>
                                complaint Limit:{' '}
                                <span className="font-semibold">
                                    {data.complaintLimit}
                                </span>
                            </span>
                        </li>
                    </ul>
                    <PayButton plan={data} subscription={subscription.data} />
                </div>
            </section>
        </main>
    );
}
