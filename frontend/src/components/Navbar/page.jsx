"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import "../../styles/module.navbar.css";
import HomeNavLinks from "./HomeNavLinks";
import { IoMdMenu } from "react-icons/io";
import dynamic from "next/dynamic";
import RightMenu from "./RightMenu";
import Image from 'next/image'
import ChatBot from "../SocialIcons/chatbot";

const MobileSideModal = dynamic(() => import("./MobileNavbarModal"));

const HomeNav = ({ isWhiteBg }) => {
    const [open, setOpen] = useState(false);

    const [scrollable, setscrollable] = useState(false);
    const changeBackground = () => {
        if (window.scrollY >= 50) {
            setscrollable(true);
        } else {
            setscrollable(false);
        }
    };

    const toggleMobileModal = useCallback((value) => setOpen(value), []);

    useEffect(() => {
        changeBackground();
        // adding the event when scroll change background
        window.addEventListener("scroll", changeBackground);
    });

    return (
        <header className="fixed top-0 w-full z-50">
            <div className="bg-[#222222] h-12 flex w-full
                text-white md:flex items-center  
                justify-between
                px-5 md:px-10">
                <div className="flex items-center space-x-3 text-sm">
                    <a href="mailto:info@icdrc.in" className="flex items-center space-x-1">
                        <Image src='/images/9.webp' width={30} height={30} alt="mail" />
                        <span className="hidden md:block">info@icdrc.in</span>
                    </a>
                    <a href="tel:+917070717167" className="flex items-center space-x-1">
                        <Image src='/images/8.webp' width={30} height={30} alt="telephone" />
                        <span className="hidden md:block">+91-7070717167</span>
                    </a>
                    <a href="https://wa.me/917070717167" className="flex items-center space-x-1">
                        <Image src='/images/10.webp' width={30} height={30} alt="Whatsapp" />
                        <span className="hidden md:block">+91-7070717167</span>
                    </a>
                </div>
                <div className="z-40">
                    <ChatBot isheader={true} />
                </div>

            </div>
            <nav
                className={`${scrollable || isWhiteBg ? 'bg-white shadow-md' : ''}
 w-full transition-all  ease-in-out duration-75`}
            >
                <div className="flex items-center font-medium justify-around">
                    <div className="z-50 p-3 md:w-auto w-full flex justify-between h-full">
                        <Link href="/">
                            <Image
                                src="/logo.png"
                                alt="logo"
                                className="md:cursor-pointer w-28 md:w-44"
                                height={100}
                                width={400}
                            />
                        </Link>
                        <button
                            className={`text-3xl md:hidden ${open ? 'hidden' : ''}`}
                            onClick={() => toggleMobileModal(!open)}
                        >
                            <IoMdMenu
                                className={`${!scrollable && !isWhiteBg ? 'text-white' : 'text-gray-900'}`}
                            />
                        </button>
                    </div>
                    <ul className="md:flex hidden items-center gap-8 font-[Signika+Negative] z-20">
                        <li>
                            <Link
                                href="/"
                                className={`${scrollable || isWhiteBg ? 'text-black' : 'text-white'
                                    } py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className={`${scrollable || isWhiteBg ? 'text-black' : 'text-white'
                                    } py-7 px-3 capitalize inline-block font-semibold orange-link hover:text-orange-500`}
                            >
                                About us
                            </Link>
                        </li>
                        <HomeNavLinks navbar={scrollable || isWhiteBg} />
                        <li>
                            <Link
                                href="/partner"
                                className={`${scrollable || isWhiteBg ? 'text-black' : 'text-white'
                                    } capitalize py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}
                            >
                                Partner with us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className={`${scrollable || isWhiteBg ? 'text-black' : 'text-white'
                                    } capitalize py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}
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
        </header >
    );
};

export default HomeNav;
