import React, { useEffect, useState } from 'react';
import { useGlobal } from 'reactn';
import { Container } from './ConversationParticipantsSidebar.styles';
import { ConversationRoom } from '../../models/ConversationRoom';
import { ConversationParticipant } from '../ConversationParticipant/ConversationParticipant';

export const ConversationParticipantsSidebar = () => {
  const [conversationRooms] = useGlobal<ConversationRoom[]>('conversationRooms');
  const [activeConversationRoomId] = useGlobal<string>('activeConversationRoomId');

  const conversationRoom = conversationRooms.find(room => room.id === activeConversationRoomId);
  const participants = conversationRoom ? conversationRoom.participants : [];

  return (
    <Container>
      {participants
        .sort((a, b) => a.username.toLowerCase().localeCompare(b.username.toLowerCase()))
        .map(participant => (
          <ConversationParticipant key={participant.id} {...participant} />
        ))}
    </Container>
  );
};
