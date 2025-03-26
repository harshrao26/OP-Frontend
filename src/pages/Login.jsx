import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api";

const CustomerAuth = () => {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState(""); // for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); // for registration

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password, "customer");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Register the customer with the provided credentials
      await axios.post(`${API_BASE_URL}/customer/auth/register`, {
        name,
        email,
        password,
        phone,
      });
      console.log("Registration successful");
      // Auto-login after successful registration
      await login(email, password, "customer");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          {isRegister ? "Customer Registration" : "Customer Login"}
        </h2>
        <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Customer One"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9292929292"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300 outline-none"
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <LogIn size={18} /> {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-blue-600 hover:underline"
          >
            {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
          </button>
        </div>
      </div>
      <div className="mt-4">
        <Link to="/seller/login" className="text-blue-600 hover:underline">
          Seller Login
        </Link>
      </div>
    </div>
  );
};

export default CustomerAuth;
