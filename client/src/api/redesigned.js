import axios from "./axios";


//======================================((Redesigned API))==============================================//


export const getRedesigned = () => axios.get('/redesigned');
export const getRedesignedById = (id) => axios.get(`/redesigned/${id}`);
export const createRedesigned = (redesigned) => axios.post('/redesigned', redesigned);
export const updateRedesigned = (id,redesigned) => axios.put(`/redesigned/${id}`, redesigned);
export const deleteRedesigned = (id) => axios.delete(`/redesigned/${id}`);