
"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import dynamic from "next/dynamic";
import { testimonialType } from "@/types/columnsType";

const Addtestimonial = dynamic(
    () => import("@/components/testimonials/AddTestimonials"),
);

export const testimonialColumns: ColumnDef<testimonialType>[] = [
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
        accessorKey: "_id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "stars",
        header: "Stars",
    },

    {
        accessorKey: "designation",
        header: "Designation",
    },
    {
        accessorKey: "review",
        header: "Review",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const testimonial = row.original;
            console.log(testimonial)
            const copyMessageId = () => {
                navigator.clipboard.writeText(testimonial._id);
                toast.info(`testimonial Id has been copied.`, {
                    description: `${testimonial._id}`,
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
                            Copy Testimonial Id
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Addtestimonial action="edit" data={testimonial} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
