import axios from "./axios";


//=====================================((REGISTRATION API CONTROLLER))==============================================//
export const get_registration = () => axios.get('/registration');
export const post_registration = (data) => axios.post('/registration', data);
export const update_registration = (id,data) => axios.put(`/registration/${id}`, data);
export const delete_registration = (id) => axios.delete(`/registration/${id}`);