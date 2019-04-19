import { apiService } from './api.service';

const login = async (email: string, password: string) => {
  return apiService.post<string>('/auth/login', { email, password }).then(token => {
    apiService.setToken(token);
    return token;
  });
};

export const authService = {
  login,
};
