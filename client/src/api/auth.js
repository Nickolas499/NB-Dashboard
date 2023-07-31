import axios from "axios";

const API =  "http://localhost:5000/api";
export const RegisterRequest = (user) => axios.post(`${API}/register`,user);

export const LoginRequest = (user) => axios.post(`${API}/login`,user);