
'use client'
 
import { useState } from 'react'



import { BsLinkedin } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import { BsYoutube } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { AiFillMail } from "react-icons/ai";
import Link from "next/link";
import { toast } from "react-hot-toast";
import axios from "axios";
import { url } from "../../app/api";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillFacebook } from "react-icons/ai";
import Image from 'next/image';
const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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

    console.log({ email });

    try {
      const res = await axios.post(`${url}/api/handlenewsletter`, {
        email,
      });
      if (res?.data?.success) {
        setEmail("");
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-900 border-t-2 border-gray-400">
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          <div
            className="md:max-w-md lg:col-span-2"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <a
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <Image
                src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1692866749/Logo/Copy_of_ICDRC_912_273_px_rwkrry.png"
                alt="logo"
                className="md:cursor-pointer h-24"
                width={200}
                height={50}
              />
            </a>
            <div className="mt-4 lg:max-w-sm">
              <p
                className="text-sm hover:text-orange-500  text-white font-semibold font-sans"
                data-aos="zoom-in"
                data-aos-duration="1000"
              >
                Your Trusted Insurance Claims and Dispute Resolution Partner!
                Looking for expert guidance with insurance claims or dispute
                resolution? Partner with us for a seamless experience. Our team
                of seasoned professionals is here to support you at every step.
              </p>
              <p className="mt-8 text-2xl text-gray-700 flex gap-8">
                <a
                  href="https://www.linkedin.com/in/icdrcofficial/"
                  rel="noreferrer"
                  target="_blank"
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                >
                  <BsLinkedin className="text-orange-500 hover:text-blue-600" />{" "}
                </a>

                <a
                  href="https://www.instagram.com/icdrc_official/"
                  rel="noreferrer"
                  target="_blank"
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                >
                  <GrInstagram className="text-orange-500 hover:text-pink-600" />{" "}
                </a>

                <a
                  href="https://www.facebook.com/ICDRCOfficial/"
                  rel="noreferrer"
                  target="_blank"
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                >
                  <AiFillFacebook className="text-orange-500 hover:text-blue-600" />{" "}
                </a>

                <a
                  href="https://www.youtube.com/@ICDRC_Official"
                  rel="noreferrer"
                  target="_blank"
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                >
                  <BsYoutube className="text-orange-500 hover:text-red-600" />{" "}
                </a>

                <a
                  href="https://twitter.com/ICDRC_Official"
                  rel="noreferrer"
                  target="_blank"
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                >
                  <FaSquareXTwitter className="text-orange-500 hover:text-blue-600" />{" "}
                </a>
              </p>
            </div>
          </div>

          <div className="" data-aos="zoom-in" data-aos-duration="1000">
            <div>
              <p className="font-bold text-lg tracking-wide text-orange-500">
                Menu
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="/"
                    className=" font-semibold text-white hover:text-orange-500 hover:font-semibold transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className=" font-semibold text-white hover:text-orange-500 hover:font-semibold transition-colors duration-300"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/casestudies"
                    className=" font-semibold text-white hover:text-orange-500 hover:font-semibold transition-colors duration-300"
                  >
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className=" font-semibold text-white hover:text-orange-500 hover:font-semibold transition-colors duration-300"
                  >
                    Our Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className=" font-semibold text-white hover:text-orange-500 hover:font-semibold transition-colors duration-300"
                  >
                    Register Complaint
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className=" font-semibold text-white hover:text-orange-500 hover:font-semibold transition-colors duration-300"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            {/* <div>
                            <p className="font-bold text-lg tracking-wide text-orange-500">
                                Other Links
                            </p>
                            <ul className="mt-2 space-y-2">
                                <li>
                                    <Link
                                        to="/partner"
                                        className=" font-semibold text-white hover:text-orange-500 hover:font-semibold transition-colors duration-300"
                                    >
                                        Partner With Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/login"
                                        className=" font-semibold text-white hover:text-orange-500 hover:font-semibold transition-colors duration-300"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/"
                                        className=" font-semibold text-white hover:text-orange-500 hover:font-semibold transition-colors duration-300"
                                    >
                                        Terms & Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/"
                                        className=" font-semibold text-white hover:text-orange-500 hover:font-semibold transition-colors duration-300"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/"
                                        className=" font-semibold text-white hover:text-orange-500 hover:font-semibold transition-colors duration-300"
                                    >
                                        Refund Ploicy
                                    </Link>
                                </li>

                            </ul>
                        </div> */}
          </div>

          <div
            className="md:max-w-md lg:col-span-2"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <div className="-mt-2 lg:max-w-sm">
              <p className="p-2 font-bold text-xl text-orange-500 font-[Roboto]">
                Address
              </p>
              <p className="p-2 text-sm hover:text-orange-500  text-white font-semibold font-sans items-start flex gap-2">
                Registered Office:
              </p>
              <p className="p-2 text-sm hover:text-orange-500  text-white font-semibold font-sans items-start flex gap-2">
                <ImLocation2 className="text-5xl  text-orange-500" /> A-62,
                BASEMENT, DDA SHED INDUSTRIAL AREA PHASE II Okhla Industrial
                Estate New Delhi New Delhi Delhi - 110020 India, Delhi, India,
                Delhi
              </p>

              <p className="p-2 text-sm hover:text-orange-500  text-white font-semibold font-sans items-start flex gap-2">
                Corporate Office:
              </p>

              <p className="p-2 text-sm hover:text-orange-500  text-white font-semibold font-sans items-start flex gap-2">
                <ImLocation2 className="text-5xl  text-orange-500" /> 6th Floor,
                Sanatan Building, Opposite CAG Office, Deendayal Upadhyay Marg,
                New Delhi
              </p>
            </div>
          </div>

          <div className="-mt-2 lg:max-w-sm">
            <p className="p-2 font-bold text-xl text-orange-500 font-[Roboto]">
              Contacts
            </p>

            <a
              href="tel:+917042490338"
              className="p-2 text-sm text-white hover:text-orange-500  font-semibold font-sans items-center flex gap-2"
            >
              <BsFillTelephoneInboundFill className="text-md text-orange-500" />{" "}
              +91-70424 90338
            </a>
            <a
              href="mailto:info@icdrc.in"
              className="p-2 hover:text-orange-500  text-sm text-white font-semibold font-sans items-center flex gap-2"
            >
              <AiFillMail className="text-md text-orange-500" /> info@icdrc.in
            </a>
            <a
              href="mailto:admin@icdrc.in"
              className="p-2 text-sm text-white hover:text-orange-500 font-semibold font-sans items-center flex gap-2"
            >
              <AiFillMail className="text-md text-orange-500" /> admin@icdrc.in
            </a>

            <form
              className="w-full flex grid lg:cal-span-3 justify-start gap-4 mt-4 ml-2"
              onSubmit={handleSubmit}
            >
              <div>
                <input
                  type="email"
                  placeholder="Subscribe for Newsletter"
                  className="mr-4 p-1 rounded-md focus:outline-none border-2 border-orange-600 font-sm text-base font-[Roboto]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-auto rounded-md px-3.5 py-1 flex justify-center items-center m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-orange-500 text-indigo-600 hover:text-white"
                >
                  <span className="absolute w-64 h-0 transition-all duration-500 origin-center rotate-45 -translate-x-20 bg-orange-500 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                  <span className="relative text-orange-500 transition duration-300 group-hover:text-white ease">
                    {loading ? "Wait..." : "Submit"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex  flex-col justify-center pt-5 pb-2 border-t sm:flex-row">
          <p className="text-sm text-white font-semibold font-sans">
            Copyrights Reserved © 2023{" "}
            <span className="text-orange-600 font-bold text-xl">
              <a
                href="https://www.icdrc.in"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-orange-600 text-xl"
              >
                ICDRC Services Pvt. Ltd.
              </a>
            </span>{" "}
            | All rights reserved | Designed, developed and maintained by{" "}
            <a
              href="https://www.webdesys.com"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-orange-600 text-xl"
            >
              WebDesys
            </a>
            .
          </p>
        </div>
        <div className="flex items-center justify-center mx-auto mt-1 pb-10 space-x-4 sm:mt-0">
          <Link
            href="/partner"
            className="text-sm text-white font-semibold font-sans transition-colors duration-300 hover:text-orange-500"
          >
            Partner with us
          </Link>
          <Link
            href="/privacy_policy"
            className="text-sm text-white font-semibold font-sans transition-colors duration-300 hover:text-orange-500"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms_conditions"
            className="text-sm text-white font-semibold font-sans transition-colors duration-300 hover:text-orange-500"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/refund_policy"
            className="text-sm text-white font-semibold font-sans transition-colors duration-300 hover:text-orange-500"
          >
            Refund Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
