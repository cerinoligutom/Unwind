import { apiService } from './api.service';
import { Message } from '../models/Message';

const createMessage = async (conversationRoomId: string, text: string) => {
  return apiService.post<Message>(`/conversationRooms/${conversationRoomId}/messages`, { text });
};

export const messageService = {
  createMessage,
};
