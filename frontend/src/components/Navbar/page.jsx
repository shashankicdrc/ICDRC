import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "./Button";
import '../../styles/module.navbar.css';
import HomeNavLinks from "./HomeNavLinks";
import { IoMdMenu } from "react-icons/io";





const HomeNav = () => {
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
                    <Link href='/'><img src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1692866749/Logo/Copy_of_ICDRC_912_273_px_rwkrry.png" alt="logo" className="md:cursor-pointer w-28 md:w-44" /></Link>
                    <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
                        <IoMdMenu name={`${open ? "close" : "menu"}`}></IoMdMenu>
                    </div>
                </div>
                <ul className="md:flex hidden items-center gap-8 font-[Signika+Negative] z-20">
                    <li>
                        <Link href="/" className={`${navbar ? "text-gray-900" : "text-white"} py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className={`${navbar ? "text-gray-900" : "text-white"} py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}>
                            About us
                        </Link>
                    </li>
                    <HomeNavLinks navbar={navbar} />
                    <li>
                        <Link href="/partner" className={`${navbar ? "text-gray-900" : "text-white"} py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}>
                            Partner with us
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className={`${navbar ? "text-gray-900" : "text-white"} py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}>
                            Contact us
                        </Link>
                    </li>
                </ul>
                <div className="md:block hidden">
                    <Button />
                </div>
                {/* Mobile nav */}
                <ul
                    className={`
        md:hidden  fixed w-4/5 bg-gray-100 top-0 overflow-y-auto bottom-0 py-24 pl-4
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
                >
                    <li>
                        <Link href="/" className="py-7 px-3 inline-block">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="py-7 px-3 inline-block">
                            About us
                        </Link>
                    </li>
                    <HomeNavLinks />
                    <li>
                        <Link href="/partner" className="py-7 px-3 inline-block">
                            Partner with us
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="py-7 px-3 inline-block">
                            Contact us
                        </Link>
                    </li>
                    <div className="py-5">
                        <Button />
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default HomeNav;