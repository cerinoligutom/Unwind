import React, { useEffect } from 'react';
import { useGlobal } from 'reactn';
import { Container, RoomDetails, RoomName } from './Conversation.styles';
import { ConversationRoom } from '../../models/ConversationRoom';
import { conversationRoomService } from '../../services/conversation-room.service';
import { messageReducer, actions } from '../../reducers/message.reducer';
import { ConversationMessage } from '../ConversationMessage/ConversationMessage';
import ScrollableFeed, { ScrollableFeedProps } from 'react-scrollable-feed';

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

  const changeDetectionFilter = (previousProps: any, newProps: any) => {
    return !!conversationRoom && !!conversationRoom.cursor;
  };

  return (
    <>
      <RoomDetails>
        <RoomName>{conversationRoom && conversationRoom.name}</RoomName>
      </RoomDetails>
      <ScrollableFeed forceScroll changeDetectionFilter={changeDetectionFilter}>
        {conversationRoom &&
          conversationRoom.messages.map(message => <ConversationMessage key={message.id} {...message} />)}
      </ScrollableFeed>
    </>
  );
};
