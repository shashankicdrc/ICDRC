'use client';
import Image from 'next/image';


const Home5 = () => {
    return (
        <div className='my-2 md:pt-4 mb-8 bg-orange-200'>
            <h1 className='text-3xl md:text-6xl font-[Roboto] font-bold text-center px-8' data-aos="fade-up" data-aos-duration="1000">Why ICDRC ?</h1>
            <p className='text-gray-700 text-center font-medium text-md py-5  tracking-widest mx-auto px-8' data-aos="fade-up" data-aos-duration="1000">
                At ICDRC, we're committed to safeguarding what matters most to you, providing reliable insurance solutions for a worry-free future.
            </p>

            <div className='bg-orange-200 py-4 md:py-8'>
                <div className='m-14 gap-12 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>

                    <div className='border-2 bg-white border-gray-500 rounded-lg py-2 px-4'>
                        <Image src="/images/expert.png" alt="" className='rounded-xl mb-2 md:mb-4 w-full' data-aos="fade-up" data-aos-duration="1000" width={400} height={400} />
                        <h1 className='text-gray-900 text-xl md:text-2xl font-[Roboto] font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent' data-aos="fade-up" data-aos-duration="1000">
                            Expert Insurance Guidance
                        </h1>
                        <p className='text-gray-700 text-justify font-medium text-sm md:text-md py-2  tracking-wide mx-auto' data-aos="fade-up" data-aos-duration="1000">
                            Navigating insurance claims becomes effortless with ICDRC. Our experts simplify complex processes, ensure accurate filings, and negotiate for optimal outcomes, all while offering a contingency fee basis for peace of mind.
                        </p>
                    </div>

                    <div className='border-2 bg-white border-gray-500 rounded-lg py-2 px-4'>
                        <Image src="/images/Seamless.png" alt="" className='rounded-xl mb-2 md:mb-4 w-full' data-aos="fade-up"
                            data-aos-duration="1000" width={400} height={400} />
                        <h1 className='text-gray-900 text-xl md:text-2xl font-[Roboto] font-bold  bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent' data-aos="fade-up" data-aos-duration="1000">
                            Seamless Claim Handling
                        </h1>
                        <p className='text-gray-700 text-justify font-medium text-sm md:text-md py-2  tracking-wide mx-auto' data-aos="fade-up" data-aos-duration="1000">
                            ICDRC streamlines insurance claims. We aid individuals and businesses by explaining procedures, preventing delays, and leveraging our reputation for swift, successful settlements. Your success is our priority.
                        </p>
                    </div>

                    <div className='border-2 bg-white border-gray-500 rounded-lg  py-2 px-4'>
                        <Image
                            src="/images/client.png"
                            alt="image"
                            className='rounded-xl mb-2 md:mb-4 w-full'
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            width={400}
                            height={400}
                        />

                        <h1 className='text-gray-900 text-xl md:text-2xl font-[Roboto] font-bold  bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent' data-aos="fade-up" data-aos-duration="1000">
                            Client-Centric Assurance
                        </h1>
                        <p className='text-gray-700 text-justify font-medium text-sm md:text-md py-2  tracking-wide mx-auto' data-aos="fade-up" data-aos-duration="1000">
                            ICDRC prioritizes you. We're committed to simplifying claim settlements and optimizing results. Our experienced team ensures accurate documentation, minimizing hassles while working on a no-win, no-fee basis for your convenience.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home5
