import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { MdHowToVote } from "react-icons/md";
import { Link } from "react-router-dom";

const VoterRegister = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 flex items-center justify-center px-4 relative">

      {/* Registration Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8">

        {/* Top Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 p-4 rounded-xl shadow-md">
            <MdHowToVote className="text-white text-3xl" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Voter Registration
        </h1>
        <p className="text-center text-gray-500 text-sm mt-1 mb-6">
          Join your professional organization's secure voting platform.
        </p>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2">
            Full Name
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="John Doe"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2">
            Email Address
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="john@company.com"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-sm text-gray-600 mb-2">
            Password
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Minimum 8 characters with at least one number.
          </p>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start mt-4 mb-6">
          <input
            type="checkbox"
            className="h-4 w-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <p className="ml-2 text-sm text-gray-600">
            I agree to the{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>.
          </p>
        </div>

        {/* Register Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300 font-medium shadow-md flex items-center justify-center gap-2">
          Register →
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>

      {/* Bottom Security Text */}
      <div className="absolute bottom-6 text-xs text-gray-400 flex gap-6">
        <span>🔒 End-to-end Encrypted</span>
        <span>✔ Verified ID System</span>
      </div>
    </div>
  );
};

export default VoterRegister;
