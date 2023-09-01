import axios from "./axios";


//======================================((Scaned API))==============================================//


export const getScaned = () => axios.get('/scaned');
export const getScanedById = (id) => axios.get(`/scaned/${id}`);
export const createScaned = (registration) => axios.post('/scaned', registration);
export const updateScaned = (registration) => axios.put(`/scaned/${registration.id}`, registration);
export const deleteScaned = (id) => axios.delete(`/scaned/${id}`);