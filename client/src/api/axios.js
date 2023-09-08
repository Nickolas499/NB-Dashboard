import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://10.62.150.76:5000/api", withCredentials: true });

export default axiosInstance