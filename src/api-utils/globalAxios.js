import axios from "axios";
import { toast } from "react-toastify";

export const globalAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

globalAxios.interceptors.request.use((config) => {
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
    if (error.response.status === 503) {
      toast.error(
        "we are currently upgrading/improving our setup... try again shortly"
      );
    }
    return Promise.reject(error);
  }
);
