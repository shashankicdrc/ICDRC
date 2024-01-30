import React from 'react'
import './Testimonial.css'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import Vd from '../../../../public/vd.mp4';

const Testimonial = () => {
    return (
        <div className='my-16 py-4 md:py-12 rounded-xl bg-gradient-to-r from-orange-300 to-orange-500 '>

            <div className='py-4 text-white' data-aos="fade-up" data-aos-duration="1000">
                <h1 className='text-3xl md:text-6xl font-[Roboto] font-bold text-center text-white px-8'>CUSTOMER TESTIMONIALS</h1>
                <p className=' text-center font-medium text-md py-2  tracking-widest mx-auto px-8'>
                    At ICDRC, we're committed to safeguarding what matters most to you, providing reliable insurance solutions for a worry-free future.
                </p>
            </div>

            <Swiper
                className="testimonial-slider mySwiper"
                autoplay={{
                    delay: 40000,
                    disableOnInteraction: true,
                }}
                loop={false}
                pagination={{
                    clickable: true,
                }}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                modules={[EffectCoverflow, Autoplay, Pagination]}
            >

                <SwiperSlide className="testimonial-slide bg-white rounded-xl border-2 border-gray-800">
                    <div className="mb-4  p-4 md:mb-0">
                        <div className="mb-6 flex justify-center">
                            <video playsInline autoplay muted controls src={Vd}
                                className="w-full h-fit rounded-md shadow-black shadow-lg dark:shadow-black/20" >


                                </video>
                        </div>
                        <h5 className="mb-2 text-lg font-bold text-orange-600 text-center">Joginder Kumar</h5>
                        <h6 className="mb-4 font-medium text-primary text-orange-500 text-center">
                            Small Business Owner
                        </h6>
                       
                        
                            
                            
                    </div>
                </SwiperSlide>
                <SwiperSlide className="testimonial-slide bg-white rounded-xl border-2 border-gray-800">
                    <div className="mb-4  p-4 md:mb-0">
                        <div className="mb-6 flex justify-center">
                            <video playsInline autoplay muted controls src={Vd}
                                className="w-full h-fit rounded-md shadow-black shadow-lg dark:shadow-black/20" ></video>
                        </div>
                        <h5 className="mb-2 text-lg font-bold text-orange-600 text-center">Joginder Kumar</h5>
                        <h6 className="mb-4 font-medium text-primary text-orange-500 text-center">
                            Small Business Owner
                        </h6>
                       
                        
                            
                            
                    </div>
                </SwiperSlide>
                <SwiperSlide className="testimonial-slide bg-white rounded-xl border-2 border-gray-800">
                    <div className="mb-4  p-4 md:mb-0">
                        <div className="mb-6 flex justify-center">
                            <video playsInline autoplay muted controls src={Vd}
                                className="w-full h-fit rounded-md shadow-black shadow-lg dark:shadow-black/20" ></video>
                        </div>
                        <h5 className="mb-2 text-lg font-bold text-orange-600 text-center">Joginder Kumar</h5>
                        <h6 className="mb-4 font-medium text-primary text-orange-500 text-center">
                            Small Business Owner
                        </h6>
                       
                        
                            
                            
                    </div>
                </SwiperSlide>

                <SwiperSlide className="testimonial-slide bg-white rounded-xl border-2 border-gray-800">
                    <div className="mb-4  p-4 md:mb-0">
                        <div className="mb-6 flex justify-center">
                        <video playsInline autoplay muted controls src={Vd}
                                className="w-full h-fit rounded-md shadow-black shadow-lg dark:shadow-black/20" ></video>
                        </div>
                        <h5 className="mb-2 text-lg font-bold text-orange-600 text-center">Joginder Kumar</h5>
                        
                        <h6 className="mb-4 font-medium text-primary text-orange-500 text-center">
                            Small Business Owner
                        </h6>
                        {/* <p className="mb-4 text-center text-gray-900 font-[Roboto] text-semibold tracking-wide">
                            ICDRC's dedication to resolving my insurance dispute seamlessly was remarkable. Their expertise and personalized approach assured me that my case was in the best hands
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="inline-block w-6">
                                <path fill="currentColor"
                                    d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z" />
                            </svg>
                        </p>
                        <ul className="mb-0 flex justify-center">
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                        </ul> */}
                    </div>
                </SwiperSlide>

                <SwiperSlide className="testimonial-slide bg-white rounded-xl border-2 border-gray-800">
                    <div className="mb-4  p-4 md:mb-0">
                        <div className="mb-6 flex justify-center">
                        <video playsInline muted autoplay controls src={Vd}
                                className="w-full h-fit rounded-md shadow-black shadow-lg dark:shadow-black/20" ></video>
                        </div>
                        <h5 className="mb-2 text-lg font-bold text-orange-600 text-center">Joginder Kumar</h5>
                        
                        <h6 className="mb-4 font-medium text-primary text-orange-500 text-center">
                            Teacher
                        </h6>
                        {/* <p className="mb-4 text-center text-gray-900 font-[Roboto] text-semibold tracking-wide">
                            ICDRC's empathy and exceptional guidance transformed my insurance claim experience. They took the stress off my shoulders and navigated the process effortlessly.
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="inline-block w-6">
                                <path fill="currentColor"
                                    d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z" />
                            </svg>
                        </p>
                        <ul className="mb-0 flex justify-center">
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                        </ul> */}
                    </div>
                </SwiperSlide>

                <SwiperSlide className="testimonial-slide bg-white rounded-xl border-2 border-gray-800">
                    <div className="mb-4  p-4 md:mb-0">
                        <div className="mb-6 flex justify-center">
                        <video playsInline muted autoplay controls src={Vd}
                                className="w-full h-fit rounded-md shadow-black shadow-lg dark:shadow-black/20" ></video>
                        </div>
                        <h5 className="mb-2 text-lg font-bold text-orange-600 text-center">Joginder Kumar</h5>
                        
                        <h6 className="mb-4 font-medium text-primary text-orange-500 text-center">
                            Small Business Owner
                        </h6>
                        {/* <p className="mb-4 text-center text-gray-900 font-[Roboto] text-semibold tracking-wide">
                            ICDRC's dedication to resolving my insurance dispute seamlessly was remarkable. Their expertise and personalized approach assured me that my case was in the best hands
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="inline-block w-6">
                                <path fill="currentColor"
                                    d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z" />
                            </svg>
                        </p>
                        <ul className="mb-0 flex justify-center">
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                        </ul> */}
                    </div>
                </SwiperSlide>
                <SwiperSlide className="testimonial-slide bg-white rounded-xl border-2 border-gray-800">
                    <div className="mb-4  p-4 md:mb-0">
                        <div className="mb-6 flex justify-center">
                        <video playsInline muted autoplay controls src={Vd}
                                className="w-full h-fit rounded-md shadow-black shadow-lg dark:shadow-black/20" ></video>
                        </div>
                        <h5 className="mb-2 text-lg font-bold text-orange-600 text-center">Joginder Kumar</h5>
                        
                        <h6 className="mb-4 font-medium text-primary text-orange-500 text-center">
                            Small Business Owner
                        </h6>
                        {/* <p className="mb-4 text-center text-gray-900 font-[Roboto] text-semibold tracking-wide">
                            ICDRC's dedication to resolving my insurance dispute seamlessly was remarkable. Their expertise and personalized approach assured me that my case was in the best hands
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="inline-block w-6">
                                <path fill="currentColor"
                                    d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z" />
                            </svg>
                        </p>
                        <ul className="mb-0 flex justify-center">
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                        </ul> */}
                    </div>
                </SwiperSlide>


                {/* <SwiperSlide className="testimonial-slide bg-white rounded-xl border-2 border-gray-800">
                    <div className="mb-4  p-4 md:mb-0">
                        <div className="mb-6 flex justify-center">
                            <img src="data:image/png;base64,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" alt=""
                                className="w-32 rounded-full shadow-lg dark:shadow-black/20" />
                        </div>
                        <h5 className="mb-2 text-lg font-bold text-orange-600 text-center">Michael Adams</h5>
                        <h6 className="mb-4 font-medium text-primary text-orange-500 text-center">
                            Software Engineer
                        </h6>
                        <p className="mb-4 text-center text-gray-900 font-[Roboto] text-semibold tracking-wide">
                            ICDRC's expertise in handling complexities and negotiating with my insurer were commendable. Thanks to them, my claim was settled fairly and efficiently.
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="inline-block w-6">
                                <path fill="currentColor"
                                    d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z" />
                            </svg>
                        </p>
                        <ul className="mb-0 flex justify-center">
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                        </ul>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="testimonial-slide bg-white rounded-xl border-2 border-gray-800">
                    <div className="mb-4  p-4 md:mb-0">
                        <div className="mb-6 flex justify-center">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAYFBMVEXm7P9ClP/////p7v/s8P83kP/8/f89kv/u8v/19/8wjf/w9P/i6v/6+//3+f+60v8liv/H2v+Wvv+tyv9npf9Qmv+yzv+FtP92rf+hxP9Il//c5v/R4P99sP9cn/+Quv+TbK+yAAAGA0lEQVRogcWba5u6LBDGMUBRyFNYmWXf/1v+PdRmCsyg9jz3vtjd60p/zTCcZoAc/j+R9Y+Go/5TdnhMpaC9CCHDbyHT44rv4MkOY8GIWVTEnnwfdiqpsoBHKSrTX7CPkrjBLzwRx33ZYYzAfoR0PoYdSi9yL4mhw+wVZCQdZK8jD/SN7JSuRne9Dgh6Jzu09WWsmNPxLrZfcJsVr2KHYgc0IcJuupV93NLSU1HrWGNjpzuRe9lCzsKOMeMnVsrS6Ga23BPdwc1d3cjGRBllQkgphWCYwBBYNtyrGVPF6XnVWl+fp0IxxBM4Nmg1U+drxRMe9ep+V9dMgXSD5Us2NIBTVVdJFEwVJVWtINcv23zBBiKcivMtCZZKbmfhpi+jfc5OAbTSJvJA14Dpat7PZ+yj82nCiiiyoDvP8wJo9aOLHbq/OcsSO7oTz9xwGjrY7hBnmZOMgAs72z1p0gJCd34v3J6LbezQ+RhRFYJdAaNxaGG7/SWvHER3Xr+6xwdmZrunTZrZOte3kszt9dTIdj8jbrDHR6+7A5aa2G5f0TPObNhwuWQDgUY1zuzOcA2M7OGCDZh9z5HoIMjvSMMJzmxWYoJ8FC+BoTWcsaGZE+3y3unAu+Q3GzCbNGhyrwZ4W/jFBrYgtMBGea8EGFjfI+uLDXxRhu5hA/sMraCmbGDaJqzGh1oXbDXEPk7YUKQJjzDvAx1absoJG/jo7mzyYQOLtP3Z49KNYFzetbdXrJ3A1br8Y4O7GuwE+mIDswl5zWY9OwR3fvTu5XNgQO+kwhcbkdtQlQcbWjf1il9sxLaTXj3G8wdiZypebMRHfQY2eFgjY4MTeB4ZpDzmUFTiIBzY0IA6iF3Q65YLKit3HNiotA5tsAuXvEFlqNKBjcuYygfO6/yBfN/ARubwFNJuZJpIDGxkEo+dUPsSeDwdRX3YXbjBcI4LNG92t2CE4BxaJs7YwH5/+nEFwHkLZnw+Lwu92IQSa7alV6KJx7sGNvrjndiT28aYiD+9Uv3ebMKyyux3XgH5ju1swlQZLOk8KBvPAodne48STRkkE9dHPOnIvlUG31h7i4mi1FGe9MojXRbWAq2D7dm/J08yRpsiy7Ki6f9c84bV7PHxVw183cPb2JtEfeaxnSU85u+9JfHrlt2V4tdru+uIX6dORfsakaBqFBV9rcg7YEP0+vzDZVQ1xal8aN22VffTav0oT0WjqFc3Z/h9yR+3KK9tlLxqRG/xJInaa1148AV+PzbU4u61HipT5im0r1bp+o6r1f3tx+B9KGHyXla5de7+TCt5Vd4lTP/bh4INztRZcxD8xnOdEWhuoci8g2jqCgl+46samFM/eQdXvoWp+uZFftNdZcpJvsWeZ6LkVPmkOz5KqpOj0yPya7JYSR7obWF9L5hXZOqa+3p7qih/WIJumlc0Op2dgy3kgR6YF69AHpkqxPYLhvOLYavynUdezCfs3u6ADvp90n1h+nfufh5tInMUfP0URcWsr8/qBjPDRY0vzcDKT9/web3ky3D2XN+zjPCv6s2iTjQ1nD72RXdd/TIJuGV97GM4RWZ1fMQ/cENd8G82Yz9A9/BXmxvroa/1qti5rd9KniPcXAce6t/7RvhUY7Rb6t99uLHzr9AdvB9fbXX/Q4w50rBBBbWed+j+QxxpWK+ondG+/ovb37JjB/ugfspWBxf7UPww1oqDm334WaDn5zlqeX6t/NHYUi5IhnN7l1/Ak8sSZDqvuPs01qEfBo7xnObulpustp1PLfcNuHzZ1nb2vtG+jHAn++A6HOiniM/7NcQ+qN3WyI0NYT9/nu4SccnFfvDfde4eOBmJUJRkjvc77xvEW/eCV+dtB+CexaY9cGULMhz7kJ6MR4AR5NsJutcE36sRpvoIJB6UxiPnnuxu/VoHnrmeoDSdN1/D7jyf3XKs8Ty/nXG3yND3x1R5Q+X2glLBL/Nkd2pKnSeOumCS69I6iG1k93dtsqeu+JjLfTOHXC6/6Wfmvj60kT3wpSrqi26r6tarqlp9qQvluLuzH/utYyyFENL3cuQu7O36B/6vYExo//6CAAAAAElFTkSuQmCC" alt=""
                                className="w-32 rounded-full shadow-lg dark:shadow-black/20" />
                        </div>
                        <h5 className="mb-2 text-lg font-bold text-orange-600 text-center">Jennifer Lee</h5>
                        <h6 className="mb-4 font-medium text-primary text-orange-500 text-center">
                            Retiree
                        </h6>
                        <p className="mb-4 text-center text-gray-900 font-[Roboto] text-semibold tracking-wide">
                            ICDRC's transparent and efficient approach sets them apart. With their support, my insurance claim became a hassle-free journey. Highly recommended.
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="inline-block w-6">
                                <path fill="currentColor"
                                    d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z" />
                            </svg>
                        </p>
                        <ul className="mb-0 flex justify-center">
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                        </ul>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="testimonial-slide bg-white rounded-xl border-2 border-gray-800">
                    <div className="mb-4  p-4 md:mb-0">
                        <div className="mb-6 flex justify-center">
                            <img src="data:image/png;base64,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" alt=""
                                className="w-32 rounded-full shadow-lg dark:shadow-black/20" />
                        </div>
                        <h5 className="mb-2 text-lg font-bold text-orange-600 text-center">Robert Martinez</h5>
                        <h6 className="mb-4 font-medium text-primary text-orange-500 text-center">
                            Construction Manager
                        </h6>
                        <p className="mb-4 text-center text-gray-900 font-[Roboto] text-semibold tracking-wide">
                            ICDRC's unwavering efforts and skillful negotiation secured a favorable outcome for my insurance claim. Their commitment to client satisfaction is evident in every step.
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="inline-block w-6">
                                <path fill="currentColor"
                                    d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z" />
                            </svg>
                        </p>
                        <ul className="mb-0 flex justify-center">
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" className="w-5 text-orange-500">
                                    <path fill="currentColor"
                                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                                </svg>
                            </li>
                        </ul>
                    </div>
                </SwiperSlide> */}

            </Swiper>

        </div>
    )
}

export default Testimonial
