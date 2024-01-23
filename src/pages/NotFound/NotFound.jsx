import React from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <div className="h-screen w-screen bg-gray-100">

                <div className='w-full grid place-items-center pt-4 md:pt-8'>
                    <img src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1692866749/Logo/Copy_of_ICDRC_912_273_px_rwkrry.png" alt="logo" className="md:cursor-pointer h-20" />
                </div>

                <div className="w-full relative grid place-items-center pt-8 md:pt-16
                 before:pointer-events-none before:absolute before:inset-0 before:block before:h-full before:w-full before:bg-[url('https://res.cloudinary.com/dl5hosmxb/image/upload/v1692869015/404/Untitled_design_wxujrp.png')] before:bg-contain before:bg-no-repeat before:opacity-30 before:bg-center before:mt-56  
                ">
                    <p className='text-8xl font-bold text-orange-600 font-[Roboto]'>404</p>
                    <p className='text-5xl font-semibold text-orange-600 font-[Poppins] mt-4 '>The Page you are looking for is not available.</p>
                    <p className='text-3xl font-semibold text-orange-600 font-[Poppins] mt-4'>You can return back to home page.</p>

                    <Link to="/" className="max-w-max mt-4 md:mt-7 rounded-md px-3.5 py-1 flex justify-center items-center m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-orange-600 text-indigo-600 hover:text-white">
                        <span className="absolute w-64 h-0 transition-all duration-500 origin-center rotate-45 -translate-x-20 bg-orange-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                        <span className="relative text-orange-600 transition text-xl duration-300 group-hover:text-white ease">Go to home</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NotFound