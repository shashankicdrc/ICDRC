'use client';
import toast from 'react-hot-toast';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '../../ui/dropdown';
import { Button } from '../../ui/button';
import Link from 'next/link';
import { Ellipsis } from 'lucide-react';

const organisaitonlColumns = [
    {
        accessorKey: 'caseId',
        header: 'Case ID',
    },
    {
        accessorKey: 'organizationName',
        header: 'Organization Name',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'mobile',
        header: 'Mobile',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'state',
        header: 'State',
    },
    {
        accessorKey: 'city',
        header: 'City',
    },
    {
        accessorKey: 'address',
        header: 'Address',
    },
    {
        accessorKey: 'policyCompany',
        header: 'Policy Company',
    },
    {
        accessorKey: 'policyType',
        header: 'Policy Type',
    },
    {
        accessorKey: 'problem',
        header: 'Problem',
    },
    {
        accessorKey: 'problemDetails',
        header: 'Problem Details',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'paymentStatus',
        header: 'Payment Status',
    },
    {
        accessorKey: 'userId',
        header: 'User ID',
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const organisaitonl = row.original;
            const copyorganisaitonlId = () => {
                navigator.clipboard.writeText(organisaitonl.caseId);
                toast.success(
                    `${organisaitonl.organizationName} Case ID has been copied.`,
                );
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <Ellipsis className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={copyorganisaitonlId}
                        >
                            Copy Case ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {organisaitonl.paymentStatus === 'Paid' && (
                            <DropdownMenuItem
                                className="cursor-pointer"
                                aschild
                            >
                                <Link
                                    className="w-full"
                                    href={`/dashboard/chat/${organisaitonl._id}?type=organizational`}
                                >
                                    Chat
                                </Link>
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="cursor-pointer">
                            <Link
                                href={`/dashboard/complaints/organisational/${organisaitonl._id}`}
                            >
                                View Full Details
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default organisaitonlColumns;
