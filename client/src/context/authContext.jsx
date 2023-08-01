import {createContext, useState,useContext, useEffect} from 'react';
import { RegisterRequest, LoginRequest, verifyTokenRequest } from '../api/auth.js';
import Cookies from 'js-cookie';


export const authContext = createContext()

export const useAuth = () =>{
 const context = useContext(authContext)
 if(!context){
   throw new Error('useAuth must be used within a AuthProvider')
 }
 return context;
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]); 
    
   

    const Signup = async (user) => {
        try{
        await RegisterRequest(user);
                       
        }catch(error){           
            setErrors(error.response.data);
        }
    }

    const Signin = async (user) => {
        try{
        const res = await LoginRequest(user);
        setUser(res.data);
        setIsAuthenticated(true);             
        }catch(error){            
            setErrors(error.response.data);
        }
    }

useEffect(()=>{
   if(errors.length>0){
    const timer = setTimeout(()=>{
        setErrors([])
    },3000)
    return ()=> clearTimeout(timer)
   } 
},[errors])

const cookies = Cookies.get();

async function checkLogin() {
  if (cookies.token) {
    try {
      const res = await verifyTokenRequest(cookies.token);
      console.log({"res.data":res});
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      Cookies.remove('token');
    }
  }
}

useEffect(() => {
  checkLogin();
}, []);


    return (
        <authContext.Provider value={{Signup, Signin, user, isAuthenticated, errors}}>
            {children}
        </authContext.Provider>
    )
}

