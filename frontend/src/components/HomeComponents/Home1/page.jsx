import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Image from 'next/image'
import Link from "next/link";
import { Pagination, Autoplay, Keyboard } from "swiper/modules";

const Home1 = () => {
    return (
        <div className="w-full pt-12"> {/* Adjust padding to account for the fixed header */}
            <Swiper
                modules={[Autoplay, Pagination, Keyboard]}
                slidesPerView={1}
                spaceBetween={0}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 4000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                }}
                loop={true}
                grabCursor={true}
                centeredSlides={true}
                className="w-full"
            >
                <SwiperSlide>
                    <div className="relative overflow-hidden rounded-sm p-4 md:p-12 text-center flex flex-col md:flex-row items-center" style={{ minHeight: "720px" }}>
                        <div className="w-full md:w-1/2 order-2 md:order-1 flex justify-center md:justify-start mb-8 md:mb-0">
                            <div className="flex flex-col w-full px-2 text-left">
                                <h2 className="mb-4 text-4xl md:text-5xl font-semibold" data-aos="fade-up" data-aos-duration="2000">
                                    Share your insurance claim & be assured that your claim is handled by a qualified insurance professional
                                </h2>
                                <ComplaintButton />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center md:justify-end mb-8 md:mb-0">
                            <Image
                                src="/images/hero/2.webp"
                                alt="Slide Image"
                                width={2000}  // Use the original image width
                                height={2000} // Use the original image height
                                className="w-full h-full"
                                style={{ maxHeight: '100%' }}
                            />
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative overflow-hidden rounded-sm p-4  md:p-12 text-center flex flex-col md:flex-row items-center" style={{ minHeight: "720px" }}>
                        <div className="w-full md:w-1/2 order-2 md:order-1 flex justify-center md:justify-start mb-8 md:mb-0">
                            <div className="flex flex-col w-full px-2 text-left">
                                <h2 className="mb-4 text-4xl md:text-5xl font-semibold" data-aos="fade-up" data-aos-duration="2000">
                                    We're the insurance claim settlement company that fights for you
                                </h2>
                                <ComplaintButton />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center md:justify-end mb-8 md:mb-0">
                            <Image
                                src="/images/hero/4.webp"
                                alt="Slide Image"
                                width={2000}
                                height={2000}
                                className="w-full h-full"
                                style={{ maxHeight: '100%' }}
                            />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative overflow-hidden rounded-sm p-4 md:p-12 text-center flex flex-col md:flex-row items-center" style={{ minHeight: "720px" }}>
                        <div className="w-full md:w-1/2 order-2 md:order-1 flex justify-center md:justify-start mb-8 md:mb-0">
                            <div className="flex flex-col w-full px-2 text-left">
                                <h2 className="mb-4 text-4xl md:text-5xl font-semibold" data-aos="fade-up" data-aos-duration="2000">
                                    We'll get you the money <br /> you deserve
                                </h2>
                                <ComplaintButton />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center md:justify-end mb-8 md:mb-0">
                            <Image
                                src="/images/hero/Hero 3.webp"
                                alt="Slide Image"
                                width={2000}
                                height={2000}
                                className="w-full h-full"
                                style={{ maxHeight: '100%' }}
                            />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative overflow-hidden rounded-sm p-4 md:p-12 text-center flex flex-col md:flex-row items-center" style={{ minHeight: "720px" }}>
                        <div className="w-full md:w-1/2 order-2 md:order-1 flex justify-center md:justify-start mb-8 md:mb-0">
                            <div className="flex flex-col w-full px-2 text-left">
                                <h2 className="mb-4 text-4xl md:text-5xl font-semibold" data-aos="fade-up" data-aos-duration="2000">
                                    Certificate Of Recognition-Startup India                                </h2>
                                <ComplaintButton />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 order-1 md:order-2
                            flex justify-center md:justify-end mt-14 lg:mt-0 2xl:mt-20 mb-8 md:mb-0">
                            <Image
                                src="/images/cert2.png"
                                width={2000}
                                height={2000}
                                alt="Slider Image"
                                className="w-full h-full"
                                style={{ maxHeight: '100%' }}
                            />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>);
};

const ComplaintButton = () => {
    return (
        <Link
            href="/register"
            data-aos="fade-up"
            data-aos-duration="2000"
            className="relative max-w-max ml-4 mt-4 inline-flex items-center px-12 py-3 overflow-hidden text-lg font-bold text-orange-500 border-2 border-orange-500 rounded-full hover:text-white group hover:bg-gray-50"
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
            <span className="relative">Register Complaint</span>
        </Link>

    )
}

export default Home1;
