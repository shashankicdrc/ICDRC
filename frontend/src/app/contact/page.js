"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import HomeNav from "../../components/Navbar/page";
import Footer from "../../components/footer/page";
import SocialIcons from "../../components/SocialIcons/page";
import { toast } from "react-hot-toast";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import { url } from "../api";
import Styles from "./Contact.module.css";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function validateMobileNumber(number) {
        const pattern = /^\+\d{1,3}\d{5,15}$/;
        return pattern.test(number);
    }

    function validateEmailAddress(email) {
        const pattern = /^[a-z0-9._]+@[a-z]+\.[a-z]{2,6}$/;
        return pattern.test(email);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!validateMobileNumber(mobile)) {
            toast.error("Enter valid mobile number");
            setLoading(false);

            return;
        }

        if (!validateEmailAddress(email)) {
            toast.error("Enter valid email address");
            setLoading(false);

            return;
        }

        console.log({ name, email, mobile, whatsapp, message });

        try {
            const res = await axios.post(`${url}/api/handlecontact`, {
                name,
                email,
                mobile,
                whatsapp,
                message,
            });
            if (res?.data?.success) {
                setName("");
                setEmail("");
                setMobile("");
                setWhatsapp("");
                setMessage("");
                toast.success(res.data.message);
            }
        } catch (err) {
            setLoading(false);
            toast.error(err?.response?.data?.message);
        }

        setLoading(false);
    };

    return (
        <div className="">
            <SocialIcons />
            <HomeNav />

            {/* <Helmet>
        <meta charSet="utf-8" />
        <title>ICDRC: Contact Us </title>
        <link rel="canonical" href="" />
        <meta
          name="description"
          content="Conatct us for reliable insurance solution and Fast insurance settlements. Contact ICDRC, ICDRC is Your Trusted Insurance Claims and Dispute Resolution Partner!."
        />
        <meta
          name="keywords"
          content="reliable insurance solutions, Our Success stories, ICDRC, successful claims, Insurance recovery, ICDRC official Claim advocates, Fast insurance settlements, InsuranceSamadhan Alternative"
        />
      </Helmet> */}

            <div
                className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
                style={{
                    backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)`,
                    height: "500px",
                }}
            >
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                >
                    <div className="mt-6 md:mt-10 flex h-full items-center justify-start md:ml-12 ml-3">
                        <div className="text-white flex justify-start flex-col">
                            <h2
                                className="mb-4 text-3xl md:text-5xl font-semibold text-start px-4 md:px-4"
                                data-aos="fade-up"
                                data-aos-duration="2000"
                            >
                                India’s most reliable and single
                                <br /> window solution platform
                            </h2>
                            <Link
                                href="/register"
                                data-aos="fade-up"
                                data-aos-duration="2000"
                                className="relative max-w-max ml-4 mt-4 inline-flex items-center px-12 py-3 overflow-hidden text-lg text-orange-500 font-bold border-2 border-orange-500 rounded-full hover:text-white group hover:bg-gray-50"
                            >
                                <span className="absolute left-0 block w-full h-0 transition-all bg-orange-400 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        ></path>
                                    </svg>
                                </span>
                                <span className="relative">Register Complaint</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <h1
                className="text-3xl capitalize mt-6 md:mt-8 md:text-6xl font-[Roboto] font-bold text-center px-8"
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                contact us now
            </h1>
            <p
                className="text-gray-700 text-center font-medium text-md py-2  tracking-widest mx-auto px-8"
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                At ICDRC, we're committed to safeguarding what matters most to you,
                providing reliable insurance solutions for a worry-free future.
            </p>

            {/* Contact Form */}
            <div className="contact-1 py-4 md:py-12">
                <div className="container mx-auto px-4">
                    <div className="xl:flex -mx-4">
                        <div className="xl:w-10/12 xl:mx-auto px-4">
                            <div className="md:flex md:-mx-4 mt-4 md:mt-10">
                                <div className="md:w-2/3 md:px-4">
                                    <form
                                        className="contact-form"
                                        onSubmit={handleSubmit}
                                        data-aos="fade-up"
                                        data-aos-duration="1000"
                                    >
                                        <div className="sm:flex sm:flex-wrap -mx-3">
                                            <div className="sm:w-1/2 px-3 mb-6">
                                                <input
                                                    type="text"
                                                    placeholder="Full Name"
                                                    className=" just border-2 rounded px-3  w-full focus:border-orange-500 input"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required={true}
                                                ></input>
                                            </div>
                                            <div className="sm:w-1/2 px-3 mb-6">
                                                <PhoneInput
                                                    international
                                                    countryCallingCodeEditable={false}
                                                    placeholder="Enter phone number"
                                                    defaultCountry="IN"
                                                    value={mobile}
                                                    required={true}
                                                    onChange={setMobile}
                                                    className="border-2 rounded px-3 py-1 w-full focus:border-orange-500 input"
                                                />
                                            </div>
                                            <div className="sm:w-1/2 px-3 mb-6">
                                                <input
                                                    type="email"
                                                    placeholder="E-mail address"
                                                    className="border-2 rounded px-3 py-1 w-full focus:border-orange-500 input"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required={true}
                                                />
                                            </div>

                                            <div className="sm:w-1/2 px-3 mb-6">
                                                <input
                                                    type="mobile"
                                                    name="mobile"
                                                    id="mobile"
                                                    placeholder="Whatspp number"
                                                    className="border-2 rounded px-3 py-1 w-full focus:border-orange-500 input"
                                                    minLength={10}
                                                    maxLength={10}
                                                    value={whatsapp}
                                                    onChange={(e) => setWhatsapp(e.target.value)}
                                                    required={true}
                                                />
                                            </div>
                                            <div className="sm:w-full px-3">
                                                <textarea
                                                    name="message"
                                                    id="message"
                                                    cols="30"
                                                    rows="4"
                                                    placeholder="Your message here"
                                                    className="border-2 rounded px-3 py-1 w-full focus:border-orange-500 input"
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    required={true}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="mt-4 md:mt-8">
                                            <button
                                                className="border-2 border-orange-500 rounded px-6 py-2 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300"
                                                type="submit"
                                            >
                                                {!loading ? "Send a Message" : "Sending..."}
                                                <i className="fas fa-chevron-right ml-2 text-sm"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <div className="md:w-1/3 md:px-4 mt-10 md:mt-0">
                                    <div
                                        className="bg-white border-2 border-orange-500 rounded-xl py-4 px-6"
                                        data-aos="fade-up"
                                        data-aos-duration="1000"
                                    >
                                        <h5 className="text-xl text-orange-500 font-medium mb-3">
                                            HELP
                                        </h5>
                                        <p className="text-gray-700 mb-4">
                                            Need help or have any query? Don't hesitate, you can
                                            directly shoot us an{" "}
                                            <a
                                                href="mailto:info@icdrc.in"
                                                className="text-orange-500 border-b border-transparent hover:border-orange-500 inline-block font-semibold"
                                            >
                                                email
                                            </a>{" "}
                                            or call us at{" "}
                                            <a
                                                href="tel:+917070717167"
                                                className="text-orange-500 font-semibold border-b border-transparent hover:border-orange-500 inline-block"
                                            >
                                                +91-7070717167
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Contact;
