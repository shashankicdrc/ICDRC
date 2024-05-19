import "./Testimonial.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

const Testimonial = () => {
  return (
    <div className="my-16 py-4 md:py-12 rounded-xl bg-white border-b">
      <div className="py-4" data-aos="fade-up" data-aos-duration="1000">
        <h1 className="text-3xl md:text-6xl font-[Roboto] font-bold text-center  px-8">
          CUSTOMER TESTIMONIALS
        </h1>
        <p className=" text-center font-medium text-md py-2  tracking-widest mx-auto px-8">
          At ICDRC, we're committed to safeguarding what matters most to you,
          providing reliable insurance solutions for a worry-free future.
        </p>
      </div>

      <Swiper
        className="testimonial-slider mySwiper"
        scrollbar={true}
        zoom={true}
        autoplay={{
          delay: 40000,
          disableOnInteraction: true,
        }}
        loop={true}
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
        <SwiperSlide className="testimonial-slide bg-white rounded-xl shadow-xl border border-gray-300">
          <div className="mb-4  p-4 md:mb-0">
            <div className="mb-6 flex justify-center">
              <video
                playsInline
                autoplay
                muted
                controls
                src={"/vd.mp4"}
                className="w-full h-fit rounded-md shadow-black shadow-lg dark:shadow-black/20"
              ></video>
            </div>
            <h5 className="mb-2 text-lg font-bold text-orange-600 text-center">
              Joginder Kumar
            </h5>
            <h6 className="mb-4 font-medium text-primary text-orange-500 text-center">
              Small Business Owner
            </h6>
          </div>
        </SwiperSlide>
        {/* <SwiperSlide className="testimonial-slide bg-white rounded-xl border-2 border-gray-800">
          <div className="mb-4  p-4 md:mb-0">
            <div className="mb-6 flex justify-center">
              <video
                playsInline
                autoplay
                muted
                controls
                src={"/vd.mp4"}
                className="w-full h-fit rounded-md shadow-black shadow-lg dark:shadow-black/20"
              ></video>
            </div>
            <h5 className="mb-2 text-lg font-bold text-orange-600 text-center">
              Joginder Kumar
            </h5>
            <h6 className="mb-4 font-medium text-primary text-orange-500 text-center">
              Small Business Owner
            </h6>
          </div>
        </SwiperSlide>
        <SwiperSlide className="testimonial-slide bg-white rounded-xl border-2 border-gray-800">
          <div className="mb-4  p-4 md:mb-0">
            <div className="mb-6 flex justify-center">
              <video
                playsInline
                autoplay
                muted
                controls
                src={"/vd.mp4"}
                className="w-full h-fit rounded-md shadow-black shadow-lg dark:shadow-black/20"
              ></video>
            </div>
            <h5 className="mb-2 text-lg font-bold text-orange-600 text-center">
              Joginder Kumar
            </h5>
            <h6 className="mb-4 font-medium text-primary text-orange-500 text-center">
              Small Business Owner
            </h6>
          </div>
        </SwiperSlide>

        <SwiperSlide className="testimonial-slide bg-white rounded-xl border-2 border-gray-800">
          <div className="mb-4  p-4 md:mb-0">
            <div className="mb-6 flex justify-center">
              <video
                playsInline
                autoplay
                muted
                controls
                src={"/vd.mp4"}
                className="w-full h-fit rounded-md shadow-black shadow-lg dark:shadow-black/20"
              ></video>
            </div>
            <h5 className="mb-2 text-lg font-bold text-orange-600 text-center">
              Joginder Kumar
            </h5>

            <h6 className="mb-4 font-medium text-primary text-orange-500 text-center">
              Small Business Owner
            </h6>
          </div>
        </SwiperSlide>

        

        <SwiperSlide className="testimonial-slide bg-white rounded-xl border-2 border-gray-800">
          <div className="mb-4  p-4 md:mb-0">
            <div className="mb-6 flex justify-center">
              <video
                playsInline
                muted
                autoplay
                controls
                src={"/vd.mp4"}
                className="w-full h-fit rounded-md shadow-black shadow-lg dark:shadow-black/20"
              ></video>
            </div>
            <h5 className="mb-2 text-lg font-bold text-orange-600 text-center">
              Joginder Kumar
            </h5>

            <h6 className="mb-4 font-medium text-primary text-orange-500 text-center">
              Small Business Owner
            </h6>
          </div>
        </SwiperSlide>
        <SwiperSlide className="testimonial-slide bg-white rounded-xl border-2 border-gray-800">
          <div className="mb-4  p-4 md:mb-0">
            <div className="mb-6 flex justify-center">
              <video
                playsInline
                muted
                autoplay
                controls
                src={"/vd.mp4"}
                className="w-full h-fit rounded-md shadow-black shadow-lg dark:shadow-black/20"
              ></video>
            </div>
            <h5 className="mb-2 text-lg font-bold text-orange-600 text-center">
              Joginder Kumar
            </h5>

            <h6 className="mb-4 font-medium text-primary text-orange-500 text-center">
              Small Business Owner
            </h6>
          </div>
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default Testimonial;
