import { getRecentPaymentHistory } from '@/externalAPI/paymentService';
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { paymentType } from '@/types/columnsType';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatDate } from '@/lib/formatDate';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';

export const revalidate = 60 * 5; // revalidate on every 5 minutes

export default async function RecentTransactions() {
    const session = await getServerSession(authOptions)
    const token = session?.user.AccessToken as string;
    const { data, error } = await getRecentPaymentHistory(token)
    if (error) {
        return <div className="mx-auto flex items-center justify-center">
            <p className="text-center">{error}</p>
        </div>
    }
    return (
        <Card className="my-5">
            <CardHeader className="flex-row justify-between items-center">
                <CardTitle>Recent Transactions</CardTitle>
                <Button variant='link' asChild>
                    <Link href="/dashboard/payments">
                        View All
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader className="bg-accent">
                        <TableRow>
                            <TableHead>Transaction Id</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>PaymentFor</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length ? (data.map((item: paymentType) =>
                            <TableRow key={item._id}>
                                <TableCell>
                                    {item.transactionId}
                                </TableCell>
                                <TableCell>{formatDate(item.paymentDate)}</TableCell>
                                <TableCell>{item.amount}</TableCell>
                                <TableCell>
                                    {item.paymentStatus === 'Success' ?
                                        <Badge variant="outline" className="text-gray-700">{item.paymentStatus}</Badge>
                                        : <Badge variant="destructive">{item.paymentStatus}</Badge>}
                                </TableCell>
                                <TableCell>{item.paymentFor}</TableCell>
                            </TableRow>)) : (
                            <TableRow>
                                <TableCell className="h-24 text-center">
                                    No Data has been found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

    )
}

