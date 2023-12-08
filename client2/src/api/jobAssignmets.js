import axios from "./axios";


//=====================================((CREATE JOB ASSIGNMENT CONTROLLER))==============================================//
export const getJobassignment = () => axios.get('/workasignment');
export const getJobassignmentById = (id) => axios.get(`/workasignment/${id}`);
export const createJobassignment = (Workdata) => axios.post('/workasignment', Workdata);
export const updateJobassignment = (id,Workdata) => axios.put(`/workasignment/${id}`, Workdata);
export const deleteJobassignment = (id) => axios.delete(`/workasignment/${id}`);