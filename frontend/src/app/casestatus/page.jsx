'use client';
import React, { useEffect } from "react";
import HomeNav from "../../components/Navbar/page";
import Link from "next/link";
import Home7Contact from "./../../components/HomeComponents/Home7Contact";
import Footer from "../../components/footer/page";
import SocialIcons from "../../components/SocialIcons/page";
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';





const CaseStatus = () => {

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

  // if(!admin_.id){
  //   render.push('/login')
  //   else-if {
  //     router.push('/myprofile')
  //   }
  // }
  return (
    <div>
       <SocialIcons />
      <HomeNav />

     {/* <Helmet>
        <meta charSet="utf-8" />
        <title>ICDRC: Case Status</title>
        <link rel="canonical" href="" />
        <meta
          name="description"
          content="Connect with us, Our case studies and successful insurance claim story, submit your complaint, your case status, case prograss, report section, client satisfaction. One stop solution for insurance claim disputes. "
        />
        <meta
          name="keywords"
          content="Complaint Section, case study and case status register your complain, reliable insurance solutions, Our Success stories, ICDRC, successful claims, Insurance recovery,  Fast insurance settlements, InsuranceSamadhan Alternative"
        />
      </Helmet> */}



      

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
        Check Case Status
      </h1>
      <p
        className="text-gray-700 text-center font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        One Stop Solution For Insurance Claim Disputes. (ICDRC)
      </p>
      <div className="">
        

<form className="max-w-sm mx-auto mt-10 mb-10 p-10 border-orange-700 rounded-lg bg-slate-50">
<div className="mb-5">
    <label for="Name" className="block mb-2 text-sm font-medium text-Black ">Your Name</label>
    <input type="Name" id="email" className="bg-white border cursor-text border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5 " required />
  </div>
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your Email</label>
    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
  </div>
  <div className="mb-5">
    <label for="CaseId" className="block mb-2 text-sm font-medium text-gray-900 ">Case Id</label>
    <input type="number" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
  </div>
  <div className="flex items-start mb-5">
    <div className="flex items-center h-5">
      <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
    </div>
    <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
  </div>
  <button type="submit" className="text-white bg-orange-400 hover:bg-orange-50 hover:text-black hover:border  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-10 ">Check Status</button>
</form>

      </div>

      

      <Home7Contact />
      <Footer />
    </div>
  );
};

export default CaseStatus;
