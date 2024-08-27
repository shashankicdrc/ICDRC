import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../../lib/authOptions';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '../../components/ui/card';
import {
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
} from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import greet from '../../lib/greet';
import { Button } from '../../components/ui/button';
import { ArrowUpRight, IndianRupee } from 'lucide-react';
import { GoProjectRoadmap } from 'react-icons/go';
import Link from 'next/link';
import { ShieldQuestion } from 'lucide-react';
import { handleResponses } from '../../externalAPI/userService';
import { formatDate } from '../../lib/formateDate';

export default async function page() {
    const session = await getServerSession(authOptions);
    const token = session.user.AccessToken;
    const greeting = greet(session.user.name);

    const response = await handleResponses(token);

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card className="sm:col-span-2">
                    <CardHeader className="pb-3">
                        <CardTitle>{greeting}</CardTitle>
                        <CardDescription className="">
                            Introducing Our Dynamic Dashboard for managing and
                            tracking your case.
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card x-chunk="dashboard-01-chunk-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold">
                            Total Individual Case
                        </CardTitle>
                        <GoProjectRoadmap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="text-2xl font-bold">
                            {response.errors.individualComplaintError ??
                                response.individualComplaints}
                        </div>
                        <Button asChild size="sm" className="ml-auto gap-1">
                            <Link href="/dashboard/complaints/individual">
                                View All
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold">
                            Total Orgainzational Case
                        </CardTitle>
                        <ShieldQuestion className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="text-2xl font-bold">
                            {response.errors.organizationComplaintError ??
                                response.organizationComplaints}
                        </div>
                        <Button asChild size="sm" className="ml-auto gap-1">
                            <Link href="/dashboard/complaints/organisational">
                                View All
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                    <CardFooter></CardFooter>
                </Card>
            </div>
            <div className="">
                <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Transactions</CardTitle>
                            <CardDescription>
                                Recent transactions by you.
                            </CardDescription>
                        </div>
                        <Button asChild size="sm" className="ml-auto gap-1">
                            <Link href="/dashboard/payment/history">
                                View All
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Transaction ID</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Payment Status</TableHead>
                                    <TableHead>Payment For</TableHead>
                                    <TableHead>Date</TableHead>{' '}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {response.recentPayments.map((payment) => (
                                    <TableRow key={payment._id}>
                                        <TableCell>
                                            <div className="font-medium">
                                                {payment.transactionId}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <p className="flex items-center">
                                                <IndianRupee className="h-4 w-4" />
                                                {payment.amount}
                                            </p>
                                        </TableCell>
                                        <TableCell>
                                            {payment.paymentStatus ===
                                            'Success' ? (
                                                <Badge
                                                    variant="outline"
                                                    className="text-green-700"
                                                >
                                                    {payment.paymentStatus}
                                                </Badge>
                                            ) : (
                                                <Badge variant="destructive">
                                                    {payment.paymentStatus}
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {payment.paymentFor}
                                        </TableCell>
                                        <TableCell>
                                            {formatDate(payment.paymentDate)}
                                        </TableCell>
                                    </TableRow>
                                ))}{' '}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
