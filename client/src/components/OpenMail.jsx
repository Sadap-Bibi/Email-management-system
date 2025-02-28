/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { MdDeleteOutline, MdOutlineMarkEmailUnread, MdOutlineReport, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BiArchiveIn } from "react-icons/bi";
import axios from "axios";

const OpenMail = () => {
  const { id } = useParams(); // Get email ID from URL
  const [email, setEmail] = useState(null); // State to store the email data
  const navigate = useNavigate();

  // Fetch email data based on the ID
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/email/messages/${id}`);
        setEmail(res.data);
      } catch (err) {
        console.error("Error fetching email:", err);
      }
    };

    fetchEmail();
  }, [id]); // Fetch email when the component mounts or ID changes

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this email?");
    if (!confirmDelete) return;
  
    try {
      // Get the JWT token from localStorage or wherever it's stored
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
  
      if (!token) {
        alert("You must be logged in to delete emails.");
        return;
      }
  
      // Send request to delete the email from the database
      await axios.delete(`http://localhost:3000/api/email/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Pass the token in the Authorization header
        }
      });
  
      // Redirect back to the inbox or any other route
      navigate("/app"); // You can change this to the route where you want to go after deletion
  
    } catch (err) {
      console.error("Error deleting email:", err);
      alert("Failed to delete email.");
    }
  };
  

  if (!email) {
    return <div className="text-center mt-10 text-red-500">Loading...</div>;
  }

  return (
    <div className="flex-1 bg-white rounded-xl mx-5 mt-5">
      {/* Header Section */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-gray-700 py-2">
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/app")}>
            <IoMdArrowBack size={"22px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <BiArchiveIn size={"22px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <MdOutlineReport size={"22px"} />
          </div>
          {/* Delete Button */}
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer" onClick={handleDelete}>
            <MdDeleteOutline size={"22px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <MdOutlineMarkEmailUnread size={"22px"} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MdKeyboardArrowLeft size={"22px"} className="rounded-full hover:bg-gray-200 cursor-pointer" />
          <p>1 - 0 pages</p>
          <MdKeyboardArrowRight size={"22px"} className="rounded-full hover:bg-gray-200 cursor-pointer" />
        </div>
      </div>

      {/* Mail Content */}
      <div className="h-[90vh] overflow-y-auto p-4">
        {/* Mail Subject & Date */}
        <div className="flex justify-between bg-white items-center gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium">{email.subject}</h1>
            <span className="text-sm bg-gray-200 rounded-md px-2">Inbox</span>
          </div>
          <div className="flex-none text-gray-400 my-5 text-sm">
            <p>{new Date(email.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Email Content */}
        <div className="mt-5 bg-gray-100 p-4 rounded-lg text-gray-700 whitespace-pre-line">
          <p>{email.message}</p>
        </div>
      </div>
    </div>
  );
};

export default OpenMail;
