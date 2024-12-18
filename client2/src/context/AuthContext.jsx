import { createContext, useState, useContext, useEffect } from "react";
import {
  RegisterRequest,
  LoginRequest,
  DeleteUser,
  verifyTokenRequest,
  Users
} from '../api/Auth.js';
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
  const [usuarios, setUsuarios] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const Signup = async (user) => {
    try {
      await RegisterRequest(user);
      GetUsers();
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

  const Delete_User = async (id) => {
    try {
      await DeleteUser(id);
      // Opcional: Actualizar la lista de usuarios después de eliminar
      GetUsers();
    } catch (error) {
      setErrors(error.response.data);
    }
  };


  const GetUsers = async ()=> {
    try {
      const res = await Users();
      setUsuarios(res.data);        
    } catch (error) {
      console.log(error);
    }
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
      value={{ Signup, Signin, GetUsers, Delete_User, user, usuarios, isAuthenticated, errors, loading, Logout }}    >
      {children}
    </authContext.Provider>
  );
};
