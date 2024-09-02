import ComplaintChart from '@/components/Charts/ComplaintChart'
import { RevenueChart } from '@/components/Charts/RevenueChart'
import RecentAdmins from '@/components/dashboard/RecentAdmins'
import RecentIndComplaint from '@/components/dashboard/RecentIndComplaint'
import RecentMessages from '@/components/dashboard/RecentMessage'
import RecentOrgComplaint from '@/components/dashboard/RecentOrgComplaints'
import RecentTransactions from '@/components/dashboard/RecentTransactions'
import SubscriptionChart from '@/components/dashboard/SubscriptionChart'
import { getRevenueData } from '@/externalAPI/analyticsService'
import { authOptions } from '@/lib/authOptions'
import { BASE_URL } from '@/lib/constant'
import { getServerSession } from 'next-auth'
import React from 'react'

interface Props {
    searchParams: {
        revenueDays: string
    }
}

export default async function page({ searchParams }: Props) {
    const sesssion = await getServerSession(authOptions)
    const token = sesssion?.user.AccessToken as string;
    let { revenueDays } = searchParams;
    if (!revenueDays) {
        revenueDays = '10'
    }
    const revenueDataUrl = `${BASE_URL}/api/analytics/revenue?days=${revenueDays}`
    const { data } = await getRevenueData(token, revenueDataUrl)
    return (
        <main className="p-4 sm:px-6 py-5 md:gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <RevenueChart chartData={data} />
                <SubscriptionChart />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 my-5'>
                <ComplaintChart />
                <RecentTransactions />
            </div>
            <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <RecentIndComplaint />
                <RecentOrgComplaint />
            </section>
            <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <RecentAdmins />
                <RecentMessages />
            </section>
        </main>
    )
}

