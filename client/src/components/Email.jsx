/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { MdCropSquare } from "react-icons/md";
import { RiStarSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export const Email = ({ id, title, description, timestamp }) => {
  const navigate = useNavigate();

  const openMail = () => {
    console.log("Email Clicked:", id);
    navigate(`/app/mail/${id}`);
  };
  
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      openMail();
    }
  };

  return (
    <div
      onClick={openMail}
      onKeyDown={handleKeyDown} // Keyboard accessibility
      role="button"
      tabIndex="0"
      className="flex items-center justify-between border-b border-gray-200 p-4 hover:shadow-lg cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <button type="button" aria-label="Select Email">
          <MdCropSquare size={22} className="text-gray-400" />
        </button>
        <button type="button" aria-label="Star Email">
          <RiStarSLine className="text-gray-400 hover:text-yellow-500" />
        </button>
        <div className="font-semibold text-gray-900">{title}</div>
      </div>

      <div className="flex-1 ml-4 text-gray-500 truncate">{description}</div>

      <div className="flex-none text-gray-500 text-sm">
        <span className="text-gray-400">{new Date(timestamp).toLocaleString()}</span>
      </div>
    </div>
  );
};
