import React from 'react';
import { useGlobal } from 'reactn';
import {
  Container,
  ImageContainer,
  UserDetails,
  Username,
  Email,
  FullName,
  Logout,
  ActionsDrawer,
  Action,
} from './UserDrawer.styles';
import { User } from '../../models/User';

export const UserDrawer = () => {
  const [user] = useGlobal<User>('user');

  return (
    <Container>
      {user && (
        <>
          <ImageContainer>{user.username && user.username.charAt(0)}</ImageContainer>
          <UserDetails>
            <Username>{user.username}</Username>
            <Email>{user.email}</Email>
            <FullName>{`${user.firstName} ${user.lastName}`}</FullName>
          </UserDetails>
        </>
      )}
      <ActionsDrawer>
        <Action>
          <i className="far fa-edit" />
        </Action>
        <Action>
          <i className="fas fa-sign-out-alt" />
        </Action>
      </ActionsDrawer>
    </Container>
  );
};
