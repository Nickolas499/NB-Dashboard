import { createContext, useState, useContext, useEffect } from "react";
import {
  RegisterRequest,
  LoginRequest,
  verifyTokenRequest,
} from "../api/auth.js";
import Cookies from "js-cookie";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const Signup = async (user) => {
    try {
      await RegisterRequest(user);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const Signin = async (user) => {
    try {
      const res = await LoginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const Logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {        
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }      
      try {        
        const res = await verifyTokenRequest(cookies.token);        
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        Cookies.remove("token");
      }
    }
    checkLogin();
  }, []);

  return (
    <authContext.Provider
      value={{ Signup, Signin, user, isAuthenticated, errors, loading, Logout }}
    >
      {children}
    </authContext.Provider>
  );
};
