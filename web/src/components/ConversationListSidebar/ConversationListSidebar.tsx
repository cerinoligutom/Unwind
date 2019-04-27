import React from 'react';
import { useGlobal } from 'reactn';
import { Container, ConversationListContainer, RoomActions } from './ConversationListSidebar.styles';
import { ConversationRoom } from '../../models/ConversationRoom';
import { CreateRoom } from '../CreateRoom/CreateRoom';
import { JoinRoom } from '../JoinRoom/JoinRoom';
import { ConversationListItem } from '../ConversationListItem/ConversationListItem';

interface IConversationListSidebarProps {
  connectToRoom(roomId: string): any;
}

export const ConversationListSidebar = ({ connectToRoom }: IConversationListSidebarProps) => {
  const [conversationRooms] = useGlobal<ConversationRoom[]>('conversationRooms');

  return (
    <Container>
      <RoomActions>
        <CreateRoom connectToRoom={connectToRoom} />
        <JoinRoom connectToRoom={connectToRoom} />
      </RoomActions>
      
      <ConversationListContainer>
        {conversationRooms.length > 0 &&
          conversationRooms.map(room => <ConversationListItem key={room.id} {...room} />)}
      </ConversationListContainer>
    </Container>
  );
};
