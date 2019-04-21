import React from 'react';
import { useGlobal } from 'reactn';
import { Container } from './ConversationListSidebar.styles';
import { ConversationRoom } from '../../models/ConversationRoom';
import { CreateRoom } from '../CreateRoom/CreateRoom';

export const ConversationListSidebar = () => {
  const [conversationRooms] = useGlobal<ConversationRoom[]>('conversationRooms');

  return (
    <Container>
      <CreateRoom />
      <pre>{JSON.stringify(conversationRooms, null, 2)}</pre>
    </Container>
  );
};
