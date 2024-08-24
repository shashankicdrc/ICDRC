import React from 'react'
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { adminType } from '@/types/columnsType';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { getRecentAdmins } from '@/externalAPI/adminService';

export const revalidate = 60 * 5

export default async function RecentAdmins() {
    const session = await getServerSession(authOptions);
    const token = session?.user.AccessToken as string;
    const { data, error } = await getRecentAdmins(token)
    if (error) {
        return <div className="mx-auto flex items-center justify-center">
            <p className="text-center">{error}</p>
        </div>
    }
    return (
        <Card className="my-5">
            <CardHeader className="flex-row justify-between items-center">
                <CardTitle>Admins</CardTitle>
                <Button variant='link' asChild>
                    <Link href="/dashboard/admins">
                        View All
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader className="bg-accent">
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length ? (data.map((item: adminType) =>
                            <TableRow key={item._id}>
                                <TableCell>
                                    {item.name}
                                </TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{item.role}</Badge>
                                </TableCell>
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

