import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { url } from "../../../api";
import { toast } from "react-hot-toast";
import DataTable from './DataTable'
import columns from './coloumn'
import RowPerPageDropDown from './RowPerPageDropDown'
import PaginationContorll from './PaginationControll'


const Indvidual = () => {
    const router = useRouter();
    const admin = useSelector((state) => state.admin);
    const [result, setResult] = useState({
        data: [],
        totalResults: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentPage, setcurrentPage] = useState(1);
    const [rowsPerPage, setrowsPerPage] = useState(20);
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!admin._id) {
            router.push("/admin/login");
        }

        const current_page = searchParams.get('currentPage');
        const rows_per_page = searchParams.get('perPage');
        if (current_page && rows_per_page) {
            setcurrentPage(Number(current_page)); // Convert to number
            setrowsPerPage(Number(rows_per_page)); // Convert to number
        }
    }, [admin._id, searchParams, router]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${url}/api/individualcomplaint/all?currentPage=${currentPage}&rowsPerPage=${rowsPerPage}`,
                    {
                        headers: {
                            Authorization: `Bearer ${admin._id}`,
                        },
                    }
                );
                const { error, data, totalResults } = await response.json();
                if (error) {
                    toast.error(error);
                    return;
                }
                setResult({
                    data,
                    totalResults
                });
            } catch (error) {
                console.error(error);
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [admin._id, currentPage, rowsPerPage]);

    console.log(result.data[0])

    return (
        <div
            className="border-2 bg-white border-gray-400 my-4 mx-4 md:px-3 py-2 md:py-4 rounded-md"
            data-aos="zoom-in"
            data-aos-duration="2000"
        >
            <DataTable columns={columns} data={result.data} />
            <div className="mx-5 my-5 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
                <div className="flex space-x-2 items-center">
                    <p className="font-bold text-sm">Rows per page</p>
                    <RowPerPageDropDown />
                </div>
                <div>
                    <PaginationContorll totalResults={result.totalResults} />
                </div>
            </div>

        </div>
    );
};

export default Indvidual;
