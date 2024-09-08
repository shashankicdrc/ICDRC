import AddSubscriptionForm from '@/components/subscriptions/AddSubscriptionForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { httpStatus, httpStatusCode } from '@/lib/commonEnum'
import { BASE_URL } from '@/lib/constant'
import React from 'react'

export default async function page() {
    const response = await fetch(`${BASE_URL}/api/plans`)
    const { data, message, statusCode, status } = await response.json();
    if (statusCode !== httpStatusCode.OK && status !== httpStatus.SUCCESS) {
        throw new Error(message)
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="md:min-w-[500px]">
                <CardHeader>
                    <CardTitle>Add Subscription</CardTitle>
                    <CardDescription>Add Subscription by choosing plan and user.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddSubscriptionForm plan={data} />
                </CardContent>
            </Card>
        </div>)
}

