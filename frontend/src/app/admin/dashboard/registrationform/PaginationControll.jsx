import React, { useState, useEffect } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../../../../components/ui/pagination';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { DOTS, usePagination } from '../../../../hook/usePagination'


export default function PaginationControl({ totalResults }) {
    const [currentPage, setCurrentPage] = useState(1);
    const searchParams = useSearchParams();
    const [rowPerPage, setRowPerPage] = useState(20);
    const pathname = usePathname();
    const { replace } = useRouter();
    const pageCount = Math.ceil(totalResults / rowPerPage);


    const paginationRange = usePagination({
        currentPage,
        totalPageCount: pageCount,
    })


    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }


    useEffect(() => {
        const perPage = searchParams.get('perPage');
        if (perPage) setRowPerPage(Number(perPage));
        const current_page = searchParams.get('currentPage');
        if (current_page) setCurrentPage(Number(current_page));
    }, [searchParams]);

    const numberOfPages = Array.from({ length: pageCount }, (_, i) => i + 1);

    const updatePage = (page) => {
        const params = new URLSearchParams(searchParams);
        page ? params.set('currentPage', page) : params.delete('currentPage');
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Pagination className="items-center">
            <p className="pr-2 font-bold text-sm"> Page {currentPage} of {pageCount}</p>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => updatePage(currentPage - 1)}
                        isDisabled={currentPage === 1}
                    />
                </PaginationItem>
                {paginationRange.map((page) => {
                    if (page === DOTS) {
                        return <PaginationEllipsis />
                    }
                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                onClick={() => updatePage(page)}
                                isActive={page === currentPage}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>

                    )
                }
                )}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => updatePage(currentPage + 1)}
                        isDisabled={numberOfPages.length === currentPage}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

