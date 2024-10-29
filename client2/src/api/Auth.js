import axios from "./axios";

export const RegisterRequest = (user) => axios.post('/register',user);

export const LoginRequest = (user) => axios.post('/login',user);

export const DeleteUser  = (id) => axios.delete(`/deleteuser/${id}`)

export const verifyTokenRequest = () => axios.get('/verify');

export const Users = () => axios.get('/users');