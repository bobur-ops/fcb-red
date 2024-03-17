import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://24.199.107.143:5051/",
});
