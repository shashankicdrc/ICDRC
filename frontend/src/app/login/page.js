"use client";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";

import Footer from '../../components/footer/page';
import HomeNav from '../../components/Navbar/page';
import Link from 'next/link';
import Home7Contact from '../../components/HomeComponents/Home7Contact';
import SocialIcons from '../../components/SocialIcons/page';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { loginUser } from '../../features/UserSlice';
import ForgotPassword from '../../components/forgetPassword/ForgotPassword';
import { signIn } from "next-auth/react";
// import { useSession } from "next-auth/react";




const Login = () => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    // const { status, data: session } = useSession();

    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state) => state.user);

// google auth routing 

    // useEffect(()=>{
    //   if (status === "authenticated"){
    //     router.push('/myprofile')
    //   }
    // })

    // email password routing

    useEffect(() => {
      if (user._id) {
        console.log(user)
          router.push('/myprofile')
      }
     
  }, [router, user])

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [])

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      let user = { email, password };
      // console.log(user);
      dispatch(loginUser(user)).then(() => {
          setLoading(false);
      });
  }

  

  const [show, setShow] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [])
  return (
    <div className='overflow-hidden'>
      <SocialIcons />
      <HomeNav />


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
                <form type="submit" onSubmit={handleSubmit}>
                  <div className="relative mt-6">
                    <input type="email" name="email" id="email" placeholder="Email" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autoComplete="NA" value={email} required={true} onChange={(e)=> setEmail(e.target.value)} />
                    <label htmlFor="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                  </div>
                  <div className="relative mt-6">
                    <input type={show ? "text" : "password"} name="password" id="password" placeholder="Password" className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" value={password} required={true} onChange={(e)=> setPassword(e.target.value)} />
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
                    <button type="submit" className="w-full rounded-md bg-orange-500 px-3 py-4 text-white focus:bg-orange-700 focus:outline-none">Signin</button>
                  </div>

                  <p className="text-center text-sm text-gray-700">Don&#x27;t have an account yet?
                    <Link href="/signup"
                      className="font-semibold text-gray-900 hover:underline focus:text-gray-900 focus:outline-none"> Sign
                      up
                    </Link>.
                  </p>

                  <div className='mt-4 flex flex-col justify-center items-center gap-4' data-aos="fade-up" data-aos-duration="1000">

                  <div className='flex justify-end'>
                                    <ForgotPassword />
                                </div>
                    {/* google Outh login system */}


                  <div className='flex justify-center items-center bg-gray-200 text-gray-800 font-medium py-2 px-2 rounded-md'>  <FcGoogle /><button className='bg-gray-200 text-gray-800 font-medium px-2 rounded-md' onClick={() => signIn("google")}>Signin with google</button>

                  </div>

                 
                    
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
