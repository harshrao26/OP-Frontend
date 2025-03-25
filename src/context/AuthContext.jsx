import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5001/api"; // Base URL

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    // if (storedUser && storedRole) {
    //   setUser({ ...JSON.parse(storedUser), role: storedRole });
    // }
  }, []);

  // 🔹 Login Function (Handles Multiple Roles)
  const login = async (email, password, role) => {
    console.log(`🟡 Logging in as ${role}...`); // Debugging

    const endpoint = `${API_BASE_URL}/${role}/auth/login`;

    try {
      const { data } = await axios.post(endpoint, { email, password });

      console.log(`🟢 ${role.toUpperCase()} Login Successful!`, data);

      // Store user data in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); // Adjust based on backend response
      localStorage.setItem("role", role);

      setUser({ ...data.user, role });
      
      // Redirect based on role
      if (role === "seller") navigate("/seller/dashboard");
      else if (role === "admin") navigate("/admin/dashboard");
      else navigate("/");
      
    } catch (error) {
      console.error(`🔴 ${role.toUpperCase()} Login failed:`, error.response?.data || error.message);
    }
  };

  // 🔹 Logout Function
  const logout = () => {
    console.log("🟠 Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
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
