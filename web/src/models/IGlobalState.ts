import { User } from './User';
import { ConversationRoom } from './ConversationRoom';

export interface IGlobalState {
  user: User;
  conversationRooms: ConversationRoom[];
  activeConversationRoomId: string;
}
