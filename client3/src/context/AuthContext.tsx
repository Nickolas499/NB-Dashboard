import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import {
  RegisterRequest,
  LoginRequest,
  verifyTokenRequest,
  Users
} from '../api/Auth';
import Cookies from "js-cookie";

// Define las propiedades del objeto User según tu esquema de Mongoose
interface User {
  username: string;
  fname: string;
  lname: string;
  email: string;  
  access: string;
  color: string;
}

interface AuthContextType {
  
  Signin: (user: Pick<User, 'username'>) => Promise<void>; // Solo username y password para iniciar sesión
  GetUsers: () => Promise<void>;
  user: User | null;
  usuarios: User[];
  isAuthenticated: boolean;
  errors: string[];
  loading: boolean;
  Logout: () => void;
}

const authContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const Signup = async (user) => {
    try {
      await RegisterRequest(user);
    } catch (error: unknown) {
      setErrors(error.response.data);
    }
  }

  const Signin = async (user: Pick<User, 'username'>) => {
    try {
      const res = await LoginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error:unknown) {
      setErrors(error.response?.data || "Unknown Error");
    }
  };

  const Logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

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
        console.log(error)
      }
    }
    checkLogin();
  }, []);

  const GetUsers = async () => {
    try {
      const res = await Users();
      setUsuarios(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <authContext.Provider
      value={{ Signup, Signin, GetUsers, user, usuarios, isAuthenticated, errors, loading, Logout }}>
      {children}
    </authContext.Provider>
  );
};
