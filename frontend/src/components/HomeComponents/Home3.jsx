import { useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

const Home3 = () => {
    const swiperRefLocal = useRef()

    const handleMouseEnter = () => {
        swiperRefLocal?.current?.swiper?.autoplay?.stop()
    };

    const handleMouseLeave = () => {
        swiperRefLocal?.current?.swiper?.autoplay?.start()
    };
    return (
        <div className="bg-gradient-to-r from-orange-200 to-orange-400 px-4 md:px-8 py-6 my-4">
            {/* Desktop View */}
            <h1
                className="text-3xl md:text-6xl font-[Roboto] font-bold text-center px-8"
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                Are You Facing Any of These ?
            </h1>

            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="py-6 lg:flex justify-center items-center hidden"
            >
                <Swiper
                    ref={swiperRefLocal}
                    slidesPerView={3}
                    spaceBetween={30}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    grabCursor={true}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                >
                    <SwiperSlide className="bg-white rounded-xl px-4 py-6">
                        <div className="flex justify-around items-center">
                            <h1
                                className="text-gray-800 capitalize text-md font-semibold tracking-widest "
                            >
                                Claim is denied/Repudiated
                            </h1>
                            <Image
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                width={110}
                                height={100}
                                src="/images/facing/Claim Denied.png"
                                alt="claimDenied"
                            />

                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-white rounded-xl px-4 py-6">
                        <div className="flex justify-around items-center">
                            <h1
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                className="text-gray-800 capitalize  text-md font-semibold tracking-widest "
                            >
                                Short payment/less payment
                            </h1>
                            <Image
                                className="h-28 w-28"
                                src="/images/facing/Short Payment.png"
                                alt="Person"
                                width={120} // Add the width property
                                height={120}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-white rounded-xl px-4 py-6">
                        <div className="flex justify-around items-center">
                            <h1
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                className="text-gray-800 capitalize  text-md font-semibold tracking-widest "
                            >
                                Claim is delayed/No progress
                            </h1>
                            <Image
                                src='/images/facing/Claim Delayed.png'
                                alt="Person"
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                width={120}
                                height={120}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-white rounded-xl px-4 py-6">
                        <div className="flex justify-around items-center">
                            <h1
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                className="text-gray-800 text-md font-semibold tracking-widest "
                            >
                                No survey/Surveyor is nor appointed
                            </h1>
                            <Image
                                className="object-cover h-28 w-28"
                                src="/images/facing/No surveyor.png"
                                alt="Person"
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                width={120} // Add the width property
                                height={120}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-white rounded-xl px-4 py-6">
                        <div className="flex justify-around items-center">
                            <h1
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                className="text-gray-800  text-md font-semibold tracking-widest "
                            >
                                Mis-selling of policy
                            </h1>
                            <Image
                                className="object-cover h-28 w-28"
                                src="/images/facing/mis-selling.png"
                                alt="Person"
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                width={120} // Add the width property
                                height={120}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-white rounded-xl px-4 py-6">
                        <div className="flex justify-around items-center">
                            <h1
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                className="text-gray-800  text-md font-semibold tracking-widest "
                            >
                                Policy document not received
                            </h1>
                            <Image
                                className="object-cover h-28 w-28"
                                src="/images/facing/Policy.png"
                                alt="Person"
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                width={120} // Add the width property
                                height={120}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-white rounded-xl px-4 py-6">
                        <div className="flex justify-around items-center">
                            <h1
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                className="text-gray-800 capitalize  text-md font-semibold tracking-widest "
                            >
                                No Claim Bonus related issue
                            </h1>
                            <Image
                                className="object-cover h-28 w-28"
                                src="/images/facing/Noclaim.png"
                                alt="Person"
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                width={120} // Add the width property
                                height={120}
                            />
                        </div>
                    </SwiperSlide>

                    <div className="text-white opacity-0 mt-4">...</div>
                </Swiper>
            </div>

            {/* Mobile View */}
            <div className="mt-4 flex justify-center items-center lg:hidden">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    grabCursor={true}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                >
                    <SwiperSlide className="bg-white rounded-xl px-4 py-6">
                        <div className="flex justify-around items-center flex-col">
                            <h1
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                className="text-gray-800  text-md font-semibold tracking-widest "
                            >
                                Claim is Denied/Reputed
                            </h1>
                            <Image
                                className="object-cover h-20 w-20"
                                src="/images/facing/ShortPayment.png"
                                alt="Person"
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                width={28} // Add the width property
                                height={28}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-white rounded-xl px-4 py-6">
                        <div className="flex justify-around items-center flex-col">
                            <h1
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                className="text-gray-800  text-md font-semibold tracking-widest "
                            >
                                Short payment/less payment
                            </h1>
                            <Image
                                className="object-cover h-20 w-20"
                                src="/images/facing/ShortPayment.png"
                                alt="Person"
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                width={28} // Add the width property
                                height={28}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-white rounded-xl px-4 py-6">
                        <div className="flex justify-around items-center flex-col">
                            <h1
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                className="text-gray-800 text-md font-semibold tracking-widest "
                            >
                                Claim is delayed/No progress
                            </h1>
                            <Image
                                className="object-cover h-20 w-20"
                                src="/images/facing/ClaimDelayed.png"
                                alt="Person"
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                width={120} // Add the width property
                                height={120}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-white rounded-xl px-4 py-6">
                        <div className="flex justify-around items-center flex-col">
                            <h1
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                className="text-gray-800 capitalize text-md font-semibold tracking-widest"
                            >
                                No survey/Surveyor is nor appointed
                            </h1>
                            <Image
                                className="object-cover h-20 w-20"
                                src="/images/facing/Nosurveyor.png"
                                alt="Person"
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                width={28} // Add the width property
                                height={28}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-white rounded-xl px-4 py-6">
                        <div className="flex justify-around items-center flex-col">
                            <h1
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                className="text-gray-800 capitalize text-md font-semibold tracking-widest "
                            >
                                Mis-Selling Of Policy
                            </h1>
                            <Image
                                className="object-cover h-20 w-20"
                                src='/image/facing/mis-selling.png'
                                alt="Person"
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                width={120} // Add the width property
                                height={120}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-white rounded-xl px-4 py-6">
                        <div className="flex justify-around items-center flex-col">
                            <h1
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                className="text-gray-800 capitalize text-md font-semibold tracking-widest "
                            >
                                Policy Document Not Received
                            </h1>
                            <Image
                                className="object-cover h-20 w-20"
                                src="/images/facing/Policy.png"
                                alt="Person"
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                width={120} // Add the width property
                                height={120}
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="bg-white rounded-xl px-4 py-6">
                        <div className="flex justify-around items-center flex-col">
                            <h1
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                className="text-gray-800 capitalize text-md font-semibold tracking-widest "
                            >
                                No Claim Bonus related issue
                            </h1>
                            <Image
                                className="object-cover h-20 w-20"
                                src='/images/facing/Noclaim.png'
                                alt="Person"
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                width={120} // Add the width property
                                height={120}
                            />
                        </div>
                    </SwiperSlide>

                    <div className="text-white opacity-0 mt-4">...</div>
                </Swiper>
            </div>
        </div>
    );
};

export default Home3;
