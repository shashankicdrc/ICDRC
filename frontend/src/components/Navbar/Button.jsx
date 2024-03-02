
'use client';
import React from "react";
import Link from "next/link";

import { loginAdmin } from '../../features/AdminSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/navigation'
const Button = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const admin = useSelector((state) => state.admin);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  


  // const handleLogout = () => {
  //   // Logic for logging out
  //   setIsLoggedIn(false);
  // };

  const handleLogin = () => {
    useEffect(() => {
      if (admin._id) {
          router.push('/myprofile')
          setIsLoggedIn(true);
      }
  }, [router, admin])
  };


  return (
    <div className="flex flex-col gap-8 md:flex-row justify-center items-center">
    <Link href='/casestatus'>
      <div className="b  mx-auto h-12 w-48 flex justify-center items-center text-white  hover:font-semibold" data-aos="zoom-in">
        <div className="i h-12 w-48 bg-orange-500 items-center rounded-xl shadow-2xl  cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
        </div>
        <div className="text-center  font-semibold z-10 pointer-events-none flex justify-content items-center"style={{ fontSize: '18px' }}><span className=""></span>Case Status</div>
      </div>
    </Link>

    <Link href='/login'>
      <div className="b  mx-auto h-12 w-48 flex justify-center items-center text-white  hover:font-semibold" data-aos="zoom-in">
        <div className="i h-12 w-48 bg-orange-500 items-center rounded-xl shadow-2xl  cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
        </div>
        <div className="text-center font-semibold z-10 pointer-events-none flex justify-content items-center" style={{ fontSize: '18px' }} ><span className=""></span>Login</div>
      </div>
    </Link>
    
  
      


      {/* <Link href="/login" className="max-w-max rounded-md h-8 w-30 text-white px-3.5 py-1 flex justify-center items-center m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-orange-500 bg-orange-400 hover:text-white" onClick={isLoggedIn ? handleLogout : handleLogin}>
        <span className="absolute w-64 h-0 transition-all duration-500 origin-center rotate-45 -translate-x-20 bg-orange-500 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease">{isLoggedIn ? 'Logout' : 'Login'}</span>
        <span className="relative text-orange-500 transition duration-300 group-hover:text-white ease">{isLoggedIn ? 'Logout' : 'Login'}</span>
      </Link> */}

      {/* <Link href={isLoggedIn ? "/logout" : "/login"}>
       className="max-w-max rounded-md px-3.5 py-1 flex justify-center items-center m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-orange-500 bg-orange-400 text-indigo-600 hover:text-white" onClick={isLoggedIn ? handleLogout : handleLogin}>
        <span className="absolute w-64 h-0 transition-all duration-500 origin-center rotate-45 -translate-x-20 bg-orange-500 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
        <span className="relative transition duration-300 group-hover:text-white ease">{isLoggedIn ? 'Logout' : 'Login'}</span>
      
    </Link> */}

    </div>
  );
};

export default Button;
