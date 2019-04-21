import { User } from './User';

export class Message {
  id!: string;
  conversationRoomId!: string;
  senderId!: string;
  text!: string;
  isEdited!: boolean;
  createdAt!: string;
  updatedAt!: string;

  sender?: User;
}
