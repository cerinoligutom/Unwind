import React from 'react';
import { useGlobal } from 'reactn';
import { Container, CreateRoomButton } from './ConversationListSidebar.styles';
import { ConversationRoom } from '../../models/ConversationRoom';

export const ConversationListSidebar = () => {
  const [conversationRooms] = useGlobal<ConversationRoom[]>('conversationRooms');

  return (
    <Container>
      <CreateRoomButton>+ Create a new room</CreateRoomButton>
      <pre>{JSON.stringify(conversationRooms, null, 2)}</pre>
    </Container>
  );
};
