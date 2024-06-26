"use client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { url } from "../../../api";
import DataTable from './DataTable'
import { OrganistionColumn } from './coloumn'
import { useRouter, useSearchParams } from "next/navigation";
import RowPerPageDropDown from './RowPerPageDropDown'
import PaginationContorll from './PaginationControll'
import { CreateFilterQuery } from './../../../../lib/createQuery'
import { current } from "@reduxjs/toolkit";


const ContactMessages = () => {
    const router = useRouter();
    const admin = useSelector((state) => state.admin);
    const [result, setResult] = useState({ data: [], totalResults: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!admin._id) {
            router.push("/admin/login");
        }

        const current_page = searchParams.get('currentPage');
        const rows_per_page = searchParams.get('perPage');
        if (current_page) setCurrentPage(Number(current_page));
        if (rows_per_page) setRowsPerPage(Number(rows_per_page));
    }, [admin._id, searchParams, router]);

    useEffect(() => {
        const fetchData = async () => {
            const filters = searchParams.getAll('filter');
            const uniqueFilters = Array.from(new Set(filters)).map(filter => {
                const [column, operator, value] = filter.split(':');
                return { column, operator, value };
            });
            const sorts = searchParams.get('sort')

            const filterString = CreateFilterQuery(uniqueFilters);
            const Url = `${url}/api/organizationalcomplaint/all?currentPage=${currentPage}
                        &rowsPerPage=${rowsPerPage}&filter=${filterString}&sort_by=${sorts || ''}`;

            try {
                const response = await fetch(Url);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const { error, data, totalResults } = await response.json();
                if (error) {
                    toast.error(error);
                    return;
                }
                setResult({ data, totalResults });
            } catch (error) {
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [admin._id, currentPage, rowsPerPage, searchParams]);


    return (
        <div
            className="border-2 bg-white border-gray-400 my-4 mx-4 md:px-3 py-2 md:py-4 rounded-md"
            data-aos="zoom-in"
            data-aos-duration="2000"
        >
            <DataTable
                columns={OrganistionColumn}
                data={result.data}
                loading={loading}
                tableType={"organisational"}
            />
            <div className="mx-5 my-5 space-y-3 md:space-y-0 md:flex md:items-center md:justify-between">
                <div className="flex space-x-2 items-center">
                    <p className="font-bold text-sm">Rows per page</p>
                    <RowPerPageDropDown
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                    />
                </div>
                {result.totalResults > rowsPerPage && <div>
                    <PaginationContorll
                        totalResults={result.totalResults}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                }
            </div>
        </div>
    );
};

export default ContactMessages;
