import axios from "./axios";

//======================================((Registration API))==============================================//


export const getRegistration = () => axios.get('/registration');
export const getRegistrationById = (id) => axios.get(`/registration/${id}`);
export const CreateRegistration = (registration) => axios.post('/registration', registration);
export const UpdateRegistration = (registration) => axios.put(`/registration/${registration.id}`, registration);
export const DeleteRegistration = (id) => axios.delete(`/registration/${id}`);

//======================================((Scaned API))==============================================//
export const getScaned = () => axios.get('/scaned');
//======================================((Design API))==============================================//
export const getDesign = () => axios.get('/design');
//======================================((Redesign API))==============================================//
export const getRedesign = () => axios.get('/redesign');