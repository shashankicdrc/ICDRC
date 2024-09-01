'use client';
import { DOTS, usePagination } from '../hook/usePagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './ui/pagination';

const PaginationComponent = ({ totalResults }) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const searchParams = useSearchParams();
    const [rowPerPage, setRowPerPage] = React.useState(20);
    const pathname = usePathname();
    const { replace } = useRouter();
    const pageCount = Math.ceil(totalResults / rowPerPage);

    const paginationRange = usePagination({
        currentPage,
        totalPageCount: pageCount,
    });

    if (currentPage === 0 || (paginationRange && paginationRange.length < 1)) {
        return null;
    }

    React.useEffect(() => {
        const perPage = searchParams.get('perRow');
        if (perPage) setRowPerPage(Number(perPage));
        const current_page = searchParams.get('page');
        if (current_page) setCurrentPage(Number(current_page));
    }, [searchParams]);

    const numberOfPages = Array.from({ length: pageCount }, (_, i) => i + 1);

    const updatePage = (page) => {
        const params = new URLSearchParams(searchParams);
        if (page) {
            params.set('page', page.toString());
        } else {
            params.delete('page');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Pagination className="items-center">
            <p className="pr-2 font-bold text-sm">
                Page {currentPage} of {pageCount}
            </p>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        isDisable={currentPage === 1}
                        onClick={() => updatePage(currentPage - 1)}
                        isActive={currentPage === 1}
                    />
                </PaginationItem>
                {paginationRange &&
                    paginationRange.map((page) => {
                        if (page === DOTS) {
                            return <PaginationEllipsis key={page} />;
                        }
                        return (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    className="cursor-pointer"
                                    onClick={() => updatePage(page)}
                                    isActive={page === currentPage}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}
                <PaginationItem>
                    <PaginationNext
                        isDisable={numberOfPages.length === currentPage}
                        className="cursor-pointer"
                        onClick={() => updatePage(currentPage + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationComponent;
