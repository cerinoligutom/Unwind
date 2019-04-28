import { apiService } from './api.service';
import { IRegisterForm } from '../models/IRegisterForm';
import { User } from '../models/User';
import { localStorageService } from './local-storage.service';
import { setGlobal } from 'reactn';

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

const logout = () => {
  localStorageService.clear();

  setGlobal({
    user: {},
    conversationRooms: [],
    activeConversationRoomId: '',
  });
};

export const authService = {
  login,
  logout,
  getCurrentUser,
  register,
};
