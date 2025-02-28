/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { LuPencil } from "react-icons/lu";
import { MdInbox, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaStar, FaPaperPlane, FaTrash } from "react-icons/fa";
import SendMessage from "./SendMessage"; // Import the component

const sidebarItems = [
  { icon: MdInbox, label: "Inbox", path: "/inbox" },
  { icon: FaStar, label: "Starred", path: "/starred" },
  { icon: FaPaperPlane, label: "Sent", path: "/sent" },
  { icon: FaTrash, label: "Trash", path: "/trash" },
  { icon: MdOutlineKeyboardArrowDown, label: "More" },
];

export default function Sidebar() {
  const [showMessage, setShowMessage] = useState(false); // State to show/hide

  return (
    <div className="w-1/5 min-w-[145px] ">
      {/* Compose Button */}
      <div className="p-3">
        <button
          onClick={() => setShowMessage(true)} 
          className="flex items-center gap-2 bg-[#C2E7FF] p-4 rounded-2xl hover:shadow-md"
        >
          <LuPencil size={24} />
          <span>Compose</span>
        </button>
      </div>

      {/* Sidebar Items */}
      <div className="text-gray-600">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center pl-6 py-2 rounded-r-full gap-4 my-1 hover:bg-gray-200 cursor-pointer"
          >
            <item.icon size={20} />
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      {/* New Message Form (Only Show If State is True) */}
      {showMessage && <SendMessage onClose={() => setShowMessage(false)} />}
    </div>
  );
}
