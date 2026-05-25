'use client';
import { useEffect } from 'react';
import HomeNav from '../../components/Navbar/page';
import Link from 'next/link';
import Footer from '../../components/footer/page';
import SocialIcons from '../../components/SocialIcons/page';
import Image from 'next/image';
import TeamExperts from '../../components/about/TeamExperts';

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <SocialIcons />
            <HomeNav />
            <div
                className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
                style={{
                    backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)`,
                    height: '500px',
                }}
            >
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                >
                    <div className="mt-6 md:mt-10 flex h-full items-center justify-start md:ml-12 ml-3">
                        <div className="text-white flex justify-start flex-col">
                            <h2
                                className="mb-4 text-3xl md:text-5xl font-semibold text-start px-4 md:px-4"
                                data-aos="fade-up"
                                data-aos-duration="2000"
                            >
                                India’s most reliable and single
                                <br /> window solution platform
                            </h2>
                            <Link
                                href="/#subscription"
                                data-aos="fade-up"
                                data-aos-duration="2000"
                                className="relative max-w-max ml-4 mt-4 inline-flex items-center px-12 py-3 overflow-hidden text-lg text-orange-500 font-bold border-2 border-orange-500 rounded-full hover:text-white group hover:bg-gray-50"
                            >
                                <span className="absolute left-0 block w-full h-0 transition-all bg-orange-400 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        ></path>
                                    </svg>
                                </span>
                                <span className="relative">Subscribe Now</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <h1
                className="text-gray-900 text-3xl mt-6 md:mt-8 md:text-5xl font-bold text-center px-8"
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                About Us
            </h1>

            <div className="grid gap-5 grid-cols-1 lg:grid-cols-7 mx-5 mt-2 mb-5 lg:mx-10 items-center">
                <div className="lg:col-span-3 flex justify-center">
                    <Image
                        src="/images/aboutus.webp"
                        width={500}
                        height={500}
                        className="w-full lg:w-3/4"
                        alt="commitment pic"
                    />
                </div>
                <div className="px-4 lg:col-span-4 space-y-4 text-justify py-5 text-xl">
                    <p data-aos="fade-up" data-aos-duration="1000">
                        The Insurance Claims Dispute Resolution Centre (ICDRC)
                        is a specialised institutional platform dedicated
                        exclusively to the mediation of insurance claims
                        disputes.
                    </p>
                    <p data-aos="fade-up" data-aos-duration="1000">
                        ICDRC offers a structured, neutral, and confidential
                        environment for resolving insurance disputes through
                        expert-led mediation, reducing the need for prolonged
                        litigation and ensuring balanced outcomes.
                    </p>
                </div>
            </div>
            <div className="h-1 border-t  my-5  w-full"></div>
            <TeamExperts />
            <div className="h-1 border-t  my-5  w-full"></div>
            <Footer />
        </div>
    );
};

export default About;
