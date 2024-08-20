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
import { Checkbox } from "@/components/ui/checkbox";
import { organisationalCaseType } from "@/types/columnsType";
import { formatDate } from "@/lib/formatDate";

const OrgCaseColumns: ColumnDef<organisationalCaseType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "caseId",
        header: "Case ID",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => formatDate(row.getValue('createdAt'))
    },
    {
        accessorKey: "organizationName",
        header: "Organization",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "mobile",
        header: "Phone Number",
    },

    {
        accessorKey: "status",
        header: "Case Status",
    },
    {
        accessorKey: "paymentStatus",
        header: "Payment Status",
    },
    {
        accessorKey: "problemDetails",
        header: "Problem Details",
    },
    {
        accessorKey: "problem",
        header: "Problem",
    },
    {
        accessorKey: "policyType",
        header: "Policy Type",
    },
    {
        accessorKey: "policyCompany",
        header: "Policy Company",
    },
    {
        accessorKey: "state",
        header: "State",
    },
    {
        accessorKey: "city",
        header: "City",
    },

    {
        accessorKey: "address",
        header: "Address",
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const caseData = row.original;
            const copyCaseId = () => {
                navigator.clipboard.writeText(caseData.caseId);
                toast.info(`Case ID has been copied.`, {
                    description: `${caseData.caseId}`,
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
                            onClick={copyCaseId}
                        >
                            Copy Case ID
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default OrgCaseColumns;
