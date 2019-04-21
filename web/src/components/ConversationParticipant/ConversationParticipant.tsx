import React from 'react';
import {
  Container,
  ImageContainer,
  ParticipantDetails,
  ParticipantUsername,
  ParticipantName,
} from './ConversationParticipant.styles';
import { User } from '../../models/User';

export const ConversationParticipant = ({ firstName, lastName, username }: User) => {
  return (
    <Container>
      <ImageContainer>{username.charAt(0)}</ImageContainer>
      <ParticipantDetails>
        <ParticipantUsername>{username}</ParticipantUsername>
        <ParticipantName>{`${firstName} ${lastName}`}</ParticipantName>
      </ParticipantDetails>
    </Container>
  );
};
