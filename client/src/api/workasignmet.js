import axios from "./axios";



export const getWorkasignment = () => axios.get('/workasignment');
export const getWorkasignmentById = (id) => axios.get(`/workasignment/${id}`);
export const createWorkasignment = (Workdata) => axios.post('/workasignment', Workdata);
export const updateWorkasignment = (id,Workdata) => axios.put(`/workasignment/${id}`, Workdata);
export const deleteWorkasignment = (id) => axios.delete(`/workasignment/${id}`);