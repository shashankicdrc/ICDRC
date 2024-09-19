'use client'
import React from 'react'
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '../ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


export default function SearchChat() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('caseId', term);
        } else {
            params.delete('caseId');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300)

    return (
        <Input
            type="text"
            placeholder="Enter the Case ID..."
            onChange={(e) => {
                handleSearch(e.target.value)
            }}
            defaultValue={searchParams.get('caseId')?.toString()}
            className="max-w-sm"
        />)
}

