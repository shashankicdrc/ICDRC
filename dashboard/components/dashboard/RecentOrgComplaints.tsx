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
import { organisationalCaseType } from '@/types/columnsType';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatDate } from '@/lib/formatDate';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { RecentOrganisationCase } from '@/externalAPI/orgCaseService';


export const revalidate = 60 * 5

export default async function RecentOrgComplaint() {
    const session = await getServerSession(authOptions);
    const token = session?.user.AccessToken as string;
    const { data, error } = await RecentOrganisationCase(token)
    if (error) {
        return <div className="mx-auto flex items-center justify-center">
            <p className="text-center">{error}</p>
        </div>

    }
    return (
        <Card className="my-5">
            <CardHeader className="flex-row justify-between items-center">
                <CardTitle>Recent Organizational Complaints</CardTitle>
                <Button variant='link' asChild>
                    <Link href="/dashboard/organisational">
                        View All
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader className="bg-accent">
                        <TableRow>
                            <TableHead>Case Id</TableHead>
                            <TableHead>Organisation</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead>Policy Type</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length ? (data.map((item: organisationalCaseType) =>
                            <TableRow key={item._id}>
                                <TableCell>
                                    {item.caseId}
                                </TableCell>
                                <TableCell>
                                    {item.organizationName}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{item.paymentStatus}</Badge>
                                </TableCell>
                                <TableCell>{item.policyType}</TableCell>
                                <TableCell>{formatDate(item.createdAt)}</TableCell>
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
