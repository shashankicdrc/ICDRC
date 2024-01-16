import React, { useEffect } from 'react'
import HomeNav from './../../components/Navbar/HomeNav';
import { Link } from 'react-router-dom';
import Home7Contact from './../../components/HomeComponents/Home7Contact/Home7Contact';
import Footer from './../../components/Footer/Footer';
import SocialIcons from './../../components/SocialIcons/SocialIcons';

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div>
            <SocialIcons />
            <HomeNav />

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
                            <Link to="/register" data-aos="fade-up" data-aos-duration="2000" className="relative max-w-max ml-4 mt-4 inline-flex items-center px-12 py-3 overflow-hidden text-lg text-orange-500 font-bold border-2 border-orange-500 rounded-full hover:text-white group hover:bg-gray-50">
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

            <h1 className='text-gray-900 text-3xl mt-6 md:mt-8 md:text-6xl font-[Roboto] font-bold text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent px-8' data-aos="fade-up" data-aos-duration="1000">ABOUT US</h1>
            <p className='text-gray-700 text-center font-medium text-md py-2  tracking-widest mx-auto px-8' data-aos="fade-up" data-aos-duration="1000">
                Insurance Claims and Dispute Resolution Center (ICDRC)
            </p>


            <p className='text-gray-700 font-medium text-md py-4  tracking-widest mx-auto px-8' data-aos="fade-up" data-aos-duration="1000">
                ICDRC is a company that specializes in helping people get the money they deserve from their insurance companies. Our team of experienced professionals will work with you to understand your claim and fight for your rights. We will never give up until you get the settlement you deserve.
            </p>

            <p className='text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8' data-aos="fade-up" data-aos-duration="1000">
                We understand that filing an insurance claim can be a daunting task. That's why we make it our mission to make the process as easy as possible for you. We will handle all the paperwork and communication with your insurance company, so you can focus on returning your life to normal. We have a team of experts who are familiar with the insurance industry and can help you get the best possible outcome for your claim.
            </p>

            <p className='text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8' data-aos="fade-up" data-aos-duration="1000">
                We are committed to getting you the maximum settlement possible. We will use our expertise and experience to negotiate on your behalf and fight for every penny you deserve. We will not rest until you are satisfied with the outcome of your claim.
            </p>


            <p className='text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8' data-aos="fade-up" data-aos-duration="1000">
                o	ICDRC can help you get your claim settled faster
            </p>
            <p className='text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8' data-aos="fade-up" data-aos-duration="1000">
                o	ICDRC has the expertise and experience to navigate the claims process and get you the best possible outcome.
            </p>
            <p className='text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8' data-aos="fade-up" data-aos-duration="1000">
                o	ICDRC can take the stress out of the claims process so you can focus on your recovery or other important matters.
            </p>

            <Home7Contact />
            <Footer />
        </div>
    )
}

export default About
