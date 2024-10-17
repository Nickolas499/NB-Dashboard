import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://192.168.1.158:5000/api", withCredentials: true });

export default axiosInstance