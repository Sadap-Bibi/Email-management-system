/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { MdOutlineClear, MdFullscreen } from "react-icons/md";

const SendMessage = ({ onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (!from || !to || !subject || !message) {
      alert("All fields (from, to, subject, message) are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized. Please log in.");
        return;
      }

      const response = await fetch("http://localhost:3000/api/email/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ from, to, subject, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccessMessage(true);
        setFrom('');
        setTo('');
        setSubject('');
        setMessage('');
        setTimeout(() => {
          setShowSuccessMessage(false);
          window.location.reload();
        }, 2000);
      } else {
        alert(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred while sending the message.");
    }
  };

  return (
    <div
      className={`absolute ${
        isExpanded
          ? "top-0 left-0 w-full h-full bg-white p-8"
          : "bottom-0 right-[20%] bg-white w-[400px] p-4 rounded-lg shadow-2xl transition-all"
      }`}
    >
      <div className="flex justify-between items-center border-b pb-3">
        <p className="text-lg font-semibold text-gray-800">New Message</p>
        <div className="flex gap-2">
          <MdFullscreen
            className="text-gray-500 cursor-pointer hover:text-gray-700"
            size={20}
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <MdOutlineClear
            className="text-gray-500 cursor-pointer hover:text-gray-700"
            size={20}
            onClick={onClose}
          />
        </div>
      </div>

      <div className="mt-3 space-y-3">
        <input
          type="text"
          placeholder="From"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="To"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          name="main_content"
          placeholder="Write your message here..."
          className="w-full p-3 border border-gray-300 rounded-md h-32 resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>

      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors"
          onClick={handleSend}
        >
          Send
        </button>
      </div>

      {showSuccessMessage && (
        <div className="mt-3 text-green-600 font-semibold text-center">
          Message sent successfully!
        </div>
      )}
    </div>
  );
};

export default SendMessage;
