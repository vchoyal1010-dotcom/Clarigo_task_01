import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


api.interceptors.request.use(
  (config) => {
    const admintoken = localStorage.getItem("admintoken");

    if (admintoken) {
      config.headers.Authorization = `Bearer ${admintoken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;