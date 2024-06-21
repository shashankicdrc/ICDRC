import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { url } from "../../app/api";
import { PiFinnTheHuman } from "react-icons/pi";
import { IoMdSend } from "react-icons/io";
import "./module.Socialicon.css";
import Link from "next/link";

const ChatBot = ({ isheader }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [issue, setIssue] = useState("");

    const [messages, setMessages] = useState([
        {
            type: "bot",
            text: "Welcome to ICDRC! We're here to assist you with your concerns. To get started, could you please provide your Name?",
        },
    ]);
    const lastMessageRef = useRef(null);
    const chatContainerRef = useRef(null);

    const handleToggleChat = () => {
        setIsOpen(!isOpen);
        setStep(1);
    };

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [messages]);

    const handleSendMessage = (step, message) => {
        if (!step) return;
        if (step !== 1) {
            const newMessage = {
                text: message,
                type: "bot",
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
        const value = valueAttrChange();
        const userMessage = {
            text: value,
            type: "user",
        };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        if (step <= 4) {
            if (step === 4) {
                postFormData();
            }
            setStep((prevState) => prevState + 1);
        }
    };

    const postFormData = async () => {
        try {
            await axios.post(`${url}/api/createchatdata`, {
                name,
                email,
                mobile,
                issue,
            });
            setIssue(" ");
            console.log("Data posted successfully");
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };

    const getPromptMessage = () => {
        switch (step) {
            case 2:
                return `Thanks ${name}. What's your email address? This will help us reach out to you.`;
            case 3:
                return "Great! Could you please share your mobile number with us?";
            case 4:
                return "Thank you for sharing your contact details. Finally, could you briefly describe the issue or concern you're facing? This will help us understand how we can assist you better.";
            case 5:
                return `Thank you for providing your details and sharing your concern with us, . Your information has been forwarded to one of our experts. You can expect to hear from us soon.`;
        }
    };

    const chatBotStyle = {
        bottom: "1px",
        zIndex: "1000",
    };

    const chatBoxStyle = {
        width: "500px",
        height: "400px",
        borderRadius: "8px",
        backgroundColor: "white",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        position: "fixed",
        bottom: "60px",
        right: "20px",
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease-in-out",
        display: "flex",
        flexDirection: "column",
    };

    const changeHandler = (e) => {
        if (step === 1) setName(e.target.value);
        else if (step === 2) setEmail(e.target.value);
        else if (step === 3) setMobile(e.target.value);
        else if (step === 4) setIssue(e.target.value);
    };

    const valueAttrChange = () => {
        switch (step) {
            case 1:
                return name;
            case 2:
                return email;
            case 3:
                return mobile;
            case 4:
                return issue;
        }
    };

    console.log('set issue', issue)

    return (
        <div ref={chatContainerRef} style={chatBotStyle}>
            {isOpen && (
                <div
                    style={chatBoxStyle}
                    className="mr-12 max-w-[290px] md:max-w-[340px] overflow-hidden"
                >
                    <div className="bg-orange-500 w-full h-16 rounded-md text-white  flex items-center">
                        <PiFinnTheHuman className="text-4xl m-2 border text-orange-500 bg-white rounded-full p-2 " />
                        <div className="flex flex-col text-start ml-2 font-[Poppins]">
                            <span className="text-sm font-semibold text-white">
                                RakshaBot (रक्षा बोट)
                            </span>
                            <span className="text-xs font-base text-white">
                                Customer Communication
                            </span>
                        </div>
                    </div>

                    <section className="px-5 pt-5 pb-20 overflow-y-auto">
                        {messages.map((message, index) => (
                            <div
                                className={`flex bg-orange-500 max-w-60 text-white items-center rounded-md mb-5 px-5 min-h-10 ${message.type !== "bot" ? "ml-auto" : ""
                                    } `}
                                key={index}
                            >
                                {message.text}
                            </div>
                        ))}
                        {step !== 1 ? (
                            <div className="text-white  bg-orange-500 py-2 px-2 rounded-md mr-20">
                                {getPromptMessage()}
                            </div>
                        ) : null}
                        {step === 5 ? (
                            <div className="space-y-2 my-2">
                                <p className="text-white  bg-orange-500 py-2 px-2 rounded-md mr-20">
                                    Meanwhile, to register your complaint with us, kindly click on
                                    the below
                                </p>
                                <Link
                                    href="/register"
                                    className="b relative mx-auto h-16 w-64 flex justify-center items-center"
                                >
                                    <div className="i h-16 w-64 bg-orange-500 items-center rounded-xl shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 hover:bg-blue-500 transition duration-300 ease-out"></div>
                                    <div className="text-center text-white font-semibold z-10 pointer-events-none">
                                        Register your Complaint
                                    </div>
                                    <span className="absolute flex h-6 w-6 top-0 right-0 transform translate-x-2.5 -translate-y-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                                        <span className="absolute inline-flex rounded-full h-6 w-6 bg-blue-500"></span>
                                    </span>
                                </Link>
                            </div>
                        ) : null}
                        <div ref={lastMessageRef}></div>
                    </section>

                    <div
                        className="bg-orange-500 w-full h-12 flex justify-between 
            p-2 text-white absolute bottom-0 left-0"
                    >
                        <input
                            className="bg-orange-500 ml-2 placeholder:text-white outline-none rounded-md mr-2 text-white
                w-full border-orange-500 placeholder-white::placeholder"
                            type="text"
                            placeholder="Enter your input..."
                            value={valueAttrChange()}
                            disabled={step >= 5 ? true : false}
                            onChange={changeHandler}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleSendMessage(step, getPromptMessage());
                                }
                            }}
                        />
                        <button
                            className="bg-white p-2 rounded"
                            disabled={step >= 5 ? true : false}
                            onClick={(e) => {
                                e.preventDefault();
                                handleSendMessage(step, getPromptMessage());
                            }}
                        >
                            <IoMdSend className="text-orange-600 text-xl font-bold" />
                        </button>
                    </div>
                </div>
            )}
            <div
                style={{ cursor: "pointer" }}
                onClick={handleToggleChat}
                className={`${!isheader ? 'hover:bg-orange-500' : null} flex items-center`}
            >
                <span className={`${isheader ? 'mr-2' : null}`}>
                    {isheader ? "Chat Assistant" : ''}
                </span>
                <PiFinnTheHuman className={`text-orange-500 border-orange-600 ${!isheader ? 'hover:bg-orange-500' : null} hover:text-white text-2xl`} />
            </div>
        </div>
    );
};

export default ChatBot;
