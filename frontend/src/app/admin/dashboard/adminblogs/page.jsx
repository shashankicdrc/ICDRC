"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminNav from "../../components/navbar/page";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { url } from "../../../api";
import PageLoader from "../../components/pageloader/page";
import { RiDeleteBin3Line } from "react-icons/ri";
import Image from 'next/image';
import FormComponent from '../../components/blog/FormComponent'

const AdminBlog = () => {
    const router = useRouter();
    const admin = useSelector((state) => state.admin);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!admin._id) {
            router.push("/admin/loginAdmin");
        }
    }, [router, admin]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${url}/api/handleblogs`);
            if (res.data.success) {
                setData(res.data.data);
            }
        } catch (err) {
            // console.log(err);
            if (err?.response?.data?.message) {
                toast.error(err?.response?.data?.message);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${url}/api/handleblogs`);
                if (res.data.success) {
                    setData(res.data.data);
                }
            } catch (err) {
                // console.log(err);
                if (err?.response?.data?.message) {
                    toast.error(err?.response?.data?.message);
                }
            }
            setLoading(false);
        };
        getData();
    }, [admin.token]);


    const deletebtn = async (id) => {
        try {
            const res = await axios.delete(`${url}/api/handleblogs/${id}`, {
                headers: {
                    Authorization: admin.token,
                    "Content-Type": "application/json",
                },
            });
            if (res.data.success) {
                toast.success(res.data.message);
                getData();
            }
        } catch (err) {
            toast.error(err.response.data.message);
            // console.log(err);
        }
    };

    const formatCreatedAtDate = (createdAt) => {
        const createdAtDate = new Date(createdAt);
        return createdAtDate.toLocaleDateString();
    };

    return (
        <div className="bg-gradient-to-r from-orange-300 to-red-300 min-h-screen">
            {loading && <PageLoader />}
            <AdminNav />

            <div
                className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
                style={{
                    backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)`,
                    height: "250px",
                }}
            >
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                >
                    <div className="flex h-full items-center justify-end flex-col">
                        <h2
                            className=" mb-4 md:mb-8 text-white text-3xl text-center md:text-5xl font-semibold"
                            data-aos="fade-up"
                            data-aos-duration="2000"
                        >
                            Manage Blogs
                        </h2>
                    </div>
                </div>
            </div>

            <div
                className="border-2 bg-white border-gray-400 my-4 mx-4 md:px-3 py-2 md:py-4 rounded-md"
                data-aos="zoom-in"
                data-aos-duration="2000"
            >
                <h2 className="text-center border-b-2 border-gray-700 font-bold text-gray-900 text-3xl p-4">
                    Add New Blog
                </h2>

                <div className="flex flex-col justify-center items-center my-4">
                    <FormComponent getData={getData} />
                </div>
            </div>

            <div
                className="border-2 bg-white border-gray-400 my-4 mx-4 md:px-3 py-2 md:py-4 rounded-md"
                data-aos="zoom-in"
                data-aos-duration="2000"
            >
                <h2 className="text-center border-b-2 border-gray-700 font-bold text-gray-900 text-3xl p-4">
                    All Blogs
                </h2>
                <div className="grid gap-8 mt-5 md:mt-10 mx-4 md:mx-12 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
                    {data?.length > 0 ? (
                        data.map((item) => (
                            <div
                                key={item._id}
                                className="overflow-hidden border-2 border-orange-500 transition-shadow duration-300 bg-white rounded-2xl shadow-lg px-4 py-3"
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                            >
                                <Link href={`/blogs/${item._id}`} aria-label="Article">
                                    <Image
                                        src={item.image}
                                        className="object-cover w-full h-40 md:h-60 rounded-2xl"
                                        alt=""
                                        width={640}
                                        height={360}

                                    />
                                </Link>
                                <div className="py-5">
                                    <Link href={`/blogs/${item._id}`} aria-label="Article">
                                        <p className="text-2xl font-semibold font-[Poppins] text-orange-600">
                                            {item.name}
                                        </p>

                                        <p className="mb-4 text-gray-900 text-xl font-[Poppins]">
                                            {item.desc}
                                        </p>
                                    </Link>
                                    <p className="mb-2 text-xl text-red-600 flex justify-between">
                                        <span className="font-[Poppins]">
                                            Created on: {formatCreatedAtDate(item.createdAt)}
                                        </span>
                                        <button
                                            onClick={() => deletebtn(item._id)}
                                            className="text-red-500 text-xl"
                                        >
                                            <RiDeleteBin3Line />
                                        </button>
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <span className="font-semibold font-[Poppins] text-xl md:text-2xl">
                            No blogs available.
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminBlog;
