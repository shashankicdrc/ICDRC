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
import { subscriptionType } from "@/types/columnsType";
import { formatDate } from "@/lib/formatDate";

export const SubscriptionColumns: ColumnDef<subscriptionType>[] = [
    {
        accessorKey: "userId",
        header: "User Id",
    },
    {
        accessorKey: "planId.name",
        header: "Plan Name",
    },
    {
        accessorKey: "complaintLimit",
        header: "Complaint Limit",
    },
    {
        accessorKey: "usedComplaints",
        header: "Used Complaints",
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => formatDate(row.original.startDate)
    },
    {
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ row }) => formatDate(row.original.endDate)
    },
    {
        id: 'action',
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const subscription = row.original;
            const copyUserId = () => {
                navigator.clipboard.writeText(subscription.userId);
                toast.info(`User Id has been copied.`, {
                    description: `${subscription.userId}`,
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Copy"),
                    },
                });
            };

            const copySubscriptionId = () => {
                navigator.clipboard.writeText(subscription._id);
                toast.info(`Subscription Id has been copied.`, {
                    description: `${subscription._id}`,
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Copy"),
                    },
                });
            };

            const copyPlanId = () => {
                navigator.clipboard.writeText(subscription.planId._id);
                toast.info(`Plan Id has been copied.`, {
                    description: `${subscription.planId._id}`,
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Copy"),
                    },
                });
            };


            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild >
                        <Button variant="ghost" className="h-8 w-8 p-0" >
                            <span className="sr-only" > Open menu </span>
                            < Icons.horizontalDot className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    < DropdownMenuContent align="end" >
                        <DropdownMenuLabel>Actions </DropdownMenuLabel>
                        < DropdownMenuItem
                            className="cursor-pointer"
                            onClick={copySubscriptionId}
                        >
                            Copy Subscription Id
                        </DropdownMenuItem>
                        < DropdownMenuItem
                            className="cursor-pointer"
                            onClick={copyPlanId}
                        >
                            Copy Plan Id
                        </DropdownMenuItem>
                        < DropdownMenuItem
                            className="cursor-pointer"
                            onClick={copyUserId}
                        >
                            Copy User Id
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },


]
