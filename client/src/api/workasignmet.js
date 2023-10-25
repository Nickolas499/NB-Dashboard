import axios from "./axios";


//=====================================((CREATE WORK CONTROLLER))==============================================//
export const getWorkasignment = () => axios.get('/workasignment');
export const getWorkasignmentById = (id) => axios.get(`/workasignment/${id}`);
export const createWorkasignment = (Workdata) => axios.post('/workasignment', Workdata);
export const updateWorkasignment = (id,Workdata) => axios.put(`/workasignment/${id}`, Workdata);
export const deleteWorkasignment = (id) => axios.delete(`/workasignment/${id}`);

//=====================================((CREATE JOBASIGMENT CONTROLLER))========================================//

export const getJobasignment = () => axios.get('/jobasignment');
export const getJobasignmentById = (id) => axios.get(`/jobasignment/${id}`);
export const createJobasignment = (Jobdata) => axios.post('/jobasignment', Jobdata);
export const updateJobasignment = (id,Jobdata) => axios.put(`/jobasignment/${id}`, Jobdata);
export const deleteJobasignment = (id) => axios.delete(`/jobasignment/${id}`);
