'use client';
import toast from 'react-hot-toast';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuLabel,
} from '../../ui/dropdown';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Ellipsis } from 'lucide-react';
import { formatDate } from '../../../lib/formateDate';

const paymentHistoryColumn = [
    {
        accessorKey: 'paymentFor',
        header: 'Payment For',
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
    },
    {
        accessorKey: 'transactionId',
        header: 'Transaction Id',
    },
    {
        accessorKey: 'paymentStatus',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.paymentStatus;
            return status === 'Success' ? (
                <Badge variant="outline" className="text-green-700">
                    {status}
                </Badge>
            ) : (
                <Badge variant="destructive">{status}</Badge>
            );
        },
    },
    {
        accessorKey: 'paymentDate',
        header: 'Date',
        cell: ({ row }) => formatDate(row.original.paymentDate),
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const paymentHistory = row.original;
            const copyTransactionId = () => {
                navigator.clipboard.writeText(paymentHistory.transactionId);
                toast.success(`Transation Id  has been copied.`);
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
                            onClick={copyTransactionId}
                        >
                            Copy Transation Id
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default paymentHistoryColumn;
