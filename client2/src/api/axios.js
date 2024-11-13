import axios from "axios";

const Url = "http://10.62.150.33:5000/api"

const axiosInstance = axios.create({ baseURL: Url, withCredentials: true });

export default axiosInstance