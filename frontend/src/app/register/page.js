
"use client";

import { useEffect } from 'react';

import Link from 'next/link';
import HomeNav from '../../components/Navbar/page';
import Home7Contact from '../../components/HomeComponents/Home7Contact';
import Footer from '../../components/footer/page';
import SocialIcons from '../../components/SocialIcons/page';
import TabSection from './tabsection';


const Register = () => {
    useEffect(() => {
        // Client-specific code: use window.scrollTo only on the client side
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
    }, []);
    return (
        <div className='overflow-x-hidden'>
            <SocialIcons />
            <HomeNav />


            {/* <Helmet>
        <meta charSet="utf-8" />
        <title>ICDRC: Register Complaint</title>
        <link rel="canonical" href="" />
        <meta
          name="description"
          content="Connect with us, submit your complaint, client satisfaction. Witness our commitment to transparent processes and empowering individuals in their insurance claim experiences. "
        />
        <meta
          name="keywords"
          content="Complaint Section, register your complain, reliable insurance solutions, Our Success stories, ICDRC, successful claims, Insurance recovery, ICDRC official Claim advocates, Fast insurance settlements, InsuranceSamadhan Alternative"
        />
      </Helmet> */}

            <div
                className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
                style={{ backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)`, height: '500px' }}>
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                    <div className="mt-6 md:mt-10 flex h-full items-center justify-start md:ml-12 ml-3">
                        <div className="text-white flex justify-start flex-col">
                            <h2 className="mb-4 text-3xl md:text-5xl font-semibold text-start px-4 md:px-4" data-aos="fade-up" data-aos-duration="2000">
                                India’s most reliable and single<br /> window solution platform.
                            </h2>
                            <Link href="/register" data-aos="fade-up" data-aos-duration="2000" className="relative max-w-max ml-4 mt-4 inline-flex items-center px-12 py-3 overflow-hidden text-lg text-orange-500 font-bold border-2 border-orange-500 rounded-full hover:text-white group hover:bg-gray-50">
                                <span className="absolute left-0 block w-full h-0 transition-all bg-orange-400 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span className="relative">Register Complaint</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className='text-gray-900 text-3xl mt-6 md:mt-8 md:text-6xl font-[Roboto] font-bold text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent px-8' data-aos="fade-up" data-aos-duration="1000">
                REGISTER COMPLAINT
            </h1>
            <p className='text-gray-700 text-center font-medium text-md py-2  tracking-widest mx-auto px-8' data-aos="fade-up" data-aos-duration="1000">
                At ICDRC, we're committed to safeguarding what matters most to you, providing reliable insurance solutions for a worry-free future.
            </p>

            {/* <ComplainForm /> */}
            <TabSection />

            <Home7Contact />
            <Footer />
        </div>
    )
}

export default Register