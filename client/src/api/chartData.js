import axios from "./axios";

//=======================((GLOBAL PRODUCTIVITY CHART))==============================================//

export const GlobalDatarequest = () => axios.get('/global');


//=======================((USER PRODUCTIVITY CHART))==============================================//


export const UserDatarequest = (id) => axios.get(`/userdata/${id}`);