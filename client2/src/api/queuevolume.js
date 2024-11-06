import axios from "./axios";


//=====================================((QUEUE VOLUME API CONTROLLER))==============================================//
export const get_queue_volume = () => axios.get('/queuevolume');
export const post_queue_volume = (Workdata) => axios.post('/queuevolume', Workdata);
export const update_queue_volume = (id,Workdata) => axios.put(`/queuevolume/${id}`, Workdata);



//=====================================((USER JOB ASSIGNMENT API CONTROLLER))==============================================//

export const get_userJobAssignment = () => axios.get('/userJobAssignment');
export const post_userJobAssignment = (Workdata) => axios.post('/userJobAssignment', Workdata);
export const update_userJobAssignment = (id,Workdata) => axios.put(`/userJobAssignment/${id}`, Workdata);