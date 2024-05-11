import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import Link from "next/link";
import { Pagination, Autoplay, Keyboard } from "swiper/modules";

const Home1 = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, Keyboard]}
        slidesPerView={1}
        spaceBetween={0}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        grabCursor={true}
        centeredSlides={true}
        className="w-full"
      >
        <SwiperSlide>
          <div
            className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690784022/Home_page/Home1/homeslider2_zzybpj.webp)`,
              height: "720px",
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
            >
              <div className="flex h-full items-center justify-start md:ml-12 ml-3">
                <div className="text-white flex justify-start flex-col">
                  <h2
                    className="mb-4 text-3xl md:text-5xl font-semibold text-start px-4 md:px-4"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                  >
                    Share your Insurance Claim & be assured that
                    <br /> your claim is handled by a qualified <br /> insurance
                    professional.
                  </h2>
                  <Link
                    href="/register"
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
                    <span className="relative">Register Complaint</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690784023/Home_page/Home1/homeslider3_odun3i.webp)`,
              height: "720px",
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
            >
              <div className="flex h-full items-center justify-start md:ml-12 ml-3">
                <div className="text-white flex justify-start flex-col">
                  <h2
                    className="mb-4 text-3xl md:text-5xl font-semibold text-start px-4 md:px-4"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                  >
                    We're the insurance claim <br /> settlement company that{" "}
                    <br /> fights for you.
                  </h2>
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
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690784021/Home_page/Home1/homeslider1_bfyjqu.webp)`,
              height: "720px",
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
            >
              <div className="flex h-full items-center justify-start md:ml-12 ml-3">
                <div className="text-white flex justify-start flex-col">
                  <h2
                    className="mb-4 text-3xl md:text-5xl font-semibold text-start px-4 md:px-4"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                  >
                    We'll get you the money <br /> you deserve.
                  </h2>
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
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* <p className='mt-2 bg-white text-white'>...</p> */}
      </Swiper>
    </div>
  );
};

export default Home1;
