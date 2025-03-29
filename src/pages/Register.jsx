import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);

  const handleSendOTP = async () => {
    if (phone.length !== 10) {
      alert("Please enter a valid 10 digit phone number");
      return;
    }
    try {
      await axios.post("https://op-backend-lgam.onrender.com/api/verify/register", {
        step: "send_otp",
        phone: `+91${phone}`,
      });
      alert("OTP sent successfully");
      setIsOTPSent(true);
    } catch (error) {
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
    } catch (error) {
      alert("OTP verification failed");
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (!isOTPVerified) {
      alert("Please verify OTP first");
      return;
    }
    try {
      await axios.post("https://op-backend-lgam.onrender.com/api/customer/auth/register", {
        name,
        email,
        phone: `+91${phone}`,
        password,
      });
      alert("Registration successful");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleRegistration}>
        <h2 className="text-xl font-bold mb-4">Register Customer</h2>
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="mb-2">
          <input
            type="text"
            placeholder="Phone (10 digits)"
            className="border p-2 w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {phone.length === 10 && !isOTPSent && (
            <button
              type="button"
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSendOTP}
            >
              Send OTP
            </button>
          )}
        </div>
        {isOTPSent && !isOTPVerified && (
          <div className="mb-2">
            <input
              type="text"
              placeholder="Enter OTP"
              className="border p-2 w-full"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              type="button"
              className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded"
              onClick={handleVerifyOTP}
            >
              Verify OTP
            </button>
          </div>
        )}
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className={`bg-green-500 text-white px-4 py-2 rounded w-full ${
            !isOTPVerified ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isOTPVerified}
        >
          Register
        </button>
      </form>
    </div>
  );
}
