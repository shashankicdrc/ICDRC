import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminButton from "./AdminButton";
import AdminNavLinks from "./AdminNavLinks";
import './AdminNav.css'

const AdminNav = () => {
    const [open, setOpen] = useState(false);

    const [navbar, setNavbar] = useState(false)
    const changeBackground = () => {
        // console.log(window.scrollY)
        if (window.scrollY >= 50) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }

    useEffect(() => {
        changeBackground()
        // adding the event when scroll change background
        window.addEventListener("scroll", changeBackground)
    })

    return (
        <nav className={`${navbar ? "bg-white" : ""} fixed w-full z-10 transition-all ease-in-out duration-75`}>
            <div className="flex items-center font-medium justify-around">
                <div className="z-50 p-5 md:w-auto w-full flex justify-between h-full">
                    <Link to='/en/ICDRC/Home'><img src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1692866749/Logo/Copy_of_ICDRC_912_273_px_rwkrry.png" alt="logo" className="md:cursor-pointer w-28 md:w-44" /></Link>
                    <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
                        <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
                    </div>
                </div>
                <ul className="md:flex hidden items-center gap-8 font-[Signika+Negative] z-20">
                    <li>
                        <Link to="/en/ICDRC/Home" className={`${navbar ? "text-gray-900" : "text-white"} py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/en/ICDRC/chatbotleads" className={`${navbar ? "text-gray-900" : "text-white"} py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}>
                            Chatbot
                        </Link>
                    </li>
                    <li>
                        <Link to="/en/ICDRC/newsletterdata" className={`${navbar ? "text-gray-900" : "text-white"} py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}>
                            Subscriptions
                        </Link>
                    </li>
                    <AdminNavLinks navbar={navbar} />
                    <li>
                        <Link to="/en/ICDRC/partnerdata" className={`${navbar ? "text-gray-900" : "text-white"} py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}>
                            Partners
                        </Link>
                    </li>
                    <li>
                        <Link to="/en/ICDRC/contactmessages" className={`${navbar ? "text-gray-900" : "text-white"} py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}>
                            Contacts
                        </Link>
                    </li>
                </ul>
                <div className="md:block hidden">
                    <AdminButton />
                </div>
                {/* Mobile nav */}
                <ul
                    className={`
        md:hidden w-4/5 bg-gray-100 fixed top-0 overflow-y-auto bottom-0 py-24 pl-4
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
                >
                    <li>
                        <Link to="/en/ICDRC/Home" className="py-7 px-3 inline-block">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/en/ICDRC/chatbotleads" className="py-7 px-3 inline-block">
                            Chatbot
                        </Link>
                    </li>
                    <li>
                        <Link to="/en/ICDRC/newsletterdata" className="py-7 px-3 inline-block">
                            Subscriptions
                        </Link>
                    </li>
                    <AdminNavLinks />
                    <li>
                        <Link to="/en/ICDRC/partnerdata" className="py-7 px-3 inline-block">
                            Partners
                        </Link>
                    </li>
                    <li>
                        <Link to="/en/ICDRC/contactmessages" className="py-7 px-3 inline-block">
                            Contacts
                        </Link>
                    </li>
                    <div className="py-5">
                        <AdminButton />
                    </div>
                </ul>
            </div>
        </nav>
    );
};
export default AdminNav
