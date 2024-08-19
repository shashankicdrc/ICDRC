import ErrorFallback from '@/components/ErrorFallback';
import PaginationComponent from '@/components/PaginationController';
import { PartnerColumns } from '@/components/partners/columns';
import { PartnerDataTable } from '@/components/partners/DataTable';
import PerRowSelect from '@/components/perRowSelect';
import { Card, CardContent } from '@/components/ui/card';
import { getPartners } from '@/externalAPI/partnerService';
import { BASE_URL } from '@/lib/constant';
import createFilterQuery from '@/lib/createFilter';
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary';

interface Props {
    searchParams: { [key: string]: string };
}

export default async function page({ searchParams }: Props) {
    let page = Number(searchParams.page || 1);
    let perRow = Number(searchParams.perRow || 20);

    let filters = "";
    let sorts = "";

    const currentFilters = searchParams.filter;
    const currentSorts = searchParams.sort;

    if (currentFilters) {
        const filterQuery = createFilterQuery(currentFilters);
        if (filterQuery) {
            filters = `&filter=${filterQuery}`;
        }
    }
    if (currentSorts && currentSorts.length) {
        sorts = `&sortBy=${currentSorts}`;
    }
    const url = `${BASE_URL}/api/partners?page=${page}&perRow=${perRow}${filters}${sorts}`;
    const { data, error } = await getPartners(url);
    if (error) {
        return (
            <div className="flex justify-center text-center mx-auto my-5">
                <p>{error}</p>
            </div>
        );
    }
    return (
        <main className="p-4 sm:px-6 sm:py-0 md:gap-8">
            <h1 className="my-2 text-4xl font-semibold">
                Partners
            </h1>
            <Card>
                <CardContent>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <PartnerDataTable columns={PartnerColumns} data={data.partners} />
                    </ErrorBoundary>
                    <div className="my-5 space-y-3 md:space-y-0 md:flex md:items-center md:justify-between">
                        <div className="flex space-x-2 items-center">
                            <p className="font-bold text-sm">Rows per page</p>
                            <PerRowSelect />
                        </div>
                        {data.totalCount > perRow && (
                            <div>
                                <PaginationComponent totalResults={data.totalCount} />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </main>)
}

