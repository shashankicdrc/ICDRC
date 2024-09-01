
import React from "react";
import ErrorFallback from "@/components/ErrorFallback";
import { Card, CardContent } from "@/components/ui/card";
import { ErrorBoundary } from "react-error-boundary";
import { getTestimonial } from "@/externalAPI/testimonialService";
import createFilterQuery from "@/lib/createFilter";
import { BASE_URL } from "@/lib/constant";
import { testimonialColumns } from "@/components/testimonials/columns";
import { TestimonialDataTable } from "@/components/testimonials/DataTable";
import PerRowSelect from "@/components/perRowSelect";
import dynamic from "next/dynamic";

const PaginationComponent = dynamic(
    () => import("@/components/PaginationController"),
);

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
    const url = `${BASE_URL}/api/testimonials?page=${page}&perRow=${perRow}${filters}${sorts}`;
    const { data, error } = await getTestimonial(url);
    if (error) {
        return (
            <div className="flex justify-center text-center mx-auto my-5">
                <p>{error}</p>
            </div>
        );
    }
    return (
        <main className="p-4 sm:px-6 sm:py-0 md:gap-8">
            <h1 className="my-2 text-4xl font-semibold">Testimonials</h1>
            <Card>
                <CardContent>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <TestimonialDataTable
                            data={data.testimonials}
                            columns={testimonialColumns}
                        />
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
        </main>
    );
}
