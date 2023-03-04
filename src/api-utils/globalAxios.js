import axios from "axios";
import { toast } from "react-toastify";

export const globalAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

globalAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("session_id");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

globalAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 419) {
      toast.success("😎 We knew you'd come!!!");
    }
    return Promise.reject(error);
  }
);
