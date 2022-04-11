import axios from "axios";

const axiosInstance = axios.create({ REACT_APP_API_URL: "http://localhost:2022" });

export default axiosInstance;
