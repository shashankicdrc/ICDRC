import React from "react";
import Link from "next/link";

const Button = () => {
  return (
    <div className="flex flex-col gap-8 md:flex-row justify-center items-center">
      <Link href='/register'>
        <div className="b animate-bounce mx-auto h-12 w-48 flex justify-center items-center text-white  hover:font-semibold" data-aos="zoom-in">
          <div className="i h-12 w-48 bg-orange-500 hover:bg-blue-600 items-center rounded-xl shadow-2xl  cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
          </div>
          <div className="text-center font-semibold z-10 pointer-events-none flex justify-content items-center"><span className=""><svg className="w-5 h-5 right-1.5 relative" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg></span>Register Complaint</div>
        </div>
      </Link>


      <Link href="/casestatus" className="max-w-max rounded-md px-3.5 py-1 flex justify-center items-center m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-orange-500 text-indigo-600 hover:text-white">
        <span className="absolute w-64 h-0 transition-all duration-500 origin-center rotate-45 -translate-x-20 bg-orange-500 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
        <span className="relative text-orange-500 transition duration-300 group-hover:text-white ease">Check Case Status</span>
      </Link>
    </div>
  );
};

export default Button;
