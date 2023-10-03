import axios from "./axios";

export const createWorkasignment = (Workdata) => axios.post('/workasignment', Workdata);