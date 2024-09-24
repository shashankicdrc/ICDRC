'use client';
import React, { useState } from 'react';
import Chatbot from './chatbot';
import { AiFillFacebook } from 'react-icons/ai';
import { BsInstagram } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaWhatsapp } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';
import { useEffect } from 'react';
import { url } from '../../app/api';
import axios from 'axios';
import { IoShareSocialSharp } from 'react-icons/io5';
import { MdContactPhone } from 'react-icons/md';

const SocialIcons = () => {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [showbot, setShowBot] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');

    useEffect(() => {
        const submit = async () => {
            if (
                name.length > 0 &&
                email.toLowerCase().match(/^[a-z0-9]+@[a-z]+\.[a-z]{2,6}$/) &&
                mobile.length === 10
            ) {
                // console.log({ name, email, mobile })
                try {
                    await axios.post(`${url}/api/createchatdata`, {
                        name,
                        email,
                        mobile,
                    });
                } catch (err) {
                    console.log(err);
                }

                setName('');
                setEmail('');
                setMobile('');
            }
        };
        submit();
    }, [name, email, mobile]);

    return (
        <div className="main_icon z-20">
            <div
                onClick={() => setShowBot((prev) => !prev)}
                className="main_icon rounded-full h-12 w-12 group 
                border-2 border-orange-600 cursor-pointer fixed bottom-36
                md:bottom-36 right-4 bg-white hover:bg-orange-600 
                flex justify-center items-center 
               ransform transition-transform duration-300 ease-in-out
               shadow-lg hover:shadow-xl"
            >
                <Chatbot />
            </div>

            {/* Chat Message */}
            {show2 && (
                <div className="social_icons main_icon fixed flex  gap-2 md:gap-4 justify-center items-center bottom-16 md:bottom-20 right-14 md:right-20"></div>
            )}

            {!show2 && (
                <div
                    onClick={() => {
                        setShow2(true);
                        setShow(false);
                    }}
                    className="main_icon rounded-full h-12 w-12 bg-white cursor-pointer fixed bottom-20
                    md:bottom-20 right-4  flex justify-center items-center border-2
                    border-orange-600 hover:bg-orange-600 transition-all 300 ease-in-out
                    text-orange-600 hover:text-white"
                >
                    <MdContactPhone className=" text-xl font-semibold md:text-2xl" />
                </div>
            )}
            {show2 && (
                <div className="social_icons main_icon fixed flex  gap-2 md:gap-4 justify-center items-center bottom-20 right-20 md:right-20">
                    <a
                        href="https://wa.me/917070717167?text=Hello%20Team%20ICDRC,%0A%0AI%20am%20looking%20for%20your%20help%20regarding%20an%20insurance%20claim."
                        target="_blank"
                        rel="noreferrer"
                        className="main_icon bg-green-500 h-12 w-12 cursor-pointer rounded-full flex justify-center items-center text-white  border-2 border-green-500 hover:bg-white hover:text-green-500"
                    >
                        <FaWhatsapp className="text-2xl md:text-2xl" />
                    </a>
                    <a
                        href="mailto:info@icdrc.com"
                        target="_blank"
                        rel="noreferrer"
                        className="main_icon bg-blue-500 h-12 w-12 cursor-pointer rounded-full flex justify-center items-center text-white  border-2 border-blue-500 hover:bg-white hover:text-blue-500"
                    >
                        <CiMail className="text-2xl md:text-2xl" />
                    </a>
                </div>
            )}
            {show2 && (
                <div
                    onClick={() => setShow2(false)}
                    className="main_icon rounded-full h-12 w-12 bg-orange-600 cursor-pointer fixed bottom-20 md:bottom-20 right-4 flex justify-center items-center text-white border-2 border-orange-600 hover:border-orange-600 hover:bg-white hover:text-orange-600"
                >
                    <ImCross className="text-lg md:text-xl" />
                </div>
            )}

            {/* Social Media */}
            {show && (
                <div className="social_icons main_icon fixed flex  gap-2 md:gap-4 justify-center items-center bottom-4 right-20 md:right-20">
                    <a
                        href="https://www.facebook.com/ICDRCOfficial/"
                        target="_blank"
                        rel="noreferrer"
                        className="main_icon bg-blue-500 h-12 w-12 cursor-pointer rounded-full flex justify-center items-center text-white  border-2 border-blue-500 hover:bg-white hover:text-blue-500"
                    >
                        <AiFillFacebook className="text-xl md:text-2xl" />
                    </a>
                    <a
                        href="https://twitter.com/ICDRC_Official"
                        target="_blank"
                        rel="noreferrer"
                        className="main_icon bg-gray-900 h-12 w-12 cursor-pointer rounded-full flex justify-center items-center text-white  border-2 border-gray-900 hover:bg-white hover:text-gray-900"
                    >
                        <FaSquareXTwitter className="text-xl md:text-2xl" />
                    </a>
                    <a
                        href="https://www.instagram.com/icdrcsolutions"
                        target="_blank"
                        rel="noreferrer"
                        className="main_icon bg-pink-600 h-12 w-12 cursor-pointer rounded-full flex justify-center items-center text-white  border-2 border-pink-600 hover:bg-white hover:text-pink-600"
                    >
                        <BsInstagram className="text-xl md:text-2xl" />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/icdrcofficial"
                        target="_blank"
                        rel="noreferrer"
                        className="main_icon bg-blue-600 h-12 w-12 cursor-pointer rounded-full flex justify-center items-center text-white  border-2 border-blue-600 hover:bg-white hover:text-blue-600"
                    >
                        <BsLinkedin className="text-xl md:text-2xl" />
                    </a>
                </div>
            )}

            {!show && (
                <div
                    onClick={() => {
                        setShow(true);
                        setShow2(false);
                    }}
                    className="main_icon rounded-full h-12 w-12 cursor-pointer fixed bottom-4
                    right-4 flex justify-center items-center hover:text-white
               border-2 border-orange-600 hover:bg-orange-600 bg-white
               transform transition-transform duration-300 ease-in-out 
               shadow-lg hover:shadow-xl text-orange-600"
                >
                    <IoShareSocialSharp className="text-xl md:text-2xl" />
                </div>
            )}

            {show && (
                <div
                    onClick={() => setShow(false)}
                    className="main_icon rounded-full h-12 w-12 bg-orange-600
                    cursor-pointer fixed bottom-4 right-4 flex justify-center items-center
                    text-white border-2 border-orange-600 hover:border-orange-600 hover:bg-white hover:text-orange-600"
                >
                    <ImCross className="text-lg md:text-xl" />
                </div>
            )}
        </div>
    );
};

export default SocialIcons;
