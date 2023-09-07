import axios from "./axios";


//======================================((Scaned API))==============================================//


export const getScaned = () => axios.get('/scaned');
export const getScanedById = (id) => axios.get(`/scaned/${id}`);
export const createScaned = (scaned) => axios.post('/scaned', scaned);
export const updateScaned = (id,scaned) => axios.put(`/scaned/${id}`, scaned);
export const deleteScaned = (id) => axios.delete(`/scaned/${id}`);