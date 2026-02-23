import { authService } from "../services/auth.service";

export const useAuth = () => {
  return {
    token: authService.getToken(),
    isAuthenticated: authService.isAuthenticated(),
    setToken: authService.setToken,
    logout: authService.clearSession,
  };
};
