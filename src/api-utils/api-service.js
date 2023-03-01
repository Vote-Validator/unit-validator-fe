import { toast } from "react-toastify";
import { globalAxios } from "./globalAxios";

const apiService = (url, method, data) => {
  return new Promise((resolve, reject) => {
    globalAxios({
      url,
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        if (error?.message === "Network Error") {
          toast.error("Please check your internet connection", {
            toastId: "network-error-toast",
          });
        }
        reject(new Error(error));
      });
  });
};

export default apiService;
