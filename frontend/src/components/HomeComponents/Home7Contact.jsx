'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';

const Home7Contact = () => {
    return (

        <Fragment>
            <div className="text-center mb-4">
                <h1 className="text-5xl capitalize font-bold">Reach out to us</h1>
            </div>

            <div className="grid gap-5 grid-cols-1 lg:grid-cols-7 mx-5 lg:mx-10 items-center">
                <div className="lg:col-span-3 flex justify-center">
                    <Image
                        src="/images/myreachout.webp"
                        width={500}
                        height={500}
                        className="w-full lg:w-3/4"
                        alt="reach-out pic"
                    />
                </div>
                <div className="px-4 py-3 lg:col-span-4 space-y-4 text-justify">
                    <p>
                        ICDRC, we're here to help you with insurance claims and disputes. We're committed to protecting what matters most to you and providing reliable insurance solutions for a worry-free future.
                    </p>
                    <p>
                        We're your trusted partner for insurance claims and dispute resolution! If you need expert guidance on insurance claims or resolving disputes, partner with us for a smooth experience. Our team of experienced professionals is ready to support you at every step.
                    </p>
                    <p>
                        If you're facing an insurance dispute, register your complaint with us now. Our skilled negotiators will work to find a fair solution for you.
                    </p>
                    <p>
                        Choose ICDRC for transparent, understanding, and effective insurance services. Click below to get started!
                    </p>

                    <div className="mt-4 lg:mt-8 flex flex-col lg:flex-row justify-between gap-4" data-aos="fade-up" data-aos-duration="1000">
                        <Link href='/register' className="relative mx-auto h-16 w-64 flex justify-center items-center">
                            <div className="h-16 w-64 bg-orange-500 rounded-xl shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 hover:bg-blue-500 transition duration-300 ease-out"></div>
                            <div className="text-center text-white font-semibold z-10 pointer-events-none">Register Complaint</div>
                            <span className="absolute flex h-6 w-6 top-0 right-0 transform translate-x-2.5 -translate-y-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                                <span className="absolute inline-flex rounded-full h-6 w-6 bg-blue-500"></span>
                            </span>
                        </Link>

                        <Link href='/partner' className="animate-pulse mx-auto h-16 w-64 flex justify-center items-center">
                            <div className="h-16 w-64 bg-pink-600 rounded-2xl shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"></div>
                            <div className="text-center text-white font-semibold z-10 pointer-events-none">Partner With Us</div>
                        </Link>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Home7Contact
