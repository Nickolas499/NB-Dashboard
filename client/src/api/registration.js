import axios from "./axios";

//======================================((Registration API))==============================================//

export const getRegistration = () => axios.get('/registration');
export const getRegistrationById = (id) => axios.get(`/registration/${id}`);
export const createRegistration = (registration) => axios.post('/registration', registration);
export const updateRegistration = (id, registration) => axios.put(`/registration/${id}`, registration);
export const deleteRegistration = (id) => axios.delete(`/registration/${id}`);






// //======================================((Design API))==============================================//
// export const getDesign = () => axios.get('/design');
// //======================================((Redesign API))==============================================//
// export const getRedesign = () => axios.get('/redesign');
