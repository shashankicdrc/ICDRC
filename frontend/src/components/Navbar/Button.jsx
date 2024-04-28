"use client";
import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"; 
import { loginUser, logoutUser } from "../../features/UserSlice";

const Button = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
    dispatch(loginUser());
  };

  const handleClick = () => {
    if (user._id) {
      handleLogout();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="flex flex-col gap-8 md:flex-row justify-center items-center">
      <Link
        className="bg-orange-500 hover:bg-orange-600 text-white rounded-md py-2 px-4"
        href="/casestatus"
      >
        Case status
      </Link>
      <div
        onClick={handleClick}
        className="bg-orange-500 hover:bg-orange-600 text-white rounded-md py-2 px-4 cursor-pointer"
      >
        {user._id ? "Logout" : "Login"}
      </div>
    </div>
  );
};

export default Button;
