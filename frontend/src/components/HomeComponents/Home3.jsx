import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import '../../styles/module.home3.css';

const Home3 = () => {
    const swiperRefLocal = useRef();

    const handleMouseEnter = () => {
        swiperRefLocal?.current?.swiper?.autoplay?.stop();
    };

    const handleMouseLeave = () => {
        swiperRefLocal?.current?.swiper?.autoplay?.start();
    };

    const sliderData = [
        {
            text: 'Claim is denied/Repudiated',
            imgSrc: '/images/facing/Denied.png',
            imgAlt: 'Claim Denied Image',
        },
        {
            text: 'Short payment/less payment',
            imgSrc: '/images/facing/ShortPayment.png',
            imgAlt: 'Short Payment Image',
        },
        {
            text: 'Claim is delayed/no progress',
            imgSrc: '/images/facing/Delayed.png',
            imgAlt: 'Claim Delayed Image',
        },
        {
            text: 'No survey/Surveyor is not appointed',
            imgSrc: '/images/facing/Surveyor.png',
            imgAlt: 'No Surveyor Image',
        },
        {
            text: 'Mis-selling of policy',
            imgSrc: '/images/facing/Mis.png',
            imgAlt: 'Mis Selling Policy Image',
        },
        {
            text: 'Policy document not received',
            imgSrc: '/images/facing/Policy.png',
            imgAlt: 'Policy Document Image',
        },
        {
            text: 'No Claim Bonus related issue',
            imgSrc: '/images/facing/Noclaim.png',
            imgAlt: 'No Claim Image',
        },
    ];

    return (
        <div className="home3-bg px-4 md:px-8 py-6 my-4">
            <h1
                className="text-3xl md:text-6xl font-[Roboto] font-bold text-center px-8"
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                Are You Facing Any of These ?
            </h1>

            <div
                className="py-6 flex justify-center items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Swiper
                    ref={swiperRefLocal}
                    spaceBetween={30}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    loop={true}
                    grabCursor={true}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper text-gray-800 capitalize font-semibold"
                >
                    {sliderData.map((item, index) => (
                        <SwiperSlide
                            key={index}
                            className="bg-white h-36 p-5 rounded-md"
                        >
                            <div className="flex items-center justify-between space-x-4">
                                <h4 className="flex-1">{item.text}</h4>
                                <div className="w-24 h-24 relative">
                                    <Image
                                        src={item.imgSrc}
                                        alt={item.imgAlt}
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                    <div className="text-white opacity-0 mt-4">...</div>
                </Swiper>
            </div>
        </div>
    );
};

export default Home3;
