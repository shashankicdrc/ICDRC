import React, { useState, useEffect } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MdCheck } from "react-icons/md";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { IoIosArrowDown } from "react-icons/io";


export default function RowPerPageDropDown() {
    const perPageArr = [10, 20, 30, 40, 50]
    const [rowPerPage, setrowPerPage] = useState(perPageArr[1])
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();


    useEffect(() => {
        const perPage = searchParams.get('perPage')
        if (perPage) setrowPerPage(Number(perPage))
    }, [searchParams])

    const handleSelect = (perPage) => {
        const params = new URLSearchParams(searchParams)
        perPage ? params.set('perPage', perPage) : params.delete('perPage')
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button
                    className="inline-flex items-center justify-center 
                        bg-white py-1 rounded-md border border-gray-300 px-4 outline-none
                        hover:bg-gray-100 ml-auto"
                    aria-label="Customise options"
                >
                    {rowPerPage} <IoIosArrowDown className="ml-2" />
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                    align="start"
                >
                    {perPageArr.map((item => (
                        <DropdownMenu.CheckboxItem
                            key={item}
                            className="leading-none rounded-[3px] flex items-center h-[35px] px-[10px] relative pl-[35px] select-none outline-none hover:bg-gray-100 capitalize"
                            checked={rowPerPage === item}
                            onSelect={() => handleSelect(item)}
                        >
                            <DropdownMenu.ItemIndicator className="absolute left-0 w-[35px] inline-flex items-center justify-center">
                                <MdCheck />
                            </DropdownMenu.ItemIndicator>
                            {item}
                        </DropdownMenu.CheckboxItem>

                    )))}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}

