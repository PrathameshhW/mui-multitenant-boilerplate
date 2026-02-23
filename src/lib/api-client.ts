import axios from "axios";
import { envConfig } from "../config/env.config";
import { authService } from "../services/auth.service";

export const apiClient = axios.create({
  baseURL: envConfig.apiBaseUrl,
});

apiClient.interceptors.request.use((config) => {
  const token = authService.getToken();

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.clearSession();

      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  }
);
