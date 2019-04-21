import React from 'react';
import { Container, ImageContainer, RoomDetails, RoomName, LatestMessage } from './ConversationListItem.styles';
import { ConversationRoom } from '../../models/ConversationRoom';
import { useGlobal } from 'reactn';

export const ConversationListItem = ({ id, name, messages }: ConversationRoom) => {
  const [activeConversationRoomId, setActiveConversationRoomId] = useGlobal<string>('activeConversationRoomId');
  
  return (
    <Container onClick={() => { setActiveConversationRoomId(id) }} active={activeConversationRoomId === id}>
      <ImageContainer>{name.charAt(0)}</ImageContainer>
      <RoomDetails>
        <RoomName>{name}</RoomName>
        {messages.length > 0 && (
          <LatestMessage>
            {messages[0].sender.firstName}: {messages[0].text}
          </LatestMessage>
        )}
      </RoomDetails>
    </Container>
  );
};
