import React from 'react';
import {
    getPlanById,
    getUserSubscription,
} from '../../../externalAPI/subscriptionService';
import PayButton from '../../../components/dashboard/subscription/PayButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/authOptions';
import {
    IndividualFeature,
    OrganizationalFeature,
} from '@/components/HomeComponents/PlanFeatures';

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
            <section className="my-5 md:my-10">
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border xl:p-8">
                    <h3 className="text-2xl capitalize font-semibold">
                        For an{' '}
                        {data.name === 'Individual'
                            ? 'Individual'
                            : 'Organization'}
                    </h3>
                    <div className="flex justify-center items-baseline my-8">
                        <span className="mr-2 text-5xl font-extrabold flex items-center">
                            ₹{data.price}
                        </span>
                    </div>
                    {data.name === 'Individual' ? (
                        <IndividualFeature />
                    ) : (
                        <OrganizationalFeature />
                    )}
                    <PayButton plan={data} subscription={subscription.data} />
                </div>
            </section>
        </main>
    );
}
