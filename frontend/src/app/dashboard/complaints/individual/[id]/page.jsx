import { Button } from '../../.././../../components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../.././../../components/ui/card';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import { authOptions } from '../../.././../../lib/authOptions';
import { formatDate } from '../../.././../../lib/formateDate';
import { ArrowLeft } from 'lucide-react';
import { getIndividualComplaintById } from '../../../../../externalAPI/complaintService';

export default async function page({ params }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error('You are unauthorized');
    }
    const token = session.user.AccessToken;
    const { error, data } = await getIndividualComplaintById(token, params.id);
    if (error) {
        return (
            <div className="mx-auto md:w-[70%] my-5 md:my-10">
                <h1 className="text-4xl font-medium text-center">{error}</h1>
            </div>
        );
    }
    console.log(JSON.stringify(data));
    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-5 md:gap-8">
            <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        asChild
                    >
                        <Link href={'/dashboard/complaints/individual'}>
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Link>
                    </Button>
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-2xl font-semibold tracking-tight sm:grow-0">
                        Complaints Details
                    </h1>
                </div>
                <section className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>{data.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2">
                                    <div className="flex items-center space-x-2">
                                        <span>Email:</span>
                                        <p>{data.email}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span>Mobile:</span>
                                        <CardDescription>
                                            {data.mobile}
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span>Case Id:</span>
                                        <CardDescription>
                                            {data.caseId}
                                        </CardDescription>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <span>Case Status:</span>
                                        <CardDescription>
                                            {data.status}
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span>Created At:</span>
                                        <CardDescription>
                                            {formatDate(data.createdAt)}{' '}
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span>Last Update:</span>
                                        <CardDescription>
                                            {formatDate(data.updatedAt)}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Policy Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center space-x-2">
                                    <span>Policy Type:</span>
                                    <CardDescription>
                                        {data.policyType}
                                    </CardDescription>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span>Policy Company:</span>
                                    <CardDescription>
                                        {data.policyCompany}
                                    </CardDescription>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span>Problem:</span>
                                    <CardDescription>
                                        {data.problem}
                                    </CardDescription>
                                </div>
                                {data.otherProblem}
                                <div className="flex  space-x-2">
                                    <p className="whitespace-nowrap">
                                        Problem Details:
                                    </p>
                                    <CardDescription>
                                        {data.problemDetails}
                                    </CardDescription>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <Card className="overflow-hidden">
                            <CardHeader>
                                <CardTitle>Location Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <span>State:</span>
                                    <CardDescription>
                                        {data.state}{' '}
                                    </CardDescription>
                                </div>
                                <div className="flex  items-center space-x-2">
                                    <span>City:</span>
                                    <CardDescription>
                                        {data.city}
                                    </CardDescription>
                                </div>

                                <div className="flex  items-center space-x-2">
                                    <span>Address:</span>
                                    <CardDescription>
                                        {data.address}
                                    </CardDescription>
                                </div>
                            </CardContent>
                        </Card>

                        <Card x-chunk="dashboard-07-chunk-3">
                            <CardHeader>
                                <CardTitle>Payment</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <span>Payment Status:</span>
                                    <CardDescription>
                                        {data.paymentStatus}
                                    </CardDescription>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
        </main>
    );
}
