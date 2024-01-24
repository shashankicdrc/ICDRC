import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import './navbar.css'
import HomeNavLinks from "./HomeNavLinks";
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
                    <Link to='/'><img src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1692866749/Logo/Copy_of_ICDRC_912_273_px_rwkrry.png" alt="logo" className="md:cursor-pointer w-28 md:w-44" /></Link>
                    <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
                        <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
                    </div>
                </div>
                <ul className="md:flex hidden items-center gap-8 font-[Signika+Negative] z-20">
                    <li>
                        <Link to="/" className={`${navbar ? "text-gray-900" : "text-white"} py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className={`${navbar ? "text-gray-900" : "text-white"} py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}>
                            About us
                        </Link>
                    </li>
                    <HomeNavLinks navbar={navbar} />
                    <li>
                        <Link to="/partner" className={`${navbar ? "text-gray-900" : "text-white"} py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}>
                            Partner with us
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className={`${navbar ? "text-gray-900" : "text-white"} py-7 px-3 inline-block font-semibold orange-link hover:text-orange-500`}>
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
                        <Link to="/" className="py-7 px-3 inline-block">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="py-7 px-3 inline-block">
                            About us
                        </Link>
                    </li>
                    <HomeNavLinks />
                    <li>
                        <Link to="/partner" className="py-7 px-3 inline-block">
                            Partner with us
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="py-7 px-3 inline-block">
                            Contact us
                        </Link>
                    </li>
                    <div className="py-5">
                        {/* <Button /> */}


                        <div className="flex flex-col gap-8 md:flex-row justify-center items-center">
      <Link to='/register'>
        <div className="b animate-bounce mx-auto h-12 w-48 flex justify-center items-center text-white  hover:font-semibold" data-aos="zoom-in">
          <div className="i h-12 w-48 bg-orange-500 hover:bg-blue-600 items-center rounded-xl shadow-2xl  cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out">
          </div>
          <div className="text-center font-semibold z-10 pointer-events-none flex justify-content items-center"><span className=""><svg className="w-5 h-5 right-1.5 relative" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg></span>Register Complaint</div>
        </div>
      </Link>


      <Link to="/casestatus" className="max-w-max rounded-md px-3.5 py-1 flex justify-center items-center m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-orange-500 text-indigo-600 hover:text-white">
        <span className="absolute w-64 h-0 transition-all duration-500 origin-center rotate-45 -translate-x-20 bg-orange-500 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
        <span className="relative text-orange-500 transition duration-300 group-hover:text-white ease">Check Case Status</span>
      </Link>
    </div>


                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default HomeNav;
