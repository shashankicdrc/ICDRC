'use client'
import React, { useEffect } from 'react'
// import { useSelector } from 'react-/redux';
// import { useNavigate } from 'react-router-dom';
import AdminNav from '../components/navbar/page';

const Home = () => {
    // const navigate = useNavigate();
    // const admin = useSelector((state) => state.admin);

    // useEffect(() => {
    //     if (!admin._id) {
    //         navigate('/en/ICDRC/loginAdmin')
    //     }
    // }, [navigate, admin])


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className='bg-gradient-to-r from-orange-300 to-red-300 min-h-screen'>
            <AdminNav />

            <div
                className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
                style={{ backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)`, height: '300px' }}>
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                    <div className="flex h-full items-center justify-center flex-col">
                        <h2 className=" mt-4 text-white text-3xl text-center md:text-5xl font-semibold" data-aos="fade-up" data-aos-duration="2000">
                            Welcome back, 
                        </h2>
                    </div>
                </div>
            </div>

            <div className='bg-white w-11/12 md:w-3/5 lg:w-2/5 border-2 border-gray-400 mx-auto my-8 px-3 py-2 rounded-xl'>
                <h2 className='text-xl text-center font-semibold mx-auto font-[Poppins]' data-aos="fade-up" data-aos-duration="2000">User Information</h2>
                <h2 className='mt-8 text-md font-semibold font-[Poppins]' data-aos="fade-up" data-aos-duration="2000">Name : <span className='text-orange-500 font-[Signika+Negative] ml-3 md:ml-8'>name</span></h2>
                <h2 className='mt-3 text-md font-semibold font-[Poppins]' data-aos="fade-up" data-aos-duration="2000">Email Id : <span className='text-orange-500 font-[Signika+Negative] ml-3 md:ml-8'>email</span></h2>
                <h2 className='mt-3 text-md font-semibold font-[Poppins]' data-aos="fade-up" data-aos-duration="2000">Current Position : <span className='text-orange-500 font-[Signika+Negative] ml-3 md:ml-8'>role</span></h2>
                <div className='grid place-items-center' data-aos="fade-up" data-aos-duration="2000">
                    <button className='mt-8 text-center text-sm font-semibold border-2 border-orange-500 px-2 py-1 rounded-xl cursor-pointer  text-orange-500 hover:text-white hover:bg-orange-500 transition-all ease-in-out duration-300'>Change Password</button>
                </div>
            </div>

        </div>
    )
}

export default Home
