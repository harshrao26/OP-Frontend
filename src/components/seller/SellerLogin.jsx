import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { LogIn } from "lucide-react";

const SellerLogin = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password, "seller");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 bg-white">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-2">Log in to your Account</h2>
          <p className="text-gray-600 mb-6">Welcome back! Select method to log in:</p>
    
          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300 outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300 outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-700"
            >
              <LogIn size={18} />
              Login
            </button>
          </form>
       
        </div>
      </div>
      {/* Right Side: Illustration/Info */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center p-8">
        <div className="text-white max-w-sm">
          <h2 className="text-2xl font-bold mb-4">Connect with every application</h2>
          <p className="mb-6">Everything you need in an easily customizable dashboard.</p>
          {/* Replace with your illustration or icons */}
          <div className="rounded-full bg-white bg-opacity-20 p-6">
            <img src="/dashboard-mockup.svg" alt="Dashboard Mockup"  className=""/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
