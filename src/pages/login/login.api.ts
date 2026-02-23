import type { LoginFormValues } from "./types/login.dto";
import { apiClient } from "../../lib/api-client";
import { envConfig } from "../../config/env.config";

export interface LoginResponse {
  token: string;
}

export const loginUser = async (
  credentials: LoginFormValues
): Promise<LoginResponse> => {
  if (envConfig.apiBaseUrl) {
    const { data } = await apiClient.post<LoginResponse>("/auth/login", credentials);
    return data;
  }

  // Local fallback for boilerplate/demo mode when no API base URL is configured.
  await new Promise((resolve, reject) =>
    setTimeout(() => {
      if (
        credentials.email === "prathameshjadhav@gmail.com" &&
        credentials.password === "password"
      ) {
        resolve({
          token: "token",
        });
      } else {
        reject(new Error("Login failed"));
      }
    }, 600)
  );

  return {
    token: credentials.email,
  };
};
