import { apiService } from './api.service';
import { User } from '../models/User';

const login = async (email: string, password: string) => {
  return apiService.post<{ token: string }>('/auth/login', { email, password }).then(({ token }) => {
    apiService.setToken(token);
    return token;
  });
};

const getCurrentUser = async () => {
  return apiService.get<User>('/auth/me');
};

export const authService = {
  login,
  getCurrentUser,
};
