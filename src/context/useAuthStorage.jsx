import { useState, useEffect } from "react";

const useAuthStorage = () => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedRole = localStorage.getItem("role");
      if (storedUser && storedUser !== "undefined" && storedRole) {
        return { ...JSON.parse(storedUser), role: storedRole };
      }
    } catch (error) {
      console.error("Error parsing auth data:", error);
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    }
  }, [user]);

  return [user, setUser];
};

export default useAuthStorage;
