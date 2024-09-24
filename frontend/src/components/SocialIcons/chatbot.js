import React, { useState, useEffect, useRef } from 'react';
import { PiFinnTheHuman } from 'react-icons/pi';
import { IoMdSend } from 'react-icons/io';
import './module.Socialicon.css';
import Link from 'next/link';
import { BASE_URL } from '../../lib/constant';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';

const ChatBot = ({ isheader }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [issue, setIssue] = useState('');

    const [messages, setMessages] = useState([
        {
            type: 'bot',
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
                behavior: 'smooth',
            });
        }
    }, [messages]);

    const handleSendMessage = (step, message) => {
        if (!step) return;

        if (step !== 1) {
            const newMessage = {
                text: message,
                type: 'bot',
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }

        const value = valueAttrChange();
        const userMessage = {
            text: value,
            type: 'user',
        };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Move to the next step if applicable
        if (step <= 4) {
            if (step === 4) {
                postFormData();
            }
            setStep((prevState) => prevState + 1);
        }

        // Clear the input field by resetting the state
        if (step === 1) setName('');
        else if (step === 2) setEmail('');
        else if (step === 3) setMobile('');
        else if (step === 4) setIssue('');
    };

    const postFormData = async () => {
        try {
            await fetch(`${BASE_URL}/api/chat-bots`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    mobile,
                    issue,
                }),
            });
        } catch (error) {
            toast.error(error.message);
            console.error('Error posting data:', error);
        }
    };

    const getPromptMessage = () => {
        switch (step) {
            case 2:
                return `Thanks ${name}. What's your email address? This will help us reach out to you.`;
            case 3:
                return 'Great! Could you please share your mobile number with us?';
            case 4:
                return "Thank you for sharing your contact details. Finally, could you briefly describe the issue or concern you're facing? This will help us understand how we can assist you better.";
            case 5:
                return `Thank you for providing your details and sharing your concern with us, . Your information has been forwarded to one of our experts. You can expect to hear from us soon.`;
        }
    };

    const chatBotStyle = {
        bottom: '1px',
        zIndex: '1000',
    };

    const chatBoxStyle = {
        width: '500px',
        height: '400px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        bottom: '60px',
        right: '20px',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
    };

    const changeHandler = (e) => {
        const value = e.target.value;
        if (step === 1) setName(value);
        else if (step === 2) setEmail(value);
        else if (step === 3) setMobile(value);
        else if (step === 4) setIssue(value);
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
            default:
                return '';
        }
    };

    const handleClickOutside = (event) => {
        if (
            chatContainerRef.current &&
            !chatContainerRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div
            ref={chatContainerRef}
            style={chatBotStyle}
            className={isheader ? 'text-foreground' : ''}
        >
            {isOpen && (
                <div
                    style={chatBoxStyle}
                    className="mr-12 bg-muted max-w-[290px] md:max-w-[340px] overflow-hidden"
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
                                className={`flex  max-w-60  border bg-background py-1 items-center rounded-md mb-5 px-5 min-h-10 ${
                                    message.type !== 'bot' ? 'ml-auto' : ''
                                } `}
                                key={index}
                            >
                                {message.text}
                            </div>
                        ))}
                        {step !== 1 ? (
                            <div className="py-2 px-2 rounded-md mr-20 border bg-background">
                                {getPromptMessage()}
                            </div>
                        ) : null}
                        {step === 5 ? (
                            <div className="space-y-2 my-2 ">
                                <p className="py-2 px-2  mr-20 border rounded-md bg-background">
                                    Meanwhile, to register your complaint with
                                    us, kindly click on the link below
                                </p>
                                <Button aschild>
                                    <Link href="/dashboard/register">
                                        Register Your Complaint
                                    </Link>
                                </Button>
                                <div className="border px-2 py-1 bg-background rounded-md w-fit">
                                    Or
                                </div>
                                <Button aschild>
                                    <Link href="/#subscription">
                                        Subscribe Now
                                    </Link>
                                </Button>
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
                                if (e.key === 'Enter') {
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
                style={{ cursor: 'pointer' }}
                onClick={handleToggleChat}
                className={`flex items-center`}
            >
                <span
                    className={`${isheader ? 'mr-2 text-white' : null} hidden md:block text-sm`}
                >
                    {isheader ? 'Chat With Assistant' : ''}
                </span>
                {isheader ? (
                    <Image
                        src="/images/11.webp"
                        alt="chatbot"
                        width={50}
                        height={40}
                    />
                ) : (
                    <PiFinnTheHuman className="text-orange-500 border-orange-600 hover:text-white text-2xl" />
                )}
            </div>
        </div>
    );
};

export default ChatBot;
