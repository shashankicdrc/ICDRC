import React, { useState } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const [messages, setMessages] = useState([
    { 
      text: "Hi there 👋🏻! Welcome to ICDRC. We are India's most trusted platform for resolving Insurance Complaints..", 
      type: 'bot' 
    },
  ]);
  
  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    setStep(0);
  };

  const handleSendMessage = () => {
    const userMessage = { text: `User: ${name}, ${email}, ${phone}`, type: 'user' };
    const botMessage = { text: 'Thank you for providing your information!', type: 'bot' };

    setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);

    if (step < 2) {
      setStep(step + 1);
    } else {
      setIsOpen(false);
    }
  };

  const getPromptMessage = () => {
    switch (step) {
      case 0:
        return 'Please enter your name:';
      case 1:
        return 'Great! Now, enter your email address:';
      case 2:
        return 'Final step! Enter your phone number:';
      default:
        return '';
    }
  };

  const chatBotStyle = {
    position: 'fixed',
    bottom: '1px',
    right: '20px',
    zIndex: '999',
  };

  const chatBoxStyle = {
    width: '500px',
    height:'400px',
    border: '5px solid black',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#f97316',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    bottom: '60px',
    right: '20px',
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
  };

  const messageStyle = {
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '10px',
    color: '#f97316',
    backgroundColor: '#fff',
  };

  const inputContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    borderRadius: '8px',
    cursor: 'pointer',
  };
                                             
  const buttonStyle = {
    padding: '20px',
    backgroundColor: '#fff',
    color: '#ffa500',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const iconStyle = {
    width: '60px',
    height: '60px',
    cursor: 'pointer',
  };

  return (
    <div style={chatBotStyle}>
      {isOpen && (
        <div style={chatBoxStyle}>
          <div style={{ padding: '20px', maxHeight: '200px', overflowY: 'auto' }}>
            {messages.map((message, index) => (
              <div key={index} style={messageStyle}>
                {message.text}
              </div>
            ))}
            
          </div>
          

          <div style={{ padding: '20px', maxHeight: '350px', overflowY: 'auto' }}>
  {messages.map((message, index) => (
    <div
      key={index}
      style={{

        backgroundColor: message.type === 'user' ? '#fff' : '#f97316',
        color: message.type === 'user' ? '#f97316' : 'black',
        fontWeight: message.type === 'user' ? 'bold' : 'normal',
        padding: '10px',
        borderRadius: '8px',
        marginBottom: '10px',

      }}
    >
      {message.text}
    </div>
  ))}
  <div style={{ padding: '20px', backgroundColor: '#fff', fontStyle: 'italic', color: '#ffa500' }}>
    {getPromptMessage()}
  </div>
</div>
<div style={inputContainerStyle}>
  <input
    type="text"
    placeholder="Enter your input..."
    value={step === 0 ? name : step === 1 ? email : phone}
    onChange={(e) => {
      if (step === 0) setName(e.target.value);
      else if (step === 1) setEmail(e.target.value);
      else if (step === 2) setPhone(e.target.value);
    }}
    style={{ flex: '1', marginRight: '10px' }} // Adjusted input style
  />
  <button style={buttonStyle} onClick={handleSendMessage}>
    <img src="send-icon.png" alt="Send" style={{ width: '20px', height: '20px' }} /> {/* Send icon */}
  </button>
</div>

        </div>
      )}
      <div style={{ cursor: 'pointer' }} onClick={handleToggleChat}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPEulAZkIAPYseBZzyO-VechpLx2BUnwJ6VfhqDyusrw&s" alt='ICDRC ' style={iconStyle}  onClick={handleToggleChat} />
      </div>
    </div>
  );
};

export default ChatBot;
