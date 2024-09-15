import React from 'react';
import {
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
} from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { ArrowUpRight, IndianRupee } from 'lucide-react';
import { formatDate } from '../../lib/formateDate';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '../../components/ui/card';

export default async function RecentTransactions({ response }) {
    return (
        <Card className="lg:col-span-2">
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
                        {response.recentPayments.length ? (
                            response.recentPayments.map((payment) => (
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
                                        {payment.paymentStatus === 'Success' ? (
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
                                    <TableCell>{payment.paymentFor}</TableCell>
                                    <TableCell>
                                        {formatDate(payment.paymentDate)}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    className="text-center h-24"
                                    colSpan={5}
                                >
                                    Transaction not found
                                </TableCell>
                            </TableRow>
                        )}{' '}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
