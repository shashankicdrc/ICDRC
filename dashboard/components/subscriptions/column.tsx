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
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import { DeactivateSubscriptionForm } from "./DeactivateSubscription";
import { Badge } from "../ui/badge";


export type Subscription = {
    _id: string,
    name: string;
    email: string;
    individualSubscription: {
        _id: string,
        name: string;
        startDate: string;
        endDate: string;
        isDeleted: boolean;
        isActive: boolean,
    };
    organisationalSubscription: {
        _id: string,
        name: string;
        startDate: string;
        endDate: string;
        isDeleted: boolean;
        isActive: boolean,
    };
};

export const SubscriptionColumns: ColumnDef<Subscription>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        id: "Individual Subscription",
        header: "Individual Subscription",
        cell: ({ row }) => {
            const indSubscription = row.original.individualSubscription;
            return indSubscription.isActive ? <Badge className="text-green-600" variant="outline">Active</Badge>
                : <Badge variant="outline" className="text-red-600">Inactive</Badge>
        }
    },
    {
        id: 'indStartDate',
        accessorKey: "individualSubscription.startDate",
        header: "Individual Start Date",
        cell: ({ row }) => {
            const indSubscription = row.original.individualSubscription;
            return indSubscription.isActive ? formatDate(indSubscription.startDate) : '--'
        }
    },
    {
        id: 'indEndDate',
        accessorKey: "individualSubscription.endDate",
        header: "Individual End Date",
        cell: ({ row }) => {
            const indSubscription = row.original.individualSubscription;
            return indSubscription.isActive ? formatDate(indSubscription.endDate) : '--'
        }
    },
    {
        id: "Organizational Subscription",
        header: "Organizational Subscription",
        cell: ({ row }) => {
            const orgSubscription = row.original.organisationalSubscription;
            return orgSubscription.isActive ? <Badge className="text-green-600" variant="outline">Active</Badge>
                : <Badge variant="outline" className="text-red-600">Inactive</Badge>
        }
    },
    {
        id: "orgStartDate",
        accessorKey: "organisationalSubscription.startDate",
        header: "Organizational Start Date",
        cell: ({ row }) => {
            const orgSubscription = row.original.organisationalSubscription;
            return orgSubscription.isActive ? formatDate(orgSubscription.startDate) : '--'
        }
    },
    {
        id: "orgEndDate",
        accessorKey: "organisationalSubscription.endDate",
        header: "Organizational End Date",
        cell: ({ row }) => {
            const orgSubscription = row.original.organisationalSubscription;
            return orgSubscription.isActive ? formatDate(orgSubscription.endDate) : '--'
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
                    {subscription.individualSubscription._id && <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href={`/dashboard/subscriptions/extend/${subscription._id}?planId=${subscription.individualSubscription._id}`}>
                            Extend Individual Plan  Date
                        </Link>
                    </DropdownMenuItem>
                    }
                    {subscription.organisationalSubscription._id && <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href={`/dashboard/subscriptions/extend/${subscription._id}?planId=${subscription.organisationalSubscription._id}`}>
                            Extend Organizational Plan  Date
                        </Link>
                    </DropdownMenuItem>
                    }
                    {subscription.individualSubscription._id && <DeactivateSubscriptionForm subscription={subscription} type="IND" />}
                    {subscription.organisationalSubscription._id && <DeactivateSubscriptionForm subscription={subscription} type="ORG" />}
                </DropdownMenuContent>
            </DropdownMenu>
            );
        },
    },


]
