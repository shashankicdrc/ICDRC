import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { url } from "../../app/api";
import { PiFinnTheHuman } from "react-icons/pi";
import { IoMdSend } from "react-icons/io";
import './module.Socialicon.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [messages, setMessages] = useState([
    {
      text:
        "Hi there! Welcome to ICDRC. We are India's most trusted platform for resolving Insurance Complaints.",
      type: "bot",
    },
  ]);

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    setStep(0);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    const userMessage = {
      text: `User: ${name}, ${email}, ${mobile}`,
      type: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    if (step < 3) {
      setStep(step + 1);
      setName("");
      setEmail("");
      setMobile("");
    } else {
      postFormData();
    }
  };

  const postFormData = async () => {
    try {
      await axios.post(`${url}/api/createchatdata`, {
        name,
        email,
        mobile,
      });
      console.log("Data posted successfully");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

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
    bottom: "1px",
    zIndex: "1000",
  };

  const chatBoxStyle = {
    width: "500px",
    height: "400px",
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
        <div style={chatBoxStyle} className="mr-12 max-w-80">
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
          <div
            style={{ padding: "20px", maxHeight: "350px", overflowY: "auto" }}
          >
            {messages.map((message, index) => (
              <div
                className="flex items-end justify-end ml-10 "
                key={index}
                style={{
                  backgroundColor:
                    message.type === "user" ? "#fff" : "#f97316",
                  color: message.type === "user" ? "#f97316" : "white",
                  fontWeight: message.type === "user" ? "bold" : "normal",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              >
                <div> {message.text} </div>
              </div>
            ))}
            <div className="">
            <div className="flex ">  <PiFinnTheHuman className="text-xl mr-3 mt-1" />
              <p className="mt-1 font-medium text-xs">RakshaBot</p></div>
              <div className="text-white border bg-orange-500 py-2 px-2 rounded-md mr-20">
                {getPromptMessage()}
              </div>
            </div>
          </div>
          <div className="bg-orange-500 ml-2 rounded-md mr-2 flex justify-between m-4 p-2 text-white">
            <input
              className="bg-orange-500 ml-2 placeholder:text-white outline-none rounded-md mr-2 text-white w-full border-orange-500 placeholder-white::placeholder"
              type="text"
              placeholder="Enter your input..."
              value={step === 0 ? name : step === 1 ? email : mobile}
              onChange={(e) => {
                if (step === 0) setName(e.target.value);
                else if (step === 1) setEmail(e.target.value);
                else if (step === 2) setMobile(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <button
              className="bg-white p-2 rounded"
              onClick={handleSendMessage}
            >
              <IoMdSend className="text-orange-600 text-xl font-bold" />
            </button>
          </div>
        </div>
      )}
      <div
        style={{ cursor: "pointer" }}
        onClick={handleToggleChat}
        className="hover:bg-orange-500"
      >
        <PiFinnTheHuman className="text-orange-500 border-orange-600 hover:bg-orange-500 hover:text-white text-2xl" />
      </div>
    </div>
  );
};

export default ChatBot;
