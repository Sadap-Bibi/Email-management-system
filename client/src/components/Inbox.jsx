/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { MdCropSquare, MdInbox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaCaretDown, FaUserFriends } from "react-icons/fa";
import { IoMdMore, IoMdRefresh } from "react-icons/io";
import { GoTag } from "react-icons/go";
import Emails from "./Emails";
import axios from 'axios'; 


const mailType = [
    { icon: <MdInbox />, text: "Primary" },
    { icon: <GoTag />, text: "Promotions" },
    { icon: <FaUserFriends />, text: "Social" },
];

function Inbox() {
    const [selected, setSelected] = useState(0);
    const [emails, setEmails] = useState([]);

    // Function to fetch emails based on selected mail type (if applicable)
    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/email/messages");
                setEmails(res.data); // Set fetched emails
            } catch (err) {
                console.error("Error fetching emails:", err);
            }
        };
        fetchEmails();
    }, [selected]); // Re-fetch emails when `selected` state changes (e.g., switching between tabs)

    return (
        <div className="flex-1 bg-white rounded-xl mx-16 my-6">
            <div className="flex items-center justify-between px-4 my-2">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <MdCropSquare size={"20px"} />
                        <FaCaretDown size={"20px"} />
                    </div>
                    <div className="p-2 rounded-full cursor-pointer">
                        <IoMdRefresh size={"20px"} />
                    </div>
                    <div className="p-2 rounded-full cursor-pointer">
                        <IoMdMore size={"20px"} />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <MdKeyboardArrowLeft />
                    <MdKeyboardArrowRight />
                </div>
            </div>

            <div className="h-90vh overflow-y-auto">
                <div className="flex items-center gap-1">
                    {mailType.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setSelected(index)}
                            className={`${
                                selected === index
                                    ? "border-b-4 border-b-blue-600 text-blue-600"
                                    : "border-b-transparent"
                            } flex items-center p-4 gap-5 w-52 hover:bg-gray-200 cursor-pointer`}
                        >
                            {item.icon}
                            <span>{item.text}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Pass emails data to the Emails component */}
            <Emails emails={emails} />
        </div>
    );
}

export default Inbox;
