import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  LogIn,
  User,
  Phone as PhoneIcon,
  Mail,
  Lock,
} from "lucide-react";
import logo from '../assets/logoo.png'
import shop from '../assets/login/shop.png'
import shop2 from '../assets/login/shop2.png'
import shop3 from '../assets/login/shop3.png'

const API_BASE_URL = "https://op-backend-lgam.onrender.com/api";

// Simple regex patterns
const phoneRegex = /^[0-9]{10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;




const CustomerAuth = () => {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate email before attempting login
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    await login(email, password, "customer");
  };

  const handleSendOTP = async () => {
    // Validate phone with regex
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    try {
      await axios.post("https://op-backend-lgam.onrender.com/api/verify/register", {
        step: "send_otp",
        phone: `+91${phone}`,
      });
      alert("OTP sent successfully");
      setIsOTPSent(true);
    } catch {
      alert("Failed to send OTP");
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }
    try {
      await axios.post("https://op-backend-lgam.onrender.com/api/verify/register", {
        step: "verify_otp",
        phone: `+91${phone}`,
        otp,
      });
      alert("OTP verified successfully");
      setIsOTPVerified(true);
    } catch {
      alert("OTP verification failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate email & phone
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!isOTPVerified) {
      alert("Please verify OTP first.");
      return;
    }

    try {
      await axios.post(`https://op-backend-lgam.onrender.com/api/customer/auth/register`, {
        name,
        email,
        password,
        phone: `+91${phone}`,
      });
      await login(email, password, "customer");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row  rounded-4xl ">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 bg-white">
        <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800"></h1>
          <img src={logo} alt="" />
        </div>
        <h2 className="text-2xl font-semibold mb-1 text-gray-800">
          {isRegister ? "Create an account" : "Log in to your Account"}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {isRegister
            ? "Join us by creating a new account"
            : "Welcome back! Please log in to continue"}
        </p>

        <form
          onSubmit={isRegister ? handleRegister : handleLogin}
          className="space-y-4"
        >
          {isRegister && (
            <>
              {/* Name */}
              <div className="relative">
                <User className="absolute top-3 left-2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="w-full pl-8 pr-3 py-2 border rounded focus:ring focus:ring-blue-300 outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <div className="relative flex">
                  <PhoneIcon className="absolute top-3 left-2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      // Only keep digits, max length 10
                      const numericVal = e.target.value.replace(/\D/g, "");
                      if (numericVal.length <= 10) {
                        setPhone(numericVal);
                      }
                      // Reset OTP state whenever phone changes
                      setIsOTPSent(false);
                      setIsOTPVerified(false);
                      setOtp("");
                    }}
                    placeholder="10-digit number"
                    required
                    className="w-full flex pl-8 pr-3 py-2 border rounded focus:ring focus:ring-blue-300 outline-none"
                  />
                </div>
                {phone.length === 10 && !isOTPSent && (
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Send OTP
                  </button>
                )}
                {isOTPSent && !isOTPVerified && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300 outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOTP}
                      className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Verify OTP
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Email */}
          <div className="relative">
            <Mail className="absolute top-3 left-2 text-gray-400" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full pl-8 pr-3 py-2 border rounded focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute top-3 left-2 text-gray-400" size={18} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full pl-8 pr-3 py-2 border rounded focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          {/* Remember / Forgot (for login only) */}
          {!isRegister && (
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center text-gray-600">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Remember me</span>
              </label>
              <Link to="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className={`w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center gap-2 ${
              isRegister && !isOTPVerified ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isRegister && !isOTPVerified}
          >
            <LogIn size={18} />
            {isRegister ? "Sign Up" : "Log In"}
          </button>
        </form>

        {/* Toggle register/login */}
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setIsOTPSent(false);
              setIsOTPVerified(false);
              setOtp("");
              setPhone("");
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            {isRegister
              ? "Already have an account? Log in"
              : "Don’t have an account? Create one"}
          </button>
        </div>

        {/* Seller login link */}
        <div className="mt-4 text-center">
          <Link to="/seller/login" className="text-blue-600 hover:underline">
            Seller Login
          </Link>
        </div>
        </div>
      </div>

      {/* Right: Illustration / branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 text-white flex-col items-center justify-center p-8">
       
       
       
        <h2 className="text-3xl font-bold mb-4">Connect with every application</h2>
        <p className="text-lg max-w-sm text-center">
          Everything you need in an easily customizable dashboard.
        </p>
      </div>
    </div>
  );
};

export default CustomerAuth;
