import React, { useEffect } from 'react';
import { useGlobal } from 'reactn';
import { Container } from './Conversation.styles';
import { ConversationRoom } from '../../models/ConversationRoom';
import { conversationRoomService } from '../../services/conversation-room.service';
import { messageReducer, actions } from '../../reducers/message.reducer';

export const Conversation = () => {
  const [conversationRooms] = useGlobal<ConversationRoom[]>('conversationRooms');
  const [activeConversationRoomId] = useGlobal<string>('activeConversationRoomId');
  const dispatch = useGlobal(messageReducer);

  const conversationRoom = conversationRooms.find(room => room.id === activeConversationRoomId);

  useEffect(() => {
    if (activeConversationRoomId && conversationRoom && !conversationRoom.cursor) {
      conversationRoomService.getPreviousMessages(activeConversationRoomId, '').then(data => {
        console.log('data', data);
        dispatch(
          actions.addOldMessages({
            conversationRoomId: activeConversationRoomId,
            messages: data.results,
            cursor: data.pageInfo.next,
            hasOldMessages: data.pageInfo.hasNext,
          }),
        );
      });
    }
  }, [activeConversationRoomId]);

  return (
    <Container>
      <pre>{JSON.stringify(conversationRoom, null, 2)}</pre>
    </Container>
  );
};
