import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdHowToVote } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../api/authService";
import { useAuth } from "../context/AuthContext";

const VoterLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { saveAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to the page the user was trying to visit, or fall back to /election
  const from = location.state?.from?.pathname || "/election";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const authData = await login({ email, password });
      saveAuth(authData);

      // Role-based redirect
      if (authData.role === "admin") {
        navigate("/admin", { replace: true });
      } else if (authData.role === "candidate") {
        navigate("/CandidateDashboard", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

        {/* Error Banner */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <div className="mb-5">
            <label className="block text-sm text-gray-600 mb-2">
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                id="login-email"
                type="email"
                placeholder="voter@organization.com"
                className="w-full outline-none text-sm bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
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
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full outline-none text-sm bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
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

          {/* Login Button */}
          <button
            id="login-submit"
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg transition duration-300 font-medium shadow-md flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white" />
                Logging in…
              </>
            ) : (
              "Log In to Vote"
            )}
          </button>
        </form>

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
