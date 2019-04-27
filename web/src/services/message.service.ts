import { apiService } from './api.service';
import { Message } from '../models/Message';

const createMessage = async (conversationRoomId: string, text: string) => {
  const message = await apiService.post<Message>(`/conversationRooms/${conversationRoomId}/messages`, { text });

  return message;
};

export const messageService = {
  createMessage,
};
