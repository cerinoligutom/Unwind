import React from 'react';
import {
  Container,
  ImageContainer,
  ParticipantDetails,
  ParticipantUsername,
  ParticipantName,
} from './ConversationParticipant.styles';
import { User } from '../../models/User';

export const ConversationParticipant = ({ firstName, lastName, username, avatarUrl }: User) => {
  return (
    <Container>
      <ImageContainer>
        {avatarUrl && (
          <img
            style={{
              objectFit: 'contain',
              height: '100%',
              width: '100%',
            }}
            src={avatarUrl}
          />
        )}
        {!avatarUrl && username.charAt(0)}
      </ImageContainer>
      <ParticipantDetails>
        <ParticipantUsername>{username}</ParticipantUsername>
        <ParticipantName>{`${firstName} ${lastName}`}</ParticipantName>
      </ParticipantDetails>
    </Container>
  );
};
