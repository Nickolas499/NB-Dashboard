import {createContext, useState,useContext, useEffect} from 'react';
import { RegisterRequest, LoginRequest } from '../api/auth';



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
        const res = await RegisterRequest(user);
        setUser(res.data);               
        }catch(error){
            console.log(error.response.data);
            setErrors(error.response.data);
        }
    }

    const Signin = async (user) => {
        try{
        const res = await LoginRequest(user);
        setUser(res.data);
        setIsAuthenticated(true);
        console.log(res.data);
        }catch(error){
            console.log(error.response.data);
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


    return (
        <authContext.Provider value={{Signup, Signin, user, isAuthenticated, errors}}>
            {children}
        </authContext.Provider>
    )
}

