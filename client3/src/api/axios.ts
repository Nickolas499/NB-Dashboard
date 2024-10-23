import axios from "axios";

const axiosInstance = axios.create({ 
    baseURL: "http://10.62.150.33:5000/api", 
    withCredentials: true // Asegúrate de que esto esté habilitado
});

export default axiosInstance;