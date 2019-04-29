import React from 'react';
import {
  Container,
  ImageContainer,
  ParticipantDetails,
  ParticipantUsername,
} from './ConversationParticipant.styles';
import { User } from '../../models/User';

export const ConversationParticipant = ({ username, avatarUrl }: User) => {
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
      </ParticipantDetails>
    </Container>
  );
};
