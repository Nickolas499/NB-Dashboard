import axios from "./axios";

// Define los tipos para los datos de trabajo si es necesario
interface WorkData {
    // Define las propiedades de WorkData según tu estructura de datos
    // Ejemplo:
    // id?: number;
    // title: string;
    // description: string;
}

export const getJobassignment = () => axios.get('/workasignment');

export const getJobassignmentById = (id: string | number) => 
    axios.get(`/workasignment/${id}`);

export const createJobassignment = (Workdata: WorkData) => 
    axios.post('/workasignment', Workdata);

export const updateJobassignment = (id: string | number, Workdata: WorkData) => 
    axios.put(`/workasignment/${id}`, Workdata);

export const deleteJobassignment = (id: string | number) => 
    axios.delete(`/workasignment/${id}`);
