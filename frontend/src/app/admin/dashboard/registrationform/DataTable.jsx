import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table';
import { MdCheck } from "react-icons/md";
import { Fragment, useState } from 'react';
import { Table, TableContainer, Thead, Tbody, Tr, Th, Td, Box, Button } from '@chakra-ui/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Filter from './Filter'

export default function DataTable({ columns, data }) {
    const [columnVisibility, setColumnVisibility] = useState({
        policyType: false,
        address: false,
        state: false,
        country: false,
        policyCompany: false,
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            columnVisibility,
        },
        onColumnVisibilityChange: setColumnVisibility,
    });

    return (
        <Fragment>
            <div className="flex items-center justify-between mb-3 mx-5">
                <div>
                </div>

                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button
                            className="inline-flex items-center justify-center 
                        bg-white py-1 rounded-md border border-gray-300 px-4 outline-none
                        hover:bg-gray-100 ml-auto"
                            aria-label="Customise options"
                        >
                            Columns <IoIosArrowDown className="ml-2" />
                        </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                            align="end"
                        >
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <DropdownMenu.CheckboxItem
                                        key={column.id}
                                        className="leading-none rounded-[3px] flex items-center h-[35px] px-[10px] relative pl-[35px] select-none outline-none hover:bg-gray-100 capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        onSelect={(e) => e.preventDefault()}
                                    >
                                        <DropdownMenu.ItemIndicator className="absolute left-0 w-[35px] inline-flex items-center justify-center">
                                            <MdCheck />
                                        </DropdownMenu.ItemIndicator>
                                        {column.id}
                                    </DropdownMenu.CheckboxItem>
                                ))}
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id} bg="gray.700">
                                {headerGroup.headers.map((header) => (
                                    <Th
                                        key={header.id}
                                        color="white"
                                        fontWeight="bold"
                                        py={4}
                                        px={6}
                                        textAlign="center"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div className="flex items-center">
                                                {header.column.columnDef.header}
                                            </div>
                                        )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, rowIndex) => (
                                <Tr key={row.id} bg={rowIndex % 2 === 0 ? 'gray.50' : 'white'} _hover={{ bg: 'gray.100' }}>
                                    {row.getVisibleCells().map((cell) => (
                                        <Td key={cell.id} py={4} px={6} border="1px" borderColor="gray.200">
                                            {cell.column.columnDef.cell(cell.getContext())}
                                        </Td>
                                    ))}
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan={columns.length} py={4} px={6} textAlign="center">
                                    No results.
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </Fragment >
    );
}
