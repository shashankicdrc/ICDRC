// components/TestimonialSlider.js
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/modules/effect-coverflow/effect-coverflow.min.css";
import "swiper/modules/pagination/pagination.min.css";

SwiperCore.use([EffectCoverflow, Pagination, Autoplay]);

const TestimonialSlider = () => {
  return (
    <Swiper
      className="testimonial-slider mySwiper"
      autoplay={{
        delay: 4000,
        disableOnInteraction: true,
      }}
      loop={true}
      pagination={{
        clickable: true,
      }}
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
    >
      <SwiperSlide className="testimonial-slide bg-white rounded-xl border-2 border-gray-800">
        <div className="mb-4 p-4 md:mb-0">
          <div className="mb-6 flex justify-center">
            <video playsInline autoPlay muted controls src="../Testimonials/Vd.mp4" className="w-full h-fit rounded-md shadow-black shadow-lg dark:shadow-black/20"></video>
          </div>
          <h5 className="mb-2 text-lg font-bold text-orange-600 text-center">Joginder Kumar</h5>
          <h6 className="mb-4 font-medium text-primary text-orange-500 text-center">
            Small Business Owner
          </h6>
        </div>
      </SwiperSlide>
      {/* Add more slides as needed */}
    </Swiper>
  );
};

export default TestimonialSlider;
