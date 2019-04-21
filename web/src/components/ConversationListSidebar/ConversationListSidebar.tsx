import React from 'react';
import { useGlobal } from 'reactn';
import { Container } from './ConversationListSidebar.styles';
import { ConversationRoom } from '../../models/ConversationRoom';
import { CreateRoom } from '../CreateRoom/CreateRoom';
import { ConversationListItem } from '../ConversationListItem/ConversationListItem';

export const ConversationListSidebar = () => {
  const [conversationRooms] = useGlobal<ConversationRoom[]>('conversationRooms');

  console.log('conversationRooms:', conversationRooms);

  return (
    <Container>
      <CreateRoom />
      {conversationRooms.map(room => (
        <ConversationListItem key={room.id} {...room} />
      ))}
    </Container>
  );
};
