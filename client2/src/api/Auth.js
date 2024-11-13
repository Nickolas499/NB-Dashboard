import axios from "./axios";

export const RegisterRequest = (user) => axios.post('/register',user); // register user ** cambiar por Signup**

export const LoginRequest = (user) => axios.post('/login',user);      // login user  ** cambiar por Login**

export const UpdateUser = (id, user) => axios.put(`/updateuser/${id}`, user); // update user

export const DeleteUser  = (id) => axios.delete(`/deleteuser/${id}`)  // delete user

export const verifyTokenRequest = () => axios.get('/verify'); // verify token

export const Users = () => axios.get('/users'); // get all users