'use client'
import React from 'react'
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/page';
// import { useEffect } from 'react';
import { useState } from 'react';
import { url } from '../../../api';
import { toast } from 'react-hot-toast';
import { RiDeleteBin3Line } from 'react-icons/ri'
import axios from 'axios';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';
// import PageLoader from '../../adminComponents/PageLoader/PageLoader';

const ChatBotLeads = () => {

    // const navigate = useNavigate();
    // const admin = useSelector((state) => state.admin);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     if (!admin._id) {
    //         navigate('/en/ICDRC/loginAdmin')
    //     }
    // }, [navigate, admin])


    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [])

    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${url}/api/createchatdata`, {
                headers: {
                    Authorization: admin.token,
                    'Content-Type': 'application/json',
                }
            })
            if (res.data.success) {
                setData(res.data.data);
            }
        }
        catch (err) {
            // console.log(err);
            if (err?.response?.data?.message) {
                toast.error(err?.response?.data?.message);
            }
        }
        setLoading(false);
    }


    // useEffect(() => {
    //     const getData = async () => {
    //         setLoading(true);
    //         try {
    //             const res = await axios.get(`${url}/api/createchatdata`, {
    //                 headers: {
    //                     Authorization: admin.token,
    //                     'Content-Type': 'application/json',
    //                 }
    //             })
    //             if (res.data.success) {
    //                 setData(res.data.data);
    //             }
    //         }
    //         catch (err) {
    //             // console.log(err);
    //             if (err?.response?.data?.message) {
    //                 console.log(err?.response?.data?.message);
    //             }
    //         }
    //         setLoading(false);
    //     }
    //     getData();
    // }, [admin.token])

    const deletebtn = async (id) => {
        try {
            const res = await axios.delete(`${url}/api/createchatdata/${id}`, {
                headers: {
                    Authorization: admin.token,
                    'Content-Type': 'application/json',
                }
            })
            if (res.data.success) {
                toast.success(res.data.message);
                getData();
            }
        }
        catch (err) {
            toast.error(err.response.data.message)
            // console.log(err);
        }
    }

    const formatCreatedAtDate = (createdAt) => {
        const createdAtDate = new Date(createdAt);
        return createdAtDate.toLocaleDateString();
    };

    return (
        <div className='bg-gradient-to-r from-orange-300 to-red-300 min-h-screen'>
            {/* {loading && <PageLoader />} */}
            <Navbar />

            <div
                className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
                style={{ backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)`, height: '250px' }}>
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                    <div className="flex h-full items-center justify-end flex-col">
                        <h2 className=" mb-4 md:mb-8 text-white text-3xl text-center md:text-5xl font-semibold" data-aos="fade-up" data-aos-duration="2000">
                            Chatbot Generated Leads
                        </h2>
                    </div>
                </div>
            </div>

            <div className="border-2 bg-white border-gray-400 my-4 mx-4  md:px-3 py-2 md:py-4 rounded-md" data-aos="zoom-in" data-aos-duration="2000">
                <div className='flex justify-between items-center'>
                    <p className="text-md font-[Poppins] text-gray-700 md:text-xl font-medium pl-4 lg:pl-8">Total: {data?.length}</p>
                </div>
                <div className='mt-4 md:mt-6 lg:mt-8'>
                    <TableContainer >
                        <Table variant='striped' colorScheme='orange'>
                            <Thead>
                                <Tr>
                                    <Th>S.No</Th>
                                    <Th>Date</Th>
                                    <Th>Name</Th>
                                    <Th>Email Id</Th>
                                    <Th>Mobile</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    data?.length > 0 ?
                                        data?.map((item, index) => {
                                            return (
                                                <Tr key={item._id}>
                                                    <Td>{index + 1}</Td>
                                                    <Td>{formatCreatedAtDate(item.createdAt)}</Td>
                                                    <Td>{item.name}</Td>
                                                    <Td>{item.email}</Td>
                                                    <Td>{item.mobile}</Td>
                                                    <Td onClick={() => deletebtn(item._id)}>{<RiDeleteBin3Line className='text-xl text-red-600 cursor-pointer' />}</Td>
                                                </Tr>
                                            )
                                        }) :
                                        <Tr>
                                            <Th>No Data found</Th>
                                        </Tr>
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>
            </div >

        </div>
    )
}

export default ChatBotLeads
