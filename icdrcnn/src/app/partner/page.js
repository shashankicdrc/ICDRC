
"use client";
import { useEffect, useState } from 'react';

import Footer from '../../components/footer/page';
// import Home7Contact from '../../components/HomeComponents/Home7Contact/Home7Contact';
// import HomeNav from '../../components/Navbar/HomeNav';
// import SocialIcons from './../../components/SocialIcons/SocialIcons';

import { toast } from 'react-hot-toast';
// import Loader from '../../components/Loader/Loader'
import axios from 'axios';
import { url } from '../api';


const Partner = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [company, setCompany] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    function validateEmailAddress(email) {
        const pattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,6}$/;
        return pattern.test(email);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!validateEmailAddress(email)) {
            toast.error("Enter valid email address");
            return;
        }

        // console.log({ name, email, mobile, company });

        try {
            const res = await axios.post(`${url}/api/handlepartner`, {
                name, email, mobile, company
            })
            if (res?.data?.success) {
                setName('');
                setEmail('');
                setMobile('');
                setCompany('');
                toast.success(res.data.message)
            }
        }
        catch (err) {
            toast.error(err?.response?.data?.message);
        }

        setLoading(false);
    }

    return (
        <div className='overflow-hidden'>
            {/* <SocialIcons />
            <HomeNav /> */}

            <div className='' style={{ backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)` }}>
                <div className='flex bg-cover bg-no-repeat justify-center items-center h-screen w-screen px-4 md:px-0' style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                    <div
                        className=" rounded-xl relative mx-auto w-full max-w-md bg-white px-6 pt-10 mt-12 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
                        <div className="w-full">
                            <div className="text-center">
                                <h1 className="text-3xl font-semibold text-gray-900" data-aos="fade-up" data-aos-duration="1000">Partner With Us</h1>
                                <p className="mt-2 text-gray-500" data-aos="fade-up" data-aos-duration="1000">If you want to come on board as a Partner</p>
                            </div>
                            <div className="mt-5" data-aos="fade-up" data-aos-duration="1000">
                                <form onSubmit={handleSubmit}>
                                    <div className="relative mt-6">
                                        <input type="name" name="name" id="name" placeholder="Name" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autoComplete="off" value={name} onChange={e => setName(e.target.value)} required={true} />
                                        <label htmlFor="name" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Name</label>
                                    </div>

                                    <div className="relative mt-6">
                                        <input type="email" name="email" id="email" placeholder="Email Address" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)} required={true} />
                                        <label htmlFor="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                                    </div>
                                    <div className="relative mt-6">
                                        <input type="phone" name="mobile" id="mobile" placeholder="Phone Number" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autoComplete="off" maxLength={10} minLength={10} value={mobile} onChange={e => setMobile(e.target.value)} required={true} />
                                        <label htmlFor="mobile" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Mobile Number</label>
                                    </div>
                                    <div className="relative mt-6">
                                        <input type="text" name="company" id="company" placeholder="Company/Organization Name" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autoComplete="off" value={company} onChange={e => setCompany(e.target.value)} required={true} />
                                        <label htmlFor="company" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Company/Organization Name</label>
                                    </div>
                                    <div className="my-6">
                                        <button type="submit" className="w-full grid place-items-center rounded-md bg-orange-500 px-3 py-4 text-white focus:bg-orange-700 focus:outline-none">
                                            {
                                                loading ? <Loader color="white" />
                                                    : "Submit"
                                            }
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Home7Contact /> */}
            <Footer />
        </div>
    )
}

export default Partner
