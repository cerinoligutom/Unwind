import { User } from '../models/User';
import { apiService } from './api.service';
import { IEditProfileForm } from '../models/IEditProfileForm';

const updateUser = async (userId: string, form: IEditProfileForm) => {
  return apiService.put<User>(`/users/${userId}`, form);
};

export const userService = {
  updateUser,
};
