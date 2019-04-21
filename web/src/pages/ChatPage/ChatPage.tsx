import React, { useEffect } from 'react';
import { useGlobal } from 'reactn';
import io from 'socket.io-client';
import { ChatContainer } from './ChatPage.styles';
import { ConversationListSidebar } from '../../components/ConversationListSidebar/ConversationListSidebar';
import { ConversationParticipantsSidebar } from '../../components/ConversationParticipantsSidebar/ConversationParticipantsSidebar';
import { Conversation } from '../../components/Conversation/Conversation';
import { UserDrawer } from '../../components/UserDrawer/UserDrawer';
import { MessageInput } from '../../components/MessageInput/MessageInput';
import { authService } from '../../services/auth.service';
import { User } from '../../models/User';
import { ConversationRoom } from '../../models/ConversationRoom';
import { conversationRoomService } from '../../services/conversation-room.service';

export const ChatPage = () => {
  const [user, setUser] = useGlobal<User>('user');
  const [, setConversationRooms] = useGlobal<ConversationRoom[]>('conversationRooms');
  const [, setActiveConversationRoomId] = useGlobal<string>('activeConversationRoomId');

  useEffect(() => {
    authService.getCurrentUser().then(user => {
      setUser(user);
    });

    conversationRoomService.getCurrentUserConversationRooms().then(conversationRooms => {
      setConversationRooms(conversationRooms);
      setActiveConversationRoomId(conversationRooms[1].id);

      setTimeout(() => {
        setActiveConversationRoomId(conversationRooms[0].id);
      }, 2000);
    });

    const socket = io('http://localhost:9200');

    socket.on('connect', () => {
      console.log('connected');
    });
  }, []);

  return (
    <>
      {user && <UserDrawer />}
      <ConversationListSidebar />
      <ChatContainer>
        <Conversation />
        <MessageInput />
      </ChatContainer>
      <ConversationParticipantsSidebar />
    </>
  );
};
