"use client";
import React, { useCallback, useState } from "react";
import Link from "next/link";
import "../../styles/module.navbar.css";
import PrivateHomeNavLinks from "./PrivateHomeLink";
import { IoMdMenu } from "react-icons/io";
import dynamic from "next/dynamic";
import RightMenu from "./RightMenu";

const MobileSideModal = dynamic(() => import("./MobileNavbarModal"));

const HomeNav = () => {
  const [open, setOpen] = useState(false);

  const toggleMobileModal = useCallback((value) => setOpen(value), []);

  return (
    <nav
      className={`fixed top-0 w-full bg-white shadow-lg z-50 transition-all ease-in-out duration-75`}
    >
      <div className="flex items-center font-medium justify-around">
        <div className="z-50 p-5 md:w-auto w-full flex justify-between h-full">
          <Link href="/">
            <img
              src="/logo.png"
              alt="logo"
              className="md:cursor-pointer w-28 md:w-44"
              height={200}
              width={400}
            />
          </Link>
          <button
            className={`text-3xl md:hidden ${open ? "hidden" : ""}`}
            onClick={() => toggleMobileModal(!open)}
          >
            <IoMdMenu className="text-black" />
          </button>
        </div>
        <ul className="md:flex hidden items-center gap-8 font-[Signika+Negative] z-20">
          <li>
            <Link
              href="/"
              className={`py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}
            >
              About us
            </Link>
          </li>
          <PrivateHomeNavLinks />
          <li>
            <Link
              href="/partner"
              className={`py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}
            >
              Partner with us
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}
            >
              Contact us
            </Link>
          </li>
        </ul>
        <div className="hidden md:flex md:item-center md:space-x-2">
          <RightMenu />
        </div>
        <MobileSideModal isOpen={open} toggleModal={toggleMobileModal} />
      </div>
    </nav>
  );
};

export default HomeNav;
