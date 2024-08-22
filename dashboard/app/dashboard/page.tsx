import { ComplaintChart } from '@/components/Charts/ComplaintChat'
import { getCompalintChartData } from '@/externalAPI/analyticsService'
import { authOptions } from '@/lib/authOptions'
import { BASE_URL } from '@/lib/constant'
import { getServerSession } from 'next-auth'
import React from 'react'

interface Props {
    searchParams: {
        complaintDate: string
    }
}

export default async function page({ searchParams }: Props) {
    const sesssion = await getServerSession(authOptions)
    const token = sesssion?.user.AccessToken as string;
    let { complaintDate } = searchParams;
    if (!complaintDate) {
        complaintDate = '30'
    }
    const chartDataUrl = `${BASE_URL}/api/analytics/complaints?days=${complaintDate}`
    const { data, message } = await getCompalintChartData(token, chartDataUrl)
    return (
        <main className="p-4 sm:px-6 py-5 md:gap-8">
            <ComplaintChart chartData={data} />
        </main>
    )
}

