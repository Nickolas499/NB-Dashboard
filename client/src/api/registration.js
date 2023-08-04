import axios from "./axios";

//======================================((Registration API))==============================================//


export const getRegistration = () => axios.get('/registration');
export const getRegistrationById = (id) => axios.get(`/registration/${id}`);
export const createRegistration = (registration) => axios.post('/registration', registration);
export const updateRegistration = (registration) => axios.put(`/registration/${registration.id}`, registration);
export const deleteRegistration = (id) => axios.delete(`/registration/${id}`);




//======================================((Scaned API))==============================================//


export const getScaned = () => axios.get('/scaned');
export const getScanedById = (id) => axios.get(`/scaned/${id}`);
export const createScaned = (registration) => axios.post('/scaned', registration);
export const updateScaned = (registration) => axios.put(`/scaned/${registration.id}`, registration);
export const deleteScaned = (id) => axios.delete(`/scaned/${id}`);

//======================================((Design API))==============================================//
export const getDesign = () => axios.get('/design');
//======================================((Redesign API))==============================================//
export const getRedesign = () => axios.get('/redesign');
