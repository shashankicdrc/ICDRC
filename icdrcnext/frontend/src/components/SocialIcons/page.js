import React, { useState } from 'react'
import './SocialIcons.css'
import { IoShareSocialSharp } from 'react-icons/io5'
import { TbMessageChatbot } from 'react-icons/tb'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { AiFillFacebook } from 'react-icons/ai'
import { BsInstagram } from 'react-icons/bs'
import { BsLinkedin } from 'react-icons/bs'
import { ImCross } from 'react-icons/im'
import { MdContactPhone } from 'react-icons/md'
import { CgMail } from 'react-icons/cg'
import { FiTwitter } from 'react-icons/fi'
import { IoCall } from 'react-icons/io5'

const oldSocialIcons = () => {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    return (
        <div className='main_icon'>
            <div className="main_icon rounded-full h-8 md:h-12 w-8 md:w-12 group bg-white border-2 border-orange-600 hover:bg-orange-600 cursor-pointer fixed bottom-28 md:bottom-36 right-4  flex justify-center items-center transition-all 300 ease-in-out text-orange-600 hover:text-white">
                <TbMessageChatbot className=' text-xl font-semibold md:text-2xl' />
            </div>


            {/* Chat Message */}
            {show2 && <div className='social_icons main_icon fixed flex  gap-2 md:gap-4 justify-center items-center bottom-16 md:bottom-20 right-14 md:right-20'>
                <span className='main_icon bg-green-500 h-8 md:h-12 w-8 md:w-12 cursor-pointer rounded-full flex justify-center items-center  text-white border-2 border-green-500 hover:bg-white hover:text-green-500
                '>
                    <AiOutlineWhatsApp className='text-xl md:text-2xl' />
                </span>
                <a href="tel:+919554555557" className='main_icon bg-blue-600 h-8 md:h-12 w-8 md:w-12 cursor-pointer rounded-full flex justify-center items-center text-white  border-2 border-blue-600 hover:bg-white hover:text-blue-600'>
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
                <span className='main_icon bg-blue-500 h-8 md:h-12 w-8 md:w-12 cursor-pointer rounded-full flex justify-center items-center text-white  border-2 border-blue-500 hover:bg-white hover:text-blue-500'>
                    <AiFillFacebook className='text-xl md:text-2xl' />
                </span>
                <span className='main_icon bg-blue-500 h-8 md:h-12 w-8 md:w-12 cursor-pointer rounded-full flex justify-center items-center text-white  border-2 border-blue-500 hover:bg-white hover:text-blue-500'>
                    <FiTwitter className='text-xl md:text-2xl' />
                </span>
                <span className='main_icon bg-pink-600 h-8 md:h-12 w-8 md:w-12 cursor-pointer rounded-full flex justify-center items-center text-white  border-2 border-pink-600 hover:bg-white hover:text-pink-600'>
                    <BsInstagram className='text-xl md:text-2xl' />
                </span>
                <span className='main_icon bg-blue-600 h-8 md:h-12 w-8 md:w-12 cursor-pointer rounded-full flex justify-center items-center text-white  border-2 border-blue-600 hover:bg-white hover:text-blue-600'>
                    <BsLinkedin className='text-xl md:text-2xl' />
                </span>
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

export default oldSocialIcons
