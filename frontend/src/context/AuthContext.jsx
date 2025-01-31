import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await api.post("/api/auth/login", {
        username,
        password,
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);

      // Decode the token to get user data
      const decoded = JSON.parse(atob(response.data.token.split(".")[1]));
      setUser(decoded);

      console.log("User logged in:", decoded); // Log the decoded user data

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error); // Log any errors
    }
  };

  const register = async (username, password, role) => {
    try {
      const response = await api.post("/api/auth/register", {
        username,
        password,
        role,
      });
      console.log("User registered:", response.data); // Log the registration response

      // Automatically log in the user after registration
      await login(username, password);
    } catch (error) {
      console.error("Registration failed:", error); // Log any errors
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setUser(decoded);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
