import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://op-backend-lgam.onrender.com/api/admin/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      setMessage("Login successful");
      navigate("/admin/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        {/* Left Image Section */}
        <div className="hidden md:flex md:w-1/2 bg-blue-50 items-center justify-center p-6">
          <img
            src="https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4581.jpg"
            alt="Admin Illustration"
            className="w-full max-w-sm"
          />
        </div>

        {/* Right Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-blue-600 text-center mb-6">Admin Login</h2>

          {message && (
            <p className="text-center text-sm text-red-500 mb-4">{message}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="flex items-center border rounded-md px-3 py-2">
              <Mail className="text-gray-400 mr-2" size={18} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full outline-none text-sm"
              />
            </div>

            <div className="flex items-center border rounded-md px-3 py-2">
              <Lock className="text-gray-400 mr-2" size={18} />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full outline-none text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
