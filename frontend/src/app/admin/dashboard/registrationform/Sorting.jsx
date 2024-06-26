import React, { useEffect, useState, } from 'react'
import { MdOutlineSort } from "react-icons/md";
import * as Popover from '@radix-ui/react-popover';
import { IoAdd, IoClose } from 'react-icons/io5';
import { Select, } from '@chakra-ui/react';
import columnsorts from './columnSorts'
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { CreateSortQuery } from '../../../../lib/createQuery';

const Sorting = () => {
    const [userSorts, setUserSorts] = useState([])
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter()

    useEffect(() => {
        const sorts = searchParams.getAll('sort');
        const uniqueSorts = new Set();
        sorts.forEach(sort => {
            uniqueSorts.add(sort);
        });

        const newsorts = Array.from(uniqueSorts).map(sort => {
            const data = sort.split(',');
            return data.map(item => {
                let [value, column] = item.split("(")
                column = column.substring(0, column.length - 1)
                return { column, value };
            })
        });
        if (newsorts.length > 0 && newsorts[0]) {
            setUserSorts(newsorts[0]);
        }
    }, [searchParams]);

    const handleAddSort = () => {
        setUserSorts([...userSorts, { column: '', value: '' }]);
    };

    const handleRemoveSorts = (index) => {
        const newSorts = userSorts.filter((_, i) => i !== index);
        setUserSorts(newSorts);
        updateSearchParms(newSorts)
    };

    const updateSearchParms = (arr) => {
        const params = new URLSearchParams(searchParams)
        const sortString = CreateSortQuery(arr)
        params.set('sort', sortString)
        replace(`${pathname}?${params.toString()}`)

    }

    const handleSortChange = (index, field, value) => {
        const newSorts = [...userSorts];
        newSorts[index][field] = value;
        setUserSorts(newSorts);
        console.log(JSON.stringify({ index, value, field }))
        if (!value || !field) return;

        if (field === 'value' && value.length > 0) {
            updateSearchParms(newSorts)
        }

    }
    const removeAllFilter = () => {
        setUserSorts([]);
        const params = new URLSearchParams(searchParams.toString());
        params.delete('sort');
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <Popover.Root>
            <Popover.Trigger asChild onClick={() => !userSorts.length && handleAddSort()}>
                <button className="inline-flex items-center justify-center 
                bg-white py-1 rounded-md px-4 outline-none
                hover:bg-gray-100 ml-auto h-10">
                    Sort <MdOutlineSort className="ml-2" />
                </button>
            </Popover.Trigger>
            <Popover.Content
                align="start"
                className="rounded border px-2 py-2 mx-5 bg-white"
            >
                <div className="">
                    {userSorts.map((sort, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <Select
                                placeholder="Column"
                                value={sort.column}
                                onChange={(e) => handleSortChange(index, 'column', e.target.value)}
                                className="w-fit mr-2"
                            >
                                {columnsorts.map(col => (
                                    <option key={col.accessorKey} value={col.accessorKey}>{col.header}</option>
                                ))}
                            </Select>
                            <Select
                                disabled={!sort.column}
                                placeholder="Sort"
                                value={sort.value}
                                onChange={(e) => handleSortChange(index, 'value', e.target.value)}
                            >
                                {columnsorts[0].operators.map(item => (
                                    <option key={item.label} value={item.value}>{item.label}</option>
                                ))}
                            </Select>
                            <button
                                onClick={() => handleRemoveSorts(index)}
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
                        onClick={handleAddSort}
                        className="inline-flex items-center justify-center 
              bg-white py-1 rounded-md px-2 outline-none
              hover:bg-gray-100 ml-auto h-10"
                    >
                        <IoAdd className="mr-2" /> Add Sorts
                    </button>
                    <button
                        onClick={removeAllFilter}
                        className="inline-flex items-center justify-center 
              bg-white py-1 rounded-md px-2 outline-none
              hover:bg-gray-100 ml-auto h-10"
                    >
                        <IoClose className="mr-2" /> Remove All Sorts
                    </button>

                </div>
            </Popover.Content>
        </Popover.Root>
    )
}

export default Sorting
