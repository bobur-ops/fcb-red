import axios from "axios";
import { redirect } from "react-router-dom";

export const axiosInstance = axios.create({
  baseURL: "https://api.fcbred.uz/",
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Execute your function here when you get a 401 error
      localStorage.removeItem("token");
      redirect("/login");
    }
    return Promise.reject(error);
  }
);
