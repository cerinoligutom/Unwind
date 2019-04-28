import React, { useEffect } from 'react';
import { useGlobal } from 'reactn';
import io from 'socket.io-client';
import { ChatContainer, LoadingContainer } from './ChatPage.styles';
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
import { Loading } from '../../components/Loading/Loading';
import { RouterProps } from 'react-router';
import toastr from 'toastr';

const socket = io('http://192.168.100.7:9200', {
  query: { token: localStorageService.getItem<string>('token') },
  autoConnect: false,
});

interface IChatPageProps extends RouterProps {}

export const ChatPage = (props: IChatPageProps) => {
  const [user, setUser] = useGlobal<User>('user');
  const [rooms, setConversationRooms] = useGlobal<ConversationRoom[]>('conversationRooms');
  const [activeRoomId, setActiveConversationRoomId] = useGlobal<string>('activeConversationRoomId');
  const dispatch = useGlobal(messageReducer);

  const connectToRoom = (roomId: string) => {
    socket.emit('Join room', roomId);
  };

  const disconnectFromRoom = (roomId: string) => {
    socket.emit('Leave room', roomId);
  };

  useEffect(() => {
    socket.open();

    socket.on('connect_error', () => {
      const message = 'Connection error.';
      console.info(message);
      toastr.error(message);
    });

    socket.on('connect_timeout', () => {
      const message = 'Connection timeout.';
      console.info(message);
      toastr.error(message);
    });

    socket.on('reconnect', () => {
      const message = 'Reconnected';
      console.info(message);
      toastr.success(message);
    });

    socket.on('reconnect_attempt', () => {
      const message = 'Reconnecting...';
      console.info(message);
      toastr.info(message);
    });

    socket.on('reconnect_error', () => {
      const message = 'Failed to reconnect.';
      console.info(message);
      toastr.info(message);
    });

    socket.on('connect', () => {
      console.info('Authenticating...');

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
    });

    socket.on('error', (err: any) => {
      if (err === 'Authentication error') {
        console.log('There was an error with the authentication:', err);
        toastr.error('Something went wrong with the authentication. Please log in again.');

        socket.close();
        props.history.replace('/');
        authService.logout();
      } else {
        console.error('unknown socket error:', err);
      }
    });

    socket.on('disconnect', () => {
      toastr.error('Disconnected.');
    });

    authService.getCurrentUser().then(user => {
      setUser(user);
    });

    conversationRoomService.getCurrentUserConversationRooms().then(conversationRooms => {
      setConversationRooms(conversationRooms);
      setActiveConversationRoomId(conversationRooms[0].id);
    });
  }, []);

  return (
    <>
      {user && rooms.length > 0 && activeRoomId ? (
        <>
          <UserDrawer history={props.history} />
          <ConversationListSidebar connectToRoom={connectToRoom} />
          <ChatContainer>
            <Conversation disconnectFromRoom={disconnectFromRoom} />
            <MessageInput />
          </ChatContainer>
          <ConversationParticipantsSidebar />
        </>
      ) : (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
    </>
  );
};
