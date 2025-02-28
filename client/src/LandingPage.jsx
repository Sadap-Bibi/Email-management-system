/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-200 to-gray-400 text-center px-6">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 drop-shadow-lg">
        Welcome to Gmail
      </h1>
      <p className="text-lg text-gray-700 mb-8 max-w-md leading-relaxed">
        Your personal email experience, reimagined.
      </p>

      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg shadow-md transition duration-300 ease-in-out transform hover:bg-blue-700 hover:-translate-y-1"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 text-lg font-semibold bg-green-600 text-white rounded-lg shadow-md transition duration-300 ease-in-out transform hover:bg-green-700 hover:-translate-y-1"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
