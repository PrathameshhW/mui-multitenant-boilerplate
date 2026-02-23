import type { LoginFormValues } from "./types/login.dto";

export interface LoginResponse {
  token: string;
}

export const loginUser = async (
  credentials: LoginFormValues
): Promise<LoginResponse> => {
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
