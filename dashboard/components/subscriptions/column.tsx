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
import Link from "next/link";
import { DeactivateSubscriptionForm } from "./DeactivateSubscription";
import { checkSubscriptionStatus, SubscriptionStatus } from "@/lib/checkSubscription";
import { Badge } from "../ui/badge";

export const SubscriptionColumns: ColumnDef<subscriptionType>[] = [
    {
        accessorKey: "planId.name",
        header: "Plan Name",
    },
    {
        accessorKey: "userId.email",
        header: "User"
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
        id: 'Active',
        header: "Active",
        cell: ({ row }) => {
            const subscriptionStatus = checkSubscriptionStatus(row.original);
            return subscriptionStatus === SubscriptionStatus.VALID ? <Badge variant="default">Active</Badge> : <Badge variant="outline"
            >InActive</Badge>
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const subscription = row.original;

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


            return (<DropdownMenu>
                <DropdownMenuTrigger asChild >
                    <Button variant="ghost" className="h-8 w-8 p-0" >
                        <span className="sr-only" > Open menu </span>
                        < Icons.horizontalDot className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                < DropdownMenuContent align="end" >
                    <DropdownMenuLabel>Actions </DropdownMenuLabel>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={copySubscriptionId}
                    >
                        Copy Subscription Id
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href={`/dashboard/subscriptions/extend/${subscription._id}`}>
                            Extend Date
                        </Link>
                    </DropdownMenuItem>
                    <DeactivateSubscriptionForm subscription={subscription} />
                </DropdownMenuContent>
            </DropdownMenu>
            );
        },
    },


]
