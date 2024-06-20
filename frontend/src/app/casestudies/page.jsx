"use client";
import React, { useEffect } from "react";
import HomeNav from "../../components/Navbar/page";
import Link from "next/link";
import Footer from "../../components/footer/page";
import SocialIcons from "../../components/SocialIcons/page";
import { useSelector } from "react-redux";
import Image from "next/image";
import Home7Contact from "../../components/HomeComponents/Home7Contact";

const CaseStudies = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const casestudy = useSelector((state) => state.casestudy);
    return (
        <div>
            <SocialIcons />
            <HomeNav />

            {/* Header Section */}
            <div
                className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
                style={{
                    backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)`,
                    height: "250px",
                }}
            >
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                >
                    <div className="flex h-full items-center justify-end flex-col">
                        <h2
                            className=" mb-4 md:mb-8 capitalize text-white text-3xl text-center md:text-6xl font-semibold"
                            data-aos="fade-up"
                            data-aos-duration="2000"
                        >
                            case studies
                        </h2>
                    </div>
                </div>
            </div>

            <div
                className=" bg-white my-4 mx-4 md:px-3 py-2 md:py-4 rounded-md"
                data-aos="zoom-in"
                data-aos-duration="2000"
            >
                <div className="grid gap-8 mt-5 md:mt-10 mx-4 md:mx-12 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
                    {casestudy.data?.length > 0 ? (
                        casestudy.data.map((item) => (
                            <div
                                key={item._id}
                                className="overflow-hidden border-2 border-orange-500 transition-shadow duration-300 bg-white rounded-2xl shadow-lg px-4 py-3"
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                            >
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
                                        <p className="text-2xl font-semibold font-[Poppins] text-orange-600">
                                            {item.name}
                                        </p>

                                        <p className="mb-4 text-gray-900 text-m font-[Poppins]">
                                            {item.desc}
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <span className="font-semibold font-[Caveat] text-xl md:text-2xl">
                            No Case Study available.
                        </span>
                    )}
                </div>
            </div>
            <Home7Contact />
            <Footer />
        </div>
    );
};

export default CaseStudies;
