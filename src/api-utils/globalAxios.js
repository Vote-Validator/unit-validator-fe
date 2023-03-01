import axios from "axios";

export const globalAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

globalAxios.interceptors.request.use((config) => {
  const token = process.env.REACT_APP_API_TOKEN;
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
    throw error;
  }
);
