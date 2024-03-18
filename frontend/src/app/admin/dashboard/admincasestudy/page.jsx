'use client';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminNav from '../../components/navbar/page'
import { useEffect } from 'react';
// import JoditEditor from "jodit-pro-react";
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { url } from '../../../api';
import PageLoader from '../../components/pageloader/page';
import { RiDeleteBin3Line } from 'react-icons/ri'
import Image from 'next/image';


const AdminCaseStudy = () => {

    const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
    const router = useRouter();
    const admin = useSelector((state) => state.admin);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [desc, setDesc] = useState('');
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!admin._id) {
            router.push('/admin/loginAdmin')
        }
    }, [router, admin])


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${url}/api/handlecasestudy`)
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

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${url}/api/handlecasestudy`)
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
        getData();
    }, [admin.token])


    const HandleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (content.length > 5) {
            // console.log({ name, image, desc, content })
            try {
                const res = await axios.post(`${url}/api/handlecasestudy`, {
                    name, image, desc, content
                }, {
                    headers: {
                        Authorization: admin.token,
                        'Content-Type': 'application/json',
                    }
                })
                if (res.data.success) {
                    toast.success(res.data.message);
                    setName('');
                    setImage('');
                    setDesc('');
                    setContent('');
                }
                getData();
            }
            catch (err) {
                if (err?.response?.data?.message) {
                    toast.error(err?.response?.data?.message);
                }
                if (err?.response?.statusText) {
                    toast.error(err?.response?.statusText);
                }
            }
        }
        else {
            toast.error("Complete all details.")
        }
        setLoading(false);
    }

    const deletebtn = async (id) => {
        try {
            const res = await axios.delete(`${url}/api/handlecasestudy/${id}`, {
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
            {loading && <PageLoader />}
            <AdminNav />

            <div
                className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
                style={{ backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)`, height: '250px' }}>
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                    <div className="flex h-full items-center justify-end flex-col">
                        <h2 className=" mb-4 md:mb-8 text-white text-3xl text-center md:text-5xl font-semibold" data-aos="fade-up" data-aos-duration="2000">
                            Manage Case - Studies
                        </h2>
                    </div>
                </div>
            </div>

            <div className="border-2 bg-white border-gray-400 my-4 mx-4 md:px-3 py-2 md:py-4 rounded-md" data-aos="zoom-in" data-aos-duration="2000">
                <h2 className="text-center border-b-2 border-gray-700 font-bold text-gray-900 text-3xl p-4">
                    Add New Case Study
                </h2>

                <div className="flex flex-col justify-center items-center my-4">
                    <form onSubmit={HandleSubmit} className="bg-white mb-4 w-4/5">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Title
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={name} onChange={(e) => setName(e.target.value)} id="name" name='name' type="text" placeholder="Title" required={true} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                                Image Url
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" value={image} onChange={(e) => setImage(e.target.value)} name='image' type="url" placeholder="Image Url" required={true} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desc">
                                Short Description
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxLength={300} id="desc" name='desc' type="text" required={true} placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                                Content
                            </label>
                            {/* <JoditEditor

                                ref={editor}
                                value={content}
                                onChange={newContent => setContent(newContent)}
                            /> */}
<JoditEditor
    ref={editor}
    value={content}
    tabIndex={1} // tabIndex of textarea
    onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
    onChange={(newContent) => setContent(newContent)}
  />

                            
                        </div>

                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div >

            <div className="border-2 bg-white border-gray-400 my-4 mx-4 md:px-3 py-2 md:py-4 rounded-md" data-aos="zoom-in" data-aos-duration="2000">
                <h2 className="text-center border-b-2 border-gray-700 font-bold text-gray-900 text-3xl p-4">
                    All Case Studies
                </h2>
                <div className="grid gap-8 mt-5 md:mt-10 mx-4 md:mx-12 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
                    {
                        data?.length > 0 ?
                            data.map((item) => (
                                <div key={item._id} className="overflow-hidden border-2 border-orange-500 transition-shadow duration-300 bg-white rounded-2xl shadow-lg px-4 py-3" data-aos="zoom-in" data-aos-duration="1000">
                                    <Link href={`/casestudies/${item._id}`} aria-label="Article">
                                        <Image
                                            src={item.image}
                                            className="object-cover w-full h-40 md:h-60 rounded-2xl"
                                            alt=""
                                            width={640}
                                            height={360}
                                        />
                                    </Link>
                                    <div className="py-5">
                                        <Link href={`/casestudies/${item._id}`} aria-label="Article">
                                            <p className="text-2xl font-semibold font-[Poppins] text-orange-600">{item.name}</p>

                                            <p className="mb-4 text-gray-900 text-xl font-[Poppins]">
                                                {item.desc}
                                            </p>
                                        </Link>
                                        <p className="mb-2 text-xl text-red-600 flex justify-between">
                                            <span className='font-[Poppins]'>Created on: {formatCreatedAtDate(item.createdAt)}</span>
                                            <button onClick={() => deletebtn(item._id)} className='text-red-500 text-xl'><RiDeleteBin3Line /></button>
                                        </p>
                                    </div>

                                </div>
                            ))
                            :
                            <span className='font-semibold font-[Poppins] text-xl md:text-2xl'>No Case Study available.</span>
                    }
                </div>
            </div >

        </div >
    )
}

export default AdminCaseStudy