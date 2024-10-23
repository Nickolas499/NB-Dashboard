import axios from "./axios";

interface User {
  // Define las propiedades del objeto user según tus necesidades  
  username: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  access: string;
  color: string;
}

export const RegisterRequest = (user: User) => axios.post('/register', user);

export const LoginRequest = (user: User) => axios.post('/login', user);

export const verifyTokenRequest = () => axios.get('/verify');

export const Users = () => axios.get('/users');

