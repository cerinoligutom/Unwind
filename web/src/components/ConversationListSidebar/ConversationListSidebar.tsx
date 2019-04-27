import React from 'react';
import { useGlobal } from 'reactn';
import { Container, ConversationListContainer } from './ConversationListSidebar.styles';
import { ConversationRoom } from '../../models/ConversationRoom';
import { CreateRoom } from '../CreateRoom/CreateRoom';
import { ConversationListItem } from '../ConversationListItem/ConversationListItem';

interface IConversationListSidebarProps {
  connectToRoom(roomId: string): any;
}

export const ConversationListSidebar = ({ connectToRoom }: IConversationListSidebarProps) => {
  const [conversationRooms] = useGlobal<ConversationRoom[]>('conversationRooms');

  return (
    <Container>
      <CreateRoom connectToRoom={connectToRoom} />
      <ConversationListContainer>
        {conversationRooms.length > 0 &&
          conversationRooms.map(room => <ConversationListItem key={room.id} {...room} />)}
      </ConversationListContainer>
    </Container>
  );
};
