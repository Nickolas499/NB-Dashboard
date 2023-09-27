import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://10.62.150.76:5000/api", withCredentials: true });
// const axiosInstance = axios.create({ baseURL: "http://192.168.1.186:5000/api", withCredentials: true });

export default axiosInstance