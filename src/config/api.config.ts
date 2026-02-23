import axios from "axios";
import { BASE_URL } from "./http.config";

const token = localStorage.getItem("token");

export const BaseInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

BaseInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 511) {
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);
