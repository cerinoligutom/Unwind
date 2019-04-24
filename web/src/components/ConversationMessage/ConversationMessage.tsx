import React from 'react';
import { Message } from '../../models/Message';
import {
  Container,
  ImageContainer,
  Username,
  Text,
  Date,
  UsernameAndDateContainer,
  MessageDetails,
} from './ConversationMessage.styles';
import moment from 'moment';

export const ConversationMessage = (message: Message) => {
  return (
    <Container>
      <ImageContainer>
        {message.sender.avatarUrl && (
          <img
            style={{
              objectFit: 'contain',
              height: '100%',
              width: '100%',
            }}
            src={message.sender.avatarUrl}
          />
        )}
        {!message.sender.avatarUrl && message.sender.username.charAt(0)}
      </ImageContainer>
      <MessageDetails>
        <UsernameAndDateContainer>
          <Username>{message.sender.username}</Username>
          <Date>{moment(message.createdAt).fromNow()}</Date>
        </UsernameAndDateContainer>
        <Text>{message.text}</Text>
      </MessageDetails>
    </Container>
  );
};
