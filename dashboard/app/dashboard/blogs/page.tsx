
import { Filter } from "@/components/Filter";
import Sort from "@/components/Sort";
import PerRowSelect from "@/components/perRowSelect";
import { authOptions } from "@/lib/authOptions";
import { BASE_URL } from "@/lib/constant";
import createFilterQuery from "@/lib/createFilter";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import { getBlogs } from "@/externalAPI/blogSerice";
import { blogType } from "@/types/columnsType";
import BlogItem from "@/components/Blogs/BlogCard";
import BlogColumnFilters from "@/components/Filter/blogFilter";
import BlogColumnSort from "@/components/Sort/blogColumnSort";

const PaginationComponent = dynamic(
    () => import("@/components/PaginationController"),
);

export const metadata: Metadata = {
    title: "Blogs",
};

interface Props {
    searchParams: { [key: string]: string };
}

export default async function page({ searchParams }: Props) {
    const sesssion = await getServerSession(authOptions);
    const token = sesssion?.user.AccessToken as string;

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

    const url = `${BASE_URL}/api/blogs?page=${page}&perRow=${perRow}${filters}${sorts}`;

    const { data, error } = await getBlogs(token, url);

    if (error) {
        return (
            <div className="flex justify-center text-center mx-auto my-5">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <main className="p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="flex items-center justify-between">
                <h1 className="my-2 text-4xl font-semibold">Manage Blogs</h1>
            </div>
            <div className="flex  items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Filter columnFilters={BlogColumnFilters} />
                    <Sort columnSorts={BlogColumnSort} />
                </div>
                <Button asChild>
                    <Link href="/dashboard/blogs/add">Add Blog</Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
                {data.blogs.length < 1 ? <div className="flex justify-center text-center mx-auto my-5 col-span-3">
                    <p className="font-bold">No blogs found</p>
                </div>
                    : data.blogs.map((blog: blogType) => <BlogItem data={blog} key={blog._id} />)}
            </div>
            <div className="my-5 space-y-3 md:space-y-0 md:flex md:items-center md:justify-between">
                {data.totalCount > 10 && (<div className="flex space-x-2 justify-center items-center">
                    <p className="font-bold text-sm">Rows per page</p>
                    <PerRowSelect />
                </div>
                )}
                {data.totalCount > perRow && (
                    <div>
                        <PaginationComponent totalResults={data.totalCount} />
                    </div>
                )}
            </div>
        </main>
    );
}

