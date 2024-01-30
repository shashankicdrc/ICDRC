'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/Loader/page';
// import { loginAdmin } from '../../../features/AdminSlice';


const Login = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // const dispatch = useDispatch();
    const router = useRouter();
    // const admin = useSelector((state) => state.admin);

    // useEffect(() => {
    //     if (admin._id) {
    //         router.push('/admin/dashboard/home')
    //     }
    // }, [router, admin])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let user = { email, password };
        console.log(user);
        // dispatch(loginAdmin(user)).then(() => {
        //     setLoading(false);
        // });
    }

  return (
    <div>


<div className='overflow-hidden'>
            <div className='' style={{ backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690784022/Home_page/Home1/homeslider2_zzybpj.webp)` }}>
                <div className="fixed bg-gray-900 px-3 py-2 rounded-2xl top-4 left-4">
                    <Link href='/'><Image src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1692866749/Logo/Copy_of_ICDRC_912_273_px_rwkrry.png" alt="logo" className="md:cursor-pointer w-28 md:w-44" width={200} height={80} /></Link>
                </div>
                <div className='flex bg-cover bg-no-repeat justify-center items-center h-screen w-screen px-4 md:px-0' style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                    <div
                        className=" rounded-xl relative mx-auto w-full max-w-md bg-white px-6 pt-10 mt-12 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
                        <div className="w-full">
                            <div className="text-center">
                                <h1 className="text-3xl font-semibold text-gray-900" data-aos="fade-up" data-aos-duration="1000">Admin Panel</h1>
                                <p className="mt-2 text-gray-500" data-aos="fade-up" data-aos-duration="1000">Sign in below to access your account</p>
                            </div>
                            <div className="mt-5" data-aos="fade-up" data-aos-duration="1000">
                            <form onSubmit={handleSubmit}>
                                    <div className="relative mt-6">
                                        <input type="email" name="email" id="email" placeholder="Email Address" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" required={true} autoComplete="on" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <label htmlFor="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                                    </div>
                                    <div className="relative mt-6">
                                        <input type="password" name="password" id="password" placeholder="Password" className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" required={true} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='current-password' />
                                        <label htmlFor="password" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                                    </div>
                                    <div className="my-6">
                                        <button type="submit" className="grid place-items-center w-full rounded-md bg-orange-500 px-3 py-4 text-white focus:bg-orange-700 focus:outline-none">
                                            {loading ? <Loader color="white" /> : "Sign in"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Login