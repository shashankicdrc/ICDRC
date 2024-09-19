
"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { toast } from "sonner";
import { paymentType } from "@/types/columnsType";
import { Badge } from "../ui/badge";
import { formatDate } from "@/lib/formatDate";

export const PaymentColumns: ColumnDef<paymentType>[] = [
    {
        accessorKey: "transactionId",
        header: "Transaction Id",
    },
    {
        accessorKey: "userId.name",
        header: "Name",
    },
    {
        accessorKey: "userId.email",
        header: "Email",
    },

    {
        accessorKey: "paymentDate",
        header: "Date",
        cell: ({ row }) => formatDate(row.original.paymentDate)
    },

    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "paymentStatus",
        header: "Status",
        cell: ({ row }) => {
            const paymentStatus = row.original.paymentStatus;
            return paymentStatus === 'Success' ? <Badge className="text-green-700" variant="outline">{paymentStatus}</Badge>
                : <Badge variant="destructive">{paymentStatus}</Badge>

        }
    },
    {
        accessorKey: "paymentFor",
        header: "Payment For",
    },

    {
        accessorKey: "subscriptionId",
        header: "Subscription Id",
        cell: ({ row }) => row.original.subscriptionId ?? 'N/A'

    },

    {
        accessorKey: "complaintType",
        header: "Complaint Type",
        cell: ({ row }) => row.original.complaintType ?? 'N/A'
    },
    {
        accessorKey: "complaintId",
        header: "Complaint Id",
        cell: ({ row }) => row.original.complaintId ?? 'N/A'
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const paymentHistory = row.original;
            const copyTranasactionId = () => {
                navigator.clipboard.writeText(paymentHistory.transactionId);
                toast.info(`Transaction Id has been copied.`, {
                    description: `${paymentHistory.transactionId}`,
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Copy"),
                    },
                });
            };

            const copyMessageId = () => {
                navigator.clipboard.writeText(paymentHistory._id);
                toast.info(`Payment History Id has been copied.`, {
                    description: `${paymentHistory._id}`,
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Copy"),
                    },
                });
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <Icons.horizontalDot className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={copyMessageId}
                        >
                            Copy Payment Id
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={copyTranasactionId}
                        >
                            Copy Transaction Id
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
]
