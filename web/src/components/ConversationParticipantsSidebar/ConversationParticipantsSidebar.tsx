import React, { useEffect, useState } from 'react';
import { useGlobal } from 'reactn';
import { Container } from './ConversationParticipantsSidebar.styles';
import { ConversationRoom } from '../../models/ConversationRoom';
import { User } from '../../models/User';

export const ConversationParticipantsSidebar = () => {
  const [conversationRooms] = useGlobal<ConversationRoom[]>('conversationRooms');
  const [activeConversationRoomId] = useGlobal<string>('activeConversationRoomId');

  const conversationRoom = conversationRooms.find(room => room.id === activeConversationRoomId);
  const participants = conversationRoom ? conversationRoom.participants : [];

  return (
    <Container>
      <pre>{JSON.stringify(participants, null, 2)}</pre>
    </Container>
  );
};
