import axios from "./axios";

//=======================((productivity Chart))==============================================//
//=======================((Global productivity Chart))==============================================//
export const getGlobalData = () => axios.get('/globaprodata');

//=======================((User productivity Chart))==============================================//
export const getUserData = (id) => axios.get(`/userprodata`);


export const GlobalDatarequest = () => axios.get('/global');

