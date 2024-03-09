'use client'
import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";
import './Socialicon.module.css';

import { useEffect, useRef, } from 'react';
import { url } from '../../app/api';
import axios from 'axios'

import { PiFinnTheHuman } from "react-icons/pi";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [messages, setMessages] = useState([
    {
      text:
        "Hi there 👋🏻! Welcome to ICDRC. We are India's most trusted platform for resolving Insurance Complaints..",
      type: "bot",
    },
  ]);

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    setStep(0);
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom when messages change
  }, [messages]);

  const handleSendMessage = () => {
    const userMessage = {
      text: `User: ${name}, ${email}, ${mobile}`,
      type: "user",
    };
    const botMessage = {
      text: "Thank you for providing your information!",
      type: "bot",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);

    if (step < 3) {
      
      setStep(step + 1);
    setName(''); // Clear input field after every step
    setEmail('');
    setMobile('');
    } else {
      setTimeout(() => {
        setIsOpen(false); // Close the chatbot after 2 seconds
      }, 2000);
    }
  };



  useEffect(()=> {
    const submit = async() => {
        if (name.length > 0 && email.toLowerCase().match(/^[a-z0-9]+@[a-z]+\.[a-z]{2,6}$/) && mobile.length === 10) {
            console.log({ name, email, mobile })
            try{
                await axios.post(`${url}/api/createchatdata`,{name,email,mobile})
            }
            catch(err){
                console.log(err);
            }

            setName('');
            setEmail('');
            setMobile('');
        }
    }
    submit();
},[name,email,mobile])


  const getPromptMessage = () => {
    switch (step) {
      case 0:
        return "Please enter your name:";
      case 1:
        return "Great! Now, enter your email address:";
      case 2:
        return "Final step! Enter your Mobile number:";
      case 3:
        return "Thank you for providing your information! Our Team Will contact with you soon.";
      default:
        return "";
    }
  };

  const chatBotStyle = {
    // position: 'fixed',
    bottom: "1px",
    // right: '20px',
    zIndex: "1000",
  };

  const chatBoxStyle = {
    width: "500px",

    height: "400px",
    // border: "1px solid gray",
    borderRadius: "8px",
    overflow: "hidden",
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

  

  return (
    <div ref={chatContainerRef} style={chatBotStyle}>
      {isOpen && (
        <div  style={chatBoxStyle} className=" mr-12 max-w-80">
          <div className="">
            <div  className="bg-orange-500 w-full h-16 rounded-md text-white  flex items-center">
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
          </div>

          <div
            style={{ padding: "20px", maxHeight: "350px", overflowY: "auto" }}
          >
            {messages.map((message, index) => (
              <div
                className="flex items-end justify-end ml-10 "
                key={index}
                style={{
                  backgroundColor: message.type === "user" ? "#fff" : "#f97316",
                  color: message.type === "user" ? "#f97316" : "white",
                  fontWeight: message.type === "user" ? "bold" : "normal",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              >
                {/* <div className="flex items-center "><FaUserCheck className="text-xl mr-3 mt-1" /> <p className=" mt-1 font-medium text-xs">user</p></div> */}

                <div> {message.text} </div>
              </div>
            ))}

            <div className="">
              {" "}
              <div className="flex items-center ">
                <PiFinnTheHuman className="text-xl mr-3 mt-1" />{" "}
                <p className=" mt-1 font-medium text-xs">RakshaBot</p>
              </div>
              <div className=" text-white border bg-orange-500 py-2 px-2 rounded-md mr-20">
                {getPromptMessage()}
              </div>
            </div>
          </div>
          {/* <div className=" bg-orange-500 ml-2 rounded-md mr-2 flex justify-between m-4 p-2 text-white ">
            <input
              className="bg-orange-500 ml-2 rounded-md mr-2  text-white w-full border-orange-500"
              type="text"
              placeholder="Enter your input..."
              value={step === 0 ? name : step === 1 ? email : Mobile}
              onChange={(e) => {
                if (step === 0) setName(e.target.value);
                else if (step === 1) setEmail(e.target.value);
                else if (step === 2) setMobile(e.target.value);
                else if (step === 3);
              }}
              // Adjusted input style
            />
            <button
              className="bg-white p-2 rounded"
              onClick={handleSendMessage}
            >
              <IoMdSend className="text-orange-600 text-xl font-bold" />
            </button>
          </div> */}

<div className="bg-orange-500 ml-2 rounded-md mr-2 flex justify-between m-4 p-2 text-white">
<input
  className="bg-orange-500 ml-2 placeholder:text-white outline-none  rounded-md mr-2 text-white w-full border-orange-500 placeholder-white::placeholder"
  type="text"
  placeholder="Enter your input..."
  value={step === 0 ? name : step === 1 ? email : mobile}
  onChange={(e) => {
    if (step === 0) setName(e.target.value);
    else if (step === 1) setEmail(e.target.value);
    else if (step === 2) setMobile(e.target.value);
    // No need for the condition for step 3
  }}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      // Handle form submission here, for example:
      e.preventDefault(); // Prevents default form submission behavior
      handleSendMessage(); // Replace handleFormSubmit with your form submission logic
    }
  }}
/>
  <button className="bg-white p-2 rounded" onClick={handleSendMessage}>
    <IoMdSend className="text-orange-600 text-xl font-bold" />
  </button>
</div>




        </div>
      )}
      <div
        style={{ cursor: "pointer" }}
        onClick={handleToggleChat}
        className=" hover:bg-orange-500 "
      >
        <PiFinnTheHuman
          className="text-orange-500 border-orange-600 hover:bg-orange-500 hover:text-white text-2xl"
          onClick={handleToggleChat}
        />
        {/* <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPEulAZkIAPYseBZzyO-VechpLx2BUnwJ6VfhqDyusrw&s" alt='ICDRC ' style={iconStyle}  onClick={handleToggleChat} /> */}
      </div>
    </div>
  );
};

export default ChatBot;
