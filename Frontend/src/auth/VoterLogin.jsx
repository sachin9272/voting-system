import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdHowToVote } from "react-icons/md";
import { Link } from "react-router-dom";

const VoterLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 flex items-center justify-center relative px-4">

      {/* Login Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8">

        {/* Top Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-xl shadow-sm">
            <MdHowToVote className="text-blue-600 text-3xl" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Voter Login
        </h1>
        <p className="text-center text-gray-500 text-sm mt-1 mb-6">
          Secure access to the 2024 Election Portal
        </p>

        {/* Email Field */}
        <div className="mb-5">
          <label className="block text-sm text-gray-600 mb-2">
            Email Address
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="voter@organization.com"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-600">Password</label>
            <a href="#" className="text-blue-600 text-xs hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full outline-none text-sm bg-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-600">
            Stay signed in for 30 days
          </span>
        </div>

        {/* Login Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300 font-medium shadow-md">
          Log In to Vote
        </button>

        {/* Security Note */}
        <div className="mt-6 text-center text-xs text-green-600">
          ✔ Identity-verified encrypted voting session
        </div>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have a voting account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register for elections 
          </Link>
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-xs text-gray-400 tracking-widest text-center w-full">
        PROFESSIONAL ONLINE VOTING SYSTEM v4.2.0
      </div>
    </div>
  );
};

export default VoterLogin;
