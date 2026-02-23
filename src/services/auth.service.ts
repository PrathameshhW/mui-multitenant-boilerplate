const TOKEN_STORAGE_KEY = "token";

const readToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const authService = {
  getToken: () => readToken(),
  isAuthenticated: () => Boolean(readToken()),
  setToken: (token: string) => {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  },
  clearSession: () => {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem(TOKEN_STORAGE_KEY);
  },
};
