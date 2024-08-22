
"use client";
import React, { Fragment } from "react";
import {
    ColumnDef,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { partnerType } from "@/types/columnsType";
import Sort from "../Sort";
import PartnerColumnSort from "../Sort/partnerColumnSort";
import { Filter } from "../Filter";
import PartnerColumnFilters from "../Filter/partnerFilter";
import dynamic from 'next/dynamic';

const AlertDelete = dynamic(() => import('../AlertDelete'))


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function PartnerDataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({
            updatedAt: false,
        });

    const [rowSelection, setRowSelection] = React.useState({});
    const [partnersId, setFaqIds] = React.useState<string[]>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            columnVisibility,
            rowSelection,
        },
    });

    const selectedIds = React.useMemo(() => {
        const indeces = Object.keys(rowSelection).map((index) =>
            parseInt(index, 10),
        );
        return indeces
            .map((index) => data[index])
            .filter((item) => item !== undefined)
            .map((item) => (item as partnerType)._id);
    }, [rowSelection, data]);

    React.useEffect(() => {
        setFaqIds(selectedIds);
    }, [selectedIds, data]);

    return (
        <Fragment>
            <div className="flex justify-between my-3">
                <div className="flex items-center space-x-2">
                    <Filter columnFilters={PartnerColumnFilters} />
                    <Sort columnSorts={PartnerColumnSort} />
                    {partnersId.length ? <AlertDelete type="partners" arr={partnersId} /> : null}
                </div>
                <div className="flex items-center space-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Columns</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.columnDef.header as any}
                                    </DropdownMenuCheckboxItem>
                                ))}{" "}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No Data has been found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Fragment>
    );
}
