'use client';
import React, { useState } from 'react'
import './SocialIcons.css';
import { IoShareSocialSharp } from 'react-icons/io5';
// import ChatBot from 'react-simple-chatbot';
// import { TbMessageChatbot } from 'react-icons/tb'

import Chatbot from './chatbot';
import { FaRobot } from "react-icons/fa";

import { AiOutlineWhatsApp } from 'react-icons/ai'
import { AiFillFacebook } from 'react-icons/ai'
import { BsInstagram } from 'react-icons/bs'
import { BsLinkedin } from 'react-icons/bs'
import { ImCross } from 'react-icons/im'
import { MdContactPhone } from 'react-icons/md'
import { CgMail } from 'react-icons/cg'
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoCall } from 'react-icons/io5'

import { AiFillWechat } from 'react-icons/ai';
import Link from 'next/link';
import { useEffect } from 'react';
import { url } from '../../app/api';
import axios from 'axios'

const SocialIcons = () => {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [showbot, setShowBot] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');

    // const steps = [
    //     {
    //         id: '0',
    //         message: "Hi there 👋🏻! Welcome to ICDRC. We are India's most trusted platform for resolving Insurance Complaints.",
    //         trigger: '1',
    //     },
    //     {
    //         id: '1',
    //         message: "I am RaksaBot, Your virtual claim assistant, here to help you find solutions to any insurance- related issue and much more.",
    //         trigger: '2',
    //     },
    //     {
    //         id: '2',
    //         message: 'What is your name?',
    //         trigger: 'name',
    //     },
    //     {
    //         id: 'name',
    //         user: true,
    //         validator: (value) => {
    //             if (value.length > 1) {
    //                 setName(value)
    //                 return true;
    //             }
    //             return true;
    //         },
    //         trigger: '3',
    //     },
    //     {
    //         id: '3',
    //         message: 'Hi {previousValue}! Enter your email address?',
    //         trigger: 'email',
    //     },
    //     {
    //         id: 'email',
    //         user: true,
    //         validator: (value) => {
    //             if (value.length === 1) {
    //                 return 'Enter a valid email.';
    //             }
    //             else if (value.toLowerCase().match(/^[a-z0-9]+@[a-z]+\.[a-z]{2,6}$/)) {
    //                 setEmail(value)
    //                 return true;
    //             }
    //             else {
    //                 return 'Enter a valid email.';
    //             }
    //         },
    //         trigger: '4',
    //     },
    //     {
    //         id: '4',
    //         message: 'What is your mobile number?',
    //         trigger: 'mobile',
    //     },
    //     {
    //         id: 'mobile',
    //         user: true,
    //         validator: (value) => {
    //             if (isNaN(value)) {
    //                 return 'Enter valid mobile number.';
    //             }
    //             else if (value.length === 10) {
    //                 setMobile(value)
    //                 return true;
    //             }
    //             else {
    //                 return 'Enter valid mobile number.'
    //             }
    //         },
    //         trigger: '5',
    //     },
    //     {
    //         id: '5',
    //         message: 'Thankyou! Your data has been submitted successfully!',
    //         trigger: 6,
    //     },
    //     {
    //         id: '6',
    //         message: 'Our team will contact you shortly.',
    //         trigger: 7,
    //     },
    //     {
    //         id: '7',
    //         delay: 100,
    //         component: (
    //             <div className='flex flex-col justify-center items-center font-[Roboto] text-sm'>
    //                 <Link href="/register" className="max-w-max rounded-md px-3.5 py-1 flex justify-center items-center m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-orange-500 text-indigo-600 hover:text-white">
    //                     <span className="absolute w-64 h-0 transition-all duration-500 origin-center rotate-45 -translate-x-20 bg-orange-500 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
    //                     <span className="relative text-orange-500 transition duration-300 group-hover:text-white ease">Register Complaint</span>
    //                 </Link>
    //                 <Link href="/partner" className="max-w-max rounded-md px-3.5 py-1 flex justify-center items-center m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-orange-500 text-indigo-600 hover:text-white">
    //                     <span className="absolute w-64 h-0 transition-all duration-500 origin-center rotate-45 -translate-x-20 bg-orange-500 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
    //                     <span className="relative text-orange-500 transition duration-300 group-hover:text-white ease">Partner with us</span>
    //                 </Link>
    //             </div>
    //         ),
    //         end: true,
    //     },
    // ];

    useEffect(()=> {
        const submit = async() => {
            if (name.length > 0 && email.toLowerCase().match(/^[a-z0-9]+@[a-z]+\.[a-z]{2,6}$/) && mobile.length === 10) {
                // console.log({ name, email, mobile })
                try{
                    await axios.post(`${url}/api/createchatdata`,{name,email,mobile})
                }
                catch(err){
                    console.log(err);
                }

                setName('');
                setEmail('');
                setMobile('');
            }
        }
        submit();
    },[name,email,mobile])


    return (
        <div className='main_icon z-50'>


          
 <div onClick={() => setShowBot((prev) => !prev)} className="main_icon rounded-full h-8 md:h-12 w-8 md:w-12 group border-2  cursor-pointer fixed bottom-28 md:bottom-36 right-4 text-orange-500 hover:text-orange-700 border-orange-400 flex justify-center items-center transition-all bg-white hover:bg-orange-400 300 ease-in-out">
                {/* <TbMessageChatbot className=' text-xl font-semibold md:text-2xl' /> */}

               <Chatbot />
                
            </div>
            
           


            {/* Chat Message */}
            {show2 && <div className='social_icons main_icon fixed flex  gap-2 md:gap-4 justify-center items-center bottom-16 md:bottom-20 right-14 md:right-20'>
                <span className='main_icon bg-green-500 h-8 md:h-12 w-8 md:w-12 cursor-pointer rounded-full flex justify-center items-center  text-white border-2 border-green-500 hover:bg-white hover:text-green-500
                '>
                    <AiOutlineWhatsApp className='text-xl md:text-2xl' />
                </span>
                <a href="tel:+917042490338" className='main_icon bg-blue-600 h-8 md:h-12 w-8 md:w-12 cursor-pointer rounded-full flex justify-center items-center text-white  border-2 border-blue-600 hover:bg-white hover:text-blue-600'>
                    <IoCall className=' text-xl font-semibold md:text-2xl' />
                </a>
                <span className='main_icon bg-red-600 h-8 md:h-12 w-8 md:w-12 cursor-pointer rounded-full flex justify-center items-center text-white  border-2 border-red-600 hover:bg-white hover:text-red-600'>
                    <CgMail className='text-xl md:text-2xl' />
                </span>
            </div>}


            {!show2 && <div onClick={() => { setShow2(true); setShow(false) }} className="main_icon rounded-full h-8 md:h-12 w-8 md:w-12 bg-white cursor-pointer fixed bottom-16 md:bottom-20 right-4  flex justify-center items-center border-2 border-orange-600 hover:bg-orange-600 transition-all 300 ease-in-out text-orange-600 hover:text-white">
                <MdContactPhone className=' text-xl font-semibold md:text-2xl' />
            </div>}
            {show2 && <div onClick={() => setShow2(false)} className="main_icon rounded-full h-8 md:h-12 w-8 md:w-12 bg-orange-600 cursor-pointer fixed bottom-16 md:bottom-20 right-4 flex justify-center items-center text-white border-2 border-orange-600 hover:border-orange-600 hover:bg-white hover:text-orange-600">
                <ImCross className='text-lg md:text-xl' />
            </div>}



            {/* Social Media */}
            {show && <div className='social_icons main_icon fixed flex  gap-2 md:gap-4 justify-center items-center bottom-4 right-14 md:right-20'>
                <a href="https://www.facebook.com/ICDRCOfficial/"
                 target="_blank" rel="noreferrer" className='main_icon bg-blue-500 h-8 md:h-12 w-8 md:w-12 cursor-pointer rounded-full flex justify-center items-center text-white  border-2 border-blue-500 hover:bg-white hover:text-blue-500'>
                    <AiFillFacebook className='text-xl md:text-2xl' />
                </a>
                <a href="https://twitter.com/ICDRC_Official"
                 target="_blank" rel="noreferrer" className='main_icon bg-gray-900 h-8 md:h-12 w-8 md:w-12 cursor-pointer rounded-full flex justify-center items-center text-white  border-2 border-gray-900 hover:bg-white hover:text-gray-900'>
                    <FaSquareXTwitter className='text-xl md:text-2xl' />
                </a>
                <a href="https://www.instagram.com/icdrc_official/"
                 target="_blank" rel="noreferrer" className='main_icon bg-pink-600 h-8 md:h-12 w-8 md:w-12 cursor-pointer rounded-full flex justify-center items-center text-white  border-2 border-pink-600 hover:bg-white hover:text-pink-600'>
                    <BsInstagram className='text-xl md:text-2xl' />
                </a>
                <a href="https://www.linkedin.com/in/icdrcofficial/"
                 target="_blank" rel="noreferrer" className='main_icon bg-blue-600 h-8 md:h-12 w-8 md:w-12 cursor-pointer rounded-full flex justify-center items-center text-white  border-2 border-blue-600 hover:bg-white hover:text-blue-600'>
                    <BsLinkedin className='text-xl md:text-2xl' />
                </a>
            </div>}

            {!show && <div onClick={() => { setShow(true); setShow2(false) }} className="main_icon rounded-full h-8 md:h-12 w-8 md:w-12 bg-orange-600 cursor-pointer fixed bottom-4 right-4 flex justify-center items-center text-white border-2 border-orange-600  hover:border-orange-600 hover:bg-white hover:text-orange-600">
                <IoShareSocialSharp className='text-xl md:text-2xl' />
            </div>}

            {show && <div onClick={() => setShow(false)} className="main_icon rounded-full h-8 md:h-12 w-8 md:w-12 bg-orange-600 cursor-pointer fixed bottom-4 right-4 flex justify-center items-center text-white border-2 border-orange-600 hover:border-orange-600 hover:bg-white hover:text-orange-600">
                <ImCross className='text-lg md:text-xl' />
            </div>}
        </div>
    )
}

export default SocialIcons;