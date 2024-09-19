import { getServerSession } from 'next-auth';
import React, { Fragment } from 'react';
import { authOptions } from '../../lib/authOptions';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ArrowUpRight, PackageSearch, UserSearch } from 'lucide-react';
import Link from 'next/link';
import { handleResponses } from '../../externalAPI/userService';
import SubscriptionChart from '@/components/dashboard/SubscriptionChart';
import RecentMessages from '@/components/dashboard/chat/RecentMessage';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import { getRecentChats } from '@/externalAPI/chatService';
import CheckSubscription from '@/components/dashboard/CheckSubscription';

export default async function page() {
    const session = await getServerSession(authOptions);
    const token = session.user.AccessToken;
    const [response, chats] = await Promise.all([
        handleResponses(token),
        getRecentChats(token),
    ]);

    return (
        <Fragment>
            <CheckSubscription />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <Card className="sm:col-span-2">
                        <CardHeader className="pb-3">
                            <CardTitle>Welcome, {session.user.name}!</CardTitle>
                            <CardDescription className="">
                                We’re glad to have you back. Here's a quick
                                overview of your latest activities and updates.
                                Let’s continue building great things together!
                                If you need assistance, feel free to reach out
                                to us.{' '}
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card x-chunk="dashboard-01-chunk-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold">
                                Total Individual Cases
                            </CardTitle>
                            <UserSearch className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="text-2xl font-bold">
                                {response.errors.individualComplaintError ??
                                    response.individualComplaints}
                            </div>
                            {response.individualComplaints ? (
                                <Button
                                    asChild
                                    size="sm"
                                    className="ml-auto gap-1"
                                >
                                    <Link href="/dashboard/complaints/individual">
                                        View All
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            ) : null}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold">
                                Total Organizational Cases
                            </CardTitle>
                            <PackageSearch className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="text-2xl font-bold">
                                {response.errors.organizationComplaintError ??
                                    response.organizationComplaints}
                            </div>
                            {response.organizationComplaints ? (
                                <Button
                                    asChild
                                    size="sm"
                                    className="ml-auto gap-1"
                                >
                                    <Link href="/dashboard/complaints/organisational">
                                        View All
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            ) : null}
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-rows-2 gap-5">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <SubscriptionChart type="Individual" />
                        <RecentTransactions response={response} />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <SubscriptionChart type="organisational" />
                        <RecentMessages chats={chats} />
                    </div>
                </div>
            </main>
        </Fragment>
    );
}
