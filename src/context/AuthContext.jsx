import axios from "axios";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStorage from "./useAuthStorage";

const API_BASE_URL = "https://op-backend-lgam.onrender.com/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useAuthStorage();
  const navigate = useNavigate();

  const login = async (email, password, role) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/${role}/auth/login`, { email, password });
      localStorage.setItem("token", data.token);
      // Use the 'customer' field from the backend response
      setUser({ ...data.customer, role });
      console.log("Logged-in user:", data.customer);

      if (role === "seller") navigate("/seller/dashboard");
      else if (role === "admin") navigate("/admin/dashboard");
      else navigate("/");
    } catch (error) {
      console.error(`${role.toUpperCase()} Login failed:`, error.response?.data || error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
