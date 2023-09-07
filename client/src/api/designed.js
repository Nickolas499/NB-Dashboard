import axios from "./axios";


//======================================((Designed API))==============================================//


export const getDesigned = () => axios.get('/designed');
export const getDesignedById = (id) => axios.get(`/designed/${id}`);
export const createDesigned = (designed) => axios.post('/designed', designed);
export const updateDesigned = (id,designed) => axios.put(`/designed/${id}`, designed);
export const deleteDesigned = (id) => axios.delete(`/designed/${id}`);