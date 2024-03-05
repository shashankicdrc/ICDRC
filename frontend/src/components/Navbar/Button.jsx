'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; 
import { loginUser, logoutUser } from '../../features/UserSlice';

const Button = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!user._id);
  }, [user]);

  const handleLogout = () => {
    // Dispatch action to log out the admin
    dispatch(logoutUser());
    // Redirect to login page after 2 seconds
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  };

  const handleLogin = () => {
    // Dispatch action to log in the admin
    dispatch(loginUser());
    // Redirect to profile page upon successful login after 2 seconds
    setTimeout(() => {
      router.push('/myprofile');
    }, );
  };

  const handleClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="flex flex-col gap-8 md:flex-row justify-center items-center">
      <Link href='/casestatus'>
        <div className="b mx-auto h-12 w-48 flex justify-center items-center text-white hover:font-semibold" data-aos="zoom-in">
          <div className="i h-12 w-48 bg-orange-500 items-center rounded-xl shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"></div>
          <div className="text-center font-semibold z-10 pointer-events-none flex justify-content items-center" style={{ fontSize: '18px' }}><span className=""></span>Case Status</div>
        </div>
      </Link>

      <div onClick={handleClick} className="b mx-auto h-12 w-48 flex justify-center items-center text-white hover:font-semibold" data-aos="zoom-in">
        <div className="i h-12 w-48 bg-orange-500 items-center rounded-xl shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"></div>
        <div className="text-center font-semibold z-10 pointer-events-none flex justify-content items-center" style={{ fontSize: '18px' }}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </div>
      </div>
    </div>
  );
}

export default Button;
