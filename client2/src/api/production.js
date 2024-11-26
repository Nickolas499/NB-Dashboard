import axios from "./axios";


//=====================================((REGISTRATION API CONTROLLER))==============================================//
export const get_registration = () => axios.get('/registration');
export const post_registration = (data) => axios.post('/registration', data);
export const update_registration = (id,data) => axios.put(`/registration/${id}`, data);
export const delete_registration = (id) => axios.delete(`/registration/${id}`);


//=====================================((SCAN API CONTROLLER))==============================================//
export const get_scan = () => axios.get('/scan');
export const post_scan = (data) => axios.post('/scan', data);
export const update_scan = (id,data) => axios.put(`/scan/${id}`, data);
export const delete_scan = (id) => axios.delete(`/scan/${id}`);


//=====================================((SCAN API CONTROLLER))==============================================//
export const get_design = () => axios.get('/design');
export const post_design = (data) => axios.post('/design', data);
export const update_design = (id,data) => axios.put(`/design/${id}`, data);
export const delete_design = (id) => axios.delete(`/design/${id}`);


//=====================================((SCAN API CONTROLLER))==============================================//
export const get_redesign = () => axios.get('/redesign');
export const post_redesign = (data) => axios.post('/redesign', data);
export const update_redesign = (id,data) => axios.put(`/redesign/${id}`, data);
export const delete_redesign = (id) => axios.delete(`/redesign/${id}`);


//=====================================((PARETO API CONTROLLER))==============================================//
export const get_pareto = () => axios.get('/pareto');
export const post_pareto = (data) => axios.post('/pareto', data);
export const update_pareto = (id,data) => axios.put(`/pareto/${id}`, data);
export const delete_pareto = (id) => axios.delete(`/pareto/${id}`);