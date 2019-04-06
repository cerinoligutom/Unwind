import React from 'react';
import { Container, SsoIcon, SsoText } from './SsoButton.styles';
import { ISsoButtonProps } from '../../interfaces/ISsoButtonProps';

export const SsoButton = ({ faIcon, text, backgroundColor, onClick }: ISsoButtonProps) => {
  return (
    <Container backgroundColor={backgroundColor} onClick={onClick}>
      <SsoIcon>
        <i className={faIcon} />
      </SsoIcon>
      <SsoText>{text}</SsoText>
    </Container>
  );
};
