'use client'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import HomeNav from "../../components/Navbar/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Home7Contact from "./../../components/HomeComponents/Home7Contact";
import Footer from "../../components/footer/page";
import SocialIcons from "../../components/SocialIcons/page";
import ShowStatus from "../casestatus/ShowStatus";
import Profile from "./profile";
import UploadDoc from '../../components/uploaddoc/page';

const myprofile = () => {
  const router = useRouter();
  const admin = useSelector((state) => state.admin);

  useEffect(() => {
      if (!admin._id) {
          router.push('/login')
      }
  }, [router, admin])

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

      <h1
        className="text-gray-900 text-3xl mt-6 md:mt-8 md:text-6xl font-[Roboto] font-bold text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        MY Profile
      </h1>
      <p
        className="text-gray-700 text-center font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        One Stop Solution For Insurance Claim Disputes. (ICDRC)
      </p>

      <div className="flex flex-col justify-center md:flex-row">
  {/* Left Column */}
  <div className="order-1 md:order-1 md:w-full md:p-8">
    {/* User Details */}
     
     <Profile />
    {/* Upload Documents */}

    <UploadDoc />
  </div>
  {/* Right Column */}
  <div className="order-2 md:order-2 md:w-full md:p-8">
  
  <ShowStatus />
    
  </div>
</div>
<Home7Contact />
<Footer />
    </div>
  );
};

export default myprofile;
