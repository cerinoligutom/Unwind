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
import { localStorageService } from '../../services/local-storage.service';
import { Message } from '../../models/Message';
import { messageReducer, actions } from '../../reducers/message.reducer';

export const ChatPage = () => {
  const socket = io('http://192.168.100.7:9200');
  const [user, setUser] = useGlobal<User>('user');
  const [, setConversationRooms] = useGlobal<ConversationRoom[]>('conversationRooms');
  const [, setActiveConversationRoomId] = useGlobal<string>('activeConversationRoomId');
  const dispatch = useGlobal(messageReducer);

  const connectToRoom = (roomId: string) => {
    socket.emit('Join room', roomId);
  };

  const disconnectFromRoom = (roomId: string) => {
    socket.emit('Leave room', roomId);
  };

  useEffect(() => {
    authService.getCurrentUser().then(user => {
      setUser(user);
    });

    conversationRoomService.getCurrentUserConversationRooms().then(conversationRooms => {
      setConversationRooms(conversationRooms);
      setActiveConversationRoomId(conversationRooms[0].id);
    });

    socket.on('connect', () => {
      console.info('Authenticating...');

      socket.emit('authentication', {
        token: localStorageService.getItem<string>('token'),
      });

      socket.on('authenticated', () => {
        console.info('Authenticated!');
        socket.emit('Connect to rooms');

        socket.on('New message', (data: Message) => {
          console.info('new message:', data);
          dispatch(
            actions.addNewMessage({
              conversationRoomId: data.conversationRoomId,
              message: data,
            }),
          );
        });
      });
      socket.on('unauthorized', (err: Error) => {
        console.log('There was an error with the authentication:', err.message);
      });
    });

    socket.on('disconnect', () => {
      console.info('Got disconnected');
    });
  }, []);

  return (
    <>
      {user && <UserDrawer />}
      <ConversationListSidebar connectToRoom={connectToRoom} />
      <ChatContainer>
        <Conversation disconnectFromRoom={disconnectFromRoom} />
        <MessageInput />
      </ChatContainer>
      <ConversationParticipantsSidebar />
    </>
  );
};
