import { User } from './User';
import { Message } from './Message';

export class ConversationRoom {
  id!: string;
  name!: string;
  photoUrl?: string;
  messages!: Message[];
  participants!: User[];
  cursor?: string;
  hasOldMessages?: boolean;
}
