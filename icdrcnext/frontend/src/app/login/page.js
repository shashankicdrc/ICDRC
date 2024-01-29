
"use client";
import { useEffect, useState } from 'react'

import Footer from '../../components/footer/page';
import HomeNav from '../../components/Navbar/page';
import Link from 'next/link';
import Home7Contact from '../../components/HomeComponents/Home7Contact';
import SocialIcons from '../../components/SocialIcons/page';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// import { Helmet } from 'react-helmet';

const Login = () => {
  // const [email,setEmail] = useState('');
  // const [password,setPassword] = useState('');

  const [show, setShow] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [])
  return (
    <div className='overflow-hidden'>
      <SocialIcons />
      <HomeNav />

      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>ICDRC: login</title>
        <link rel="canonical" href="" />
        <meta
          name="description"
          content="Connect with us, View your case status, client satisfaction. Witness our commitment to transparent processes and empowering individuals in their insurance claim experiences. "
        />
        <meta
          name="keywords"
          content="login page, register your complain, reliable insurance solutions, Our Success stories, ICDRC, successful claims, Insurance recovery, ICDRC official Claim advocates, Fast insurance settlements, InsuranceSamadhan Alternative"
        />
      </Helmet> */}


      <div className='' style={{ backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690784022/Home_page/Home1/homeslider2_zzybpj.webp)` }}>
        <div className='flex bg-cover bg-no-repeat justify-center items-center h-screen w-screen px-4 md:px-0' style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
          <div
            className=" rounded-xl relative mx-auto w-full max-w-md bg-white px-6 pt-10 mt-12 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
            <div className="w-full">
              <div className="text-center">
                <h1 className="text-3xl font-semibold text-gray-900" data-aos="fade-up" data-aos-duration="1000">Sign in</h1>
                <p className="mt-2 text-gray-500" data-aos="fade-up" data-aos-duration="1000">Sign in below to access your account</p>
              </div>
              <div className="mt-5" data-aos="fade-up" data-aos-duration="1000">
                <form>
                  <div className="relative mt-6">
                    <input type="email" name="email" id="email" placeholder="Email Address" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autoComplete="NA" />
                    <label htmlFor="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                  </div>
                  <div className="relative mt-6">
                    <input type={show ? "text" : "password"} name="password" id="password" placeholder="Password" className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                    <label htmlFor="password" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                    <span className='absolute top-4 right-2 text-gray-800 cursor-pointer text-md'
                      onClick={() => setShow((prev) => !prev)}
                    >
                      {
                        show ? <AiOutlineEyeInvisible className='text-lg' /> : <AiOutlineEye className='text-lg' />
                      }
                    </span>
                  </div>
                  <div className="my-6">
                    <button type="submit" className="w-full rounded-md bg-orange-500 px-3 py-4 text-white focus:bg-orange-700 focus:outline-none">Sign in</button>
                  </div>

                  <p className="text-center text-sm text-gray-700">Don&#x27;t have an account yet?
                    <Link href="/signup"
                      className="font-semibold text-gray-900 hover:underline focus:text-gray-900 focus:outline-none"> Sign
                      up
                    </Link>.
                  </p>

                  <div className='mt-4 flex flex-col justify-center items-center gap-4' data-aos="fade-up" data-aos-duration="1000">
                    <button
                      className="flex items-center bg-white border border-gray-800 rounded-lg shadow-md max-w-xs px-8 py-4 text-sm font-medium text-gray-800 hover:bg-orange-400 hover:text-white hover:border-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                      <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg"
                        viewBox="-0.5 0 48 48" version="1.1">

                        <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                          <g id="Color-" transform="translate(-401.000000, -860.000000)">
                            <g id="Google" transform="translate(401.000000, 860.000000)">
                              <path
                                d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                id="Fill-1" fill="#FBBC05"> </path>
                              <path
                                d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                id="Fill-2" fill="#EB4335"> </path>
                              <path
                                d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                id="Fill-3" fill="#34A853"> </path>
                              <path
                                d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                id="Fill-4" fill="#4285F4"> </path>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <span>Continue with Google</span>
                    </button>

                    <button
                      className="flex items-center bg-white border border-gray-800 rounded-lg shadow-md max-w-xs px-8 py-4 text-sm font-medium text-gray-800 hover:bg-orange-500 hover:text-white hover:border-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                      <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48" version="1.1">
                        <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                          <g id="Color-" transform="translate(-200.000000, -160.000000)" fill="#4460A0">
                            <path
                              d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z"
                              id="Facebook">

                            </path>
                          </g>
                        </g>
                      </svg>

                      <span>Continue with Facebook</span>
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Home7Contact />
      <Footer />
    </div>
  )
}

export default Login
