import React, { useState } from 'react'
import './Home6.css'
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

const Home6 = () => {
    const [counterOn1, setCounterOn1] = useState(false);
    const [counterOn2, setCounterOn2] = useState(false);
    const [counterOn3, setCounterOn3] = useState(false);
    const [counterOn4, setCounterOn4] = useState(false);
    return (
        <div className='my-2 md:pt-4 mb-12 flex justify-around items-center flex-col'>
            <h1 className='text-gray-900 text-3xl md:text-6xl font-[Roboto] font-bold text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent px-8' data-aos="fade-up" data-aos-duration="1000">TRUST WE GAINED</h1>
            <p className='text-gray-700 text-center font-medium text-md py-2  tracking-widest mx-auto px-8' data-aos="fade-up" data-aos-duration="1000">
                At ICDRC, we're committed to safeguarding what matters most to you, providing reliable insurance solutions for a worry-free future.
            </p>
            <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-20 place-items-center">

                <div className="bg-orange-500 shadow-2xl p-4 md:p-6 rounded-2xl w-56 md:w-64">
                    <div className="flex items-center justify-center" data-aos="fade-up" data-aos-duration="1000">
                        <img src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1690786092/Home_page/Home6/1_iofzc9.svg" alt="" className='w-12 md:w-16' />
                    </div>
                    <div className="flex justify-center text-2xl md:text-4xl items-center font-bold mt-4 mb-2 text-white" data-aos="fade-up" data-aos-duration="1000">
                        <ScrollTrigger onEnter={() => setCounterOn1(true)} onExit={() => setCounterOn1(false)}>
                            {counterOn1 && <CountUp start={0} end={15000} duration={4} delay={0} />}+
                        </ScrollTrigger>
                    </div>
                    <div className="text-sm md:text-md flex justify-center items-center font-semibold text-white">Resolved Insurance Claims</div>
                </div>

                <div className="bg-orange-500 shadow-2xl p-4 md:p-6 rounded-2xl w-56 md:w-64">
                    <div className="flex items-center justify-center" data-aos="fade-up" data-aos-duration="1000">
                        <img src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1690786092/Home_page/Home6/2_xon0qo.svg" alt="" className='w-12 md:w-16' />
                    </div>
                    <div className="flex justify-center text-2xl md:text-4xl items-center font-bold mt-4 mb-2 text-white" data-aos="fade-up" data-aos-duration="1000">
                        <ScrollTrigger onEnter={() => setCounterOn2(true)} onExit={() => setCounterOn2(false)}>
                            {counterOn2 && <CountUp start={0} end={100} duration={2} delay={0} />}Cr +
                        </ScrollTrigger>
                    </div>
                    <div className="text-sm md:text-md flex justify-center items-center font-semibold text-white">Worth Claim Amount</div>
                </div>

                <div className="bg-orange-500 shadow-2xl p-4 md:p-6 rounded-2xl w-56 md:w-64">
                    <div className="flex items-center justify-center" data-aos="fade-up" data-aos-duration="1000">
                        <img src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1690786093/Home_page/Home6/3_cf52sx.svg" alt="" className='w-12 md:w-16' />
                    </div>
                    <div className="flex justify-center text-2xl md:text-4xl items-center font-bold mt-4 mb-2 text-white" data-aos="fade-up" data-aos-duration="1000">
                        <ScrollTrigger onEnter={() => setCounterOn3(true)} onExit={() => setCounterOn3(false)}>
                            {counterOn3 && <CountUp start={0} end={10000} duration={4} delay={0} />}+
                        </ScrollTrigger>
                    </div>
                    <div className="text-sm md:text-md flex justify-center items-center font-semibold text-white">Happy Customers across India</div>
                </div>

                <div className="bg-orange-500 shadow-2xl p-4 md:p-6 rounded-2xl w-56 md:w-64">
                    <div className="flex items-center justify-center" data-aos="fade-up" data-aos-duration="1000">
                        <img src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1690786093/Home_page/Home6/4_x2v19q.svg" alt="" className='w-12 md:w-16' />
                    </div>
                    <div className="flex justify-center text-2xl md:text-4xl items-center font-bold mt-4 mb-2 text-white" data-aos="fade-up" data-aos-duration="1000">
                        <ScrollTrigger onEnter={() => setCounterOn4(true)} onExit={() => setCounterOn4(false)}>
                            {counterOn4 && <CountUp start={0} end={3500} duration={3} delay={0} />}+
                        </ScrollTrigger>
                    </div>
                    <div className="text-sm md:text-md flex justify-center items-center font-semibold text-white">Strong Partner Network</div>
                </div>
            </div>
        </div>
    )
}

export default Home6
