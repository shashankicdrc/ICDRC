import React from 'react'
import './Home7Contact.css'
import { Link } from 'react-router-dom'

const Home7Contact = () => {
    return (
        <div className='my-2 md:pt-4 mb-8'>
            <h1 className='text-gray-900 text-3xl md:text-6xl font-[Roboto] font-bold text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent px-8' data-aos="fade-up" data-aos-duration="1000">REACH OUT TO US</h1>
            <p className='text-gray-700 text-center font-medium text-md py-2  tracking-widest mx-auto px-8' data-aos="fade-up" data-aos-duration="1000">
            ICDRC, we're here to help you with insurance claims and disputes. We're committed to protecting what matters most to you and providing reliable insurance solutions for a worry-free future.
            </p>

            <div className='flex justify-center items-center md:items-start flex-col md:flex-row gap-4 px-4 md:pl-8 md:pr-20 py-4'>
                <img src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1690786180/Home_page/Home7/bgimg_pz7wbz.png" alt="" className='w-4/5 md:w-2/5 bg-cover' data-aos="fade-up" data-aos-duration="1000" />

                <div>
                    <p className='mt-4 text-gray-800 font-normal text-md tracking-wide font-[Rubik]' data-aos="fade-up" data-aos-duration="1000">
                        One Stop Solution For Insurance Claim Disputes!
                        <br className='mt-2' />
                        We're your trusted partner for insurance claims and dispute resolution! If you need expert guidance on insurance claims or resolving disputes, partner with us for a smooth experience. Our team of experienced professionals is ready to support you at every step.
                        <br className='mt-2' />
                        If you're facing an insurance dispute, register your complaint with us now. Our skilled negotiators will work to find a fair solution for you.
                        <br className='mt-2' />
                        Choose ICDRC for transparent, understanding, and effective insurance services. Click below to get started!






                    </p>

                    <div className='mt-4 md:mt-8 flex justify-between gap-4 flex-col md:flex-row' data-aos="fade-up" data-aos-duration="1000" >
                        <Link to='/register' className="b relative mx-auto h-16 w-64 flex justify-center items-center">
                            <div className="i h-16 w-64 bg-orange-500 items-center rounded-xl shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 hover:bg-blue-500 transition duration-300 ease-out">
                            </div>
                            <div  className="text-center text-white font-semibold z-10 pointer-events-none">Register Complaint</div>
                            <span className="absolute flex h-6 w-6 top-0 right-0 transform translate-x-2.5 -translate-y-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                                <span className="absolute inline-flex rounded-full h-6 w-6 bg-blue-500"></span>
                            </span>
                        </Link>

                        <Link to='/partner' className="b animate-pulse mx-auto h-16 w-64 flex justify-center items-center">
                            <div className="i h-16 w-64 bg-pink-600 items-center rounded-2xl shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
                            </div>
                            <div className="text-center text-white font-semibold z-10 pointer-events-none">Partner With Us</div>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home7Contact
