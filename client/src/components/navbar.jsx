/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { MdApps } from "react-icons/md";
import Cookies from 'js-cookie';  // Import js-cookie

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("userToken");

    if (token) {
      try {
        // Decode token and set user details from cookie
        setUserName(Cookies.get("userName") || 'Guest User');
        setUserEmail(Cookies.get("userEmail") || 'guest@example.com');
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      const storedName = Cookies.get('userName') || 'Guest User';
      const storedEmail = Cookies.get('userEmail') || 'guest@example.com';
      setUserName(storedName);
      setUserEmail(storedEmail);
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleSignOut = () => {
    try {
      console.log("Signing out...");
      const token = Cookies.get("userToken");

      if (!token) {
        console.warn("No token found in cookies!");
      } else {
        Cookies.remove("userToken");
        Cookies.remove("userName");
        Cookies.remove("userEmail");
        console.log("Token and user info removed successfully.");
      }

      navigate("/login");
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between bg-white h-16 px-6">
      {/* Left Menu */}
      <div className="flex items-center gap-4">
        <RxHamburgerMenu className="text-xl text-gray-700 cursor-pointer" />
        <img
          src="https://cdn-icons-png.freepik.com/512/5968/5968534.png"
          alt="Gmail Logo"
          className="h-10 w-10"
        />
        <h2 className="text-2xl font-semibold text-gray-800">Gmail</h2>
      </div>

      {/* Search Area */}
      <div className="flex-1 flex justify-center relative">
        <div className="flex items-center border border-gray-300 px-4 py-2 rounded-full w-1/3 focus-within:ring-2 focus-within:ring-blue-400">
          <FaSearch className="text-xl text-gray-500" />
          <input
            type="text"
            placeholder="Search mail"
            className="w-full bg-transparent outline-none pl-2 text-sm text-gray-800 placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Handle input change
          />
          <HiAdjustmentsHorizontal className="text-xl text-gray-600 cursor-pointer" />
        </div>
      </div>

      {/* Right Menu */}
      <div className="flex items-center gap-6 relative">
        {/* Compose Button */}
        <button className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full">
          <BiPlus className="text-xl" />
        </button>

        {/* Google Apps Icon */}
        <MdApps className="text-2xl text-gray-700 cursor-pointer" />

        {/* User Profile */}
        <div className="relative">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6T22hjg-27EwUwJlnyIY5uNDm_NoXr3I5ZlqEhH86thsrkbuUc6PrgXykltpo3kKj3HU&usqp=CAU"
              alt="User Profile"
              className="h-10 w-10 rounded-full border-2 border-gray-300"
            />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg py-4">
              <div className="flex flex-col items-center px-4 pb-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6T22hjg-27EwUwJlnyIY5uNDm_NoXr3I5ZlqEhH86thsrkbuUc6PrgXykltpo3kKj3HU&usqp=CAU"
                  alt="User Profile"
                  className="h-16 w-16 rounded-full mb-2"
                />
                <p className="font-bold text-gray-800">{userName}</p>
                <p className="text-sm text-gray-600">{userEmail}</p>
              </div>
              <hr className="border-gray-200" />
              <button
                className="flex items-center justify-center gap-2 px-4 py-2 w-full text-gray-800 hover:bg-gray-100 text-sm"
                onClick={() => console.log("Add account clicked")}
              >
                <BiPlus className="text-lg" /> Add account
              </button>
              <button
                className="flex items-center justify-center gap-2 px-4 py-2 w-full text-red-600 hover:bg-gray-100 text-sm"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
              <hr className="border-gray-200 my-2" />
              <div className="flex justify-center text-xs text-gray-500">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
                <span className="mx-2">·</span>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
