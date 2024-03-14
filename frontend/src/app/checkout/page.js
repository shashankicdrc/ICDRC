"use client";
import { useEffect } from "react";
import HomeNav from "../../components/Navbar/page";
import Link from "next/link";
import Home7Contact from "./../../components/HomeComponents/Home7Contact";
import Footer from "../../components/footer/page";
import SocialIcons from "../../components/SocialIcons/page";


const Checkout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <SocialIcons />
      <HomeNav /> 


     




      <div
        className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center "
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)`,
          height: "500px",
        }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="mt-6 md:mt-10 flex h-full items-center justify-start md:ml-12 ml-3">
            <div className="text-white flex justify-start flex-col">
              <h2
                className="mb-4 text-3xl md:text-5xl font-semibold text-start px-4 md:px-4"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                India’s most reliable and single
                <br /> window solution platform.
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

      



<div className="flex justify-center items-center py-20">
      <div className="w-96 flex ml-5 max-h-3/4 justify-center items-center">
          <div class="w-full p-4 bg-white  rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
              Checkout Cart
            </h5>
            <div class="flex justify-between py-3 items-baseline text-gray-900 dark:text-white">
              <span class="text-s text-start ">Individual Complain:  
              Consultancy fees</span>
              <span class="text-l text-end text-green-700"> ₹ 500</span>
              
            </div>
            <div className="border  mt-3 text-gray-50 "></div>

            <div class=" py-3 items-baseline text-gray-900 dark:text-white">
              <p class="text-base text-start font-semibold ">Suntotal</p>
              <p class="text-l mt-2 text-start text-gray-700 font-medium">Flat rate:  ₹ 500</p>
              {/* <p class="text-l py-4  text-start text-gray-700">Shiping to: <span>M/S Balak Ram Laxmi Narayan & Sons- Gandhi Nagar, Basti, Uttar Pradesh 272001  </span> </p> */}
              
            </div>

            <div class="flex justify-between py-4 items-baseline text-gray-900 dark:text-white">
              <span class="text-s text-start ">Total</span>
              <span class="text-md text-end text-green-700 font-semibold"> ₹ 500</span>
              
            </div>

            
            <button className="bg-orange-400 mt-5 w-30 rounded-lg text-white px-4 py-2  hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 mb-4">
            Procced to checkout
          </button>
          </div>
        </div>

        </div>

      <Home7Contact />
      <Footer />
    </div>
  );
};

export default Checkout;
