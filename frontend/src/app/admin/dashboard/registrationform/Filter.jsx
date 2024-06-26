import React, { useEffect, useState, } from 'react'
import { MdOutlineFilterList } from "react-icons/md";
import * as Popover from '@radix-ui/react-popover';
import { IoAdd, IoClose } from 'react-icons/io5';
import { Select, Input } from '@chakra-ui/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';


export default function Filter({ columnFilters, tableType }) {
    const [userFilters, setUserFilters] = useState([])

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter()


    useEffect(() => {
        const filters = searchParams.getAll('filter');
        const uniqueFilters = new Set();
        filters.forEach(filter => {
            uniqueFilters.add(filter);
        });

        const params = new URLSearchParams(searchParams)

        const newFilters = Array.from(uniqueFilters).map(filter => {
            let [column, operator, value] = filter.split(':');

            // Remove the filter if it doesn't match the current table type
            if (tableType === 'individual' && column === 'organization_name') {
                params.delete('filter', filter);
                return null;
            } else if (tableType === 'organisational' && column === 'name') {
                params.delete('filter', filter);
                return null;
            }

            // Adjust the column name according to the table type
            if (tableType === 'individual' && column === 'organization_name') {
                column = 'name';
            } else if (tableType === 'organisational' && column === 'name') {
                column = 'organization_name';
            }

            return { column, operator, value };
        }).filter(Boolean);


        replace(`${pathname}?${params.toString()}`)
        setUserFilters(newFilters);
    }, [searchParams, tableType]);


    const handleAddFilter = () => {
        setUserFilters([...userFilters, { column: '', operator: '', value: '' }]);
    };

    const handleRemoveFilter = (index) => {
        const newFilters = userFilters.filter((_, i) => i !== index);
        setUserFilters(newFilters);

        const params = new URLSearchParams(searchParams.toString());
        params.delete('filter'); // Remove all 'filter' params

        // Add back all filters except the one being removed
        newFilters.forEach(item => {
            const filterValue = `${item.column}:${item.operator}:${item.value}`;
            params.append('filter', filterValue);
        });

        replace(`${pathname}?${params.toString()}`);
    };



    const handleFilterChange = (index, field, value) => {
        const newFilters = [...userFilters];
        newFilters[index][field] = value;
        setUserFilters(newFilters);

        console.log(JSON.stringify({ index, value, field }))

        if (!value || !field) return;

        if (value.length > 0) {
            const params = new URLSearchParams(searchParams)

            userFilters.forEach(filter => {
                const keysToRemove = [];
                params.forEach((value, key) => {
                    if (key === 'filter' && value.startsWith(`${filter.column}:`)) {
                        keysToRemove.push(key);
                    }
                });
                keysToRemove.forEach(key => params.delete(key));
            });

            // Add new filter params
            userFilters.
                forEach(item => {
                    const filterValue = `${item.column}:${item.operator}:${item.value}`;
                    params.append('filter', filterValue);
                });

            replace(`${pathname}?${params.toString()}`)
        }
    }
    const removeAllFilter = () => {
        setUserFilters([]);
        const params = new URLSearchParams(searchParams.toString());

        params.delete('filter');

        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <Popover.Root>
            <Popover.Trigger asChild onClick={() => !userFilters.length && handleAddFilter()}>
                <button className="inline-flex items-center justify-center 
                bg-white py-1 rounded-md px-4 outline-none
                hover:bg-gray-100 ml-auto h-10">
                    Filter <MdOutlineFilterList className="ml-2" />
                </button>
            </Popover.Trigger>
            <Popover.Content
                align="start"
                className="rounded border px-2 py-2 mx-5 bg-white"
            >
                <div className="">
                    {userFilters.map((filter, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <Select
                                placeholder="Column"
                                value={filter.column}
                                onChange={(e) => handleFilterChange(index, 'column', e.target.value)}
                                className="w-fit mr-2"
                            >
                                {columnFilters.map(col => (
                                    <option key={col.accessorKey} value={col.accessorKey}>{col.header}</option>
                                ))}
                            </Select>
                            <Select
                                placeholder="Operator"
                                value={filter.operator}
                                onChange={(e) => handleFilterChange(index, 'operator', e.target.value)}
                                className="w-auto"
                                disabled={!filter.column}
                            >
                                {filter.column && columnFilters.find(col => col.accessorKey === filter.column).operators.map(op => (
                                    <option key={op.label} value={op.value}>{op.label}</option>
                                ))}
                            </Select>
                            {filter.column && columnFilters.find(col => col.accessorKey === filter.column).inputType === 'text' && (
                                <Input
                                    disabled={!filter.operator}
                                    placeholder="Filter value"
                                    value={filter.value}
                                    onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
                                    className="w-auto"
                                />
                            )}
                            {filter.column && columnFilters.find(col => col.accessorKey === filter.column).inputType === 'date' && (
                                <Input
                                    disabled={!filter.operator}
                                    type="date"
                                    value={filter.value}
                                    onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
                                    className="w-auto"
                                />
                            )}
                            {filter.column && columnFilters.find(col => col.accessorKey === filter.column).inputType === 'boolean' && (
                                <Select
                                    disabled={!filter.operator}
                                    placeholder="Status"
                                    value={filter.value}
                                    onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
                                    className=""
                                >
                                    <option value="done">Done</option>
                                    <option value="pending">Pending</option>
                                </Select>
                            )}
                            <button
                                onClick={() => handleRemoveFilter(index)}
                                className="inline-flex items-center justify-center 
                  bg-white py-1 rounded-md px-2 outline-none
                  hover:bg-gray-100 ml-auto h-10"
                            >
                                <IoClose />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="">
                    <button
                        onClick={handleAddFilter}
                        className="inline-flex items-center justify-center 
              bg-white py-1 rounded-md px-2 outline-none
              hover:bg-gray-100 ml-auto h-10"
                    >
                        <IoAdd className="mr-2" /> Add Filter
                    </button>
                    <button
                        onClick={removeAllFilter}
                        className="inline-flex items-center justify-center 
              bg-white py-1 rounded-md px-2 outline-none
              hover:bg-gray-100 ml-auto h-10"
                    >
                        <IoClose className="mr-2" /> Remove All Filter
                    </button>

                </div>
            </Popover.Content>
        </Popover.Root>)
}

