import { apiService } from './api.service';
import { IRegisterForm } from '../models/IRegisterForm';
import { User } from '../models/User';

const register = async (form: IRegisterForm) => {
  return apiService.post<User>('/auth/register', form);
};

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
  register,
};
