"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import AdminButton from "./adminbutton";
import AdminNavLinks from "./adminnavlinks";
import "./navbar.modules.css";
import { useSelector } from "react-redux";
import { IoMdMenu } from "react-icons/io";
import dynamic from "next/dynamic";

const MobileSideModal = dynamic(() => import("./MobileNavbarModal"));

const AdminNav = () => {
  const [open, setOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const admin = useSelector((state) => state.admin);

  const changeBackground = () => {
    // console.log(window.scrollY)
    if (window.scrollY >= 50) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const toggleMobileModal = useCallback((value) => setOpen(value), []);

  useEffect(() => {
    changeBackground();
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground);
  });

  return (
    <nav
      className={`${
        navbar ? "bg-white" : ""
      } fixed w-full z-10 transition-all ease-in-out duration-75`}
    >
      <div className="flex items-center font-medium justify-around">
        <div className="z-50 p-5 md:w-auto w-full flex justify-between h-full">
          <Link href="/admin/dashboard">
            <img
              src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1692866749/Logo/Copy_of_ICDRC_912_273_px_rwkrry.png"
              alt="logo"
              className="md:cursor-pointer w-28 md:w-44"
            />
          </Link>

          <button
            className={`text-3xl md:hidden ${open ? "hidden" : ""}`}
            onClick={() => toggleMobileModal(!open)}
          >
            <IoMdMenu className={`${!navbar ? "text-white" : "text-black"}`} />
          </button>
        </div>
        <ul className="md:flex hidden items-center gap-8 font-[Signika+Negative] z-20">
          <li>
            <Link
              href="/admin/dashboard"
              className={`${
                navbar ? "text-gray-900" : "text-white"
              } py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/admin/dashboard/chatbotleads"
              className={`${
                navbar ? "text-gray-900" : "text-white"
              } py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}
            >
              Chatbot
            </Link>
          </li>
          {admin.role === "admin" ? (
            <li>
              <Link
                href="/admin/dashboard/admins"
                className={`${
                  navbar ? "text-gray-900" : "text-white"
                } py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}
              >
                Admins
              </Link>
            </li>
          ) : null}

          <AdminNavLinks navbar={navbar} />
          <li>
            <Link
              href="/admin/dashboard/partnerdata"
              className={`${
                navbar ? "text-gray-900" : "text-white"
              } py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}
            >
              Partners
            </Link>
          </li>
          <li>
            <Link
              href="/admin/dashboard/contactmessages"
              className={`${
                navbar ? "text-gray-900" : "text-white"
              } py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}
            >
              Contacts
            </Link>
          </li>
          <li>
            <Link
              href="/admin/dashboard/registrationform"
              className={`${
                navbar ? "text-gray-900" : "text-white"
              } py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}
            >
              Complains
            </Link>
          </li>
        </ul>
        <div className="md:block hidden">
          <AdminButton />
        </div>
        <MobileSideModal isOpen={open} toggleModal={toggleMobileModal} />
      </div>
    </nav>
  );
};
export default AdminNav;
