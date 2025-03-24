import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5001/api/customer/auth"; // Backend Auth URL

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔹 Login Function
  const login = async (email, password) => {
    console.log("🟡 Logging in user..."); // Step 1: Start login
    try {
      const { data } = await axios.post(`${API_BASE_URL}/login`, { email, password });

      console.log("🟢 Login Successful!", data); // Step 2: Check API response

      // Store user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.customer));

      setUser(data.customer);
      navigate("/");
    } catch (error) {
      console.error("🔴 Login failed:", error.response?.data || error.message);
    }
  };

  // 🔹 Logout Function
  const logout = () => {
    console.log("🟠 Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth
export const useAuth = () => useContext(AuthContext);
