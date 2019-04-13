import React from 'react';
import { ChatContainer } from './ChatPage.styles';
import { ConversationListSidebar } from '../../components/ConversationListSidebar/ConversationListSidebar';
import { ConversationParticipantsSidebar } from '../../components/ConversationParticipantsSidebar/ConversationParticipantsSidebar';
import { Conversation } from '../../components/Conversation/Conversation';

export const ChatPage = () => {
  return (
    <>
      <ConversationListSidebar />
      <ChatContainer>
        <Conversation />
      </ChatContainer>
      <ConversationParticipantsSidebar />
    </>
  );
};
