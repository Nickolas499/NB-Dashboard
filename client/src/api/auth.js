import axios from "./axios";

export const RegisterRequest = (user) => axios.post('/register',user);

export const LoginRequest = (user) => axios.post('/login',user);

export const verifyTokenRequest = (token) => axios.get(`/verify`, { headers: { Authorization: `Bearer ${token}` } });