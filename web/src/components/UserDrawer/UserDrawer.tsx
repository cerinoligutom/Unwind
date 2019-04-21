import React from 'react';
import { useGlobal } from 'reactn';
import { Container } from './UserDrawer.styles';
import { User } from '../../models/User';

export const UserDrawer = () => {
  const [user] = useGlobal<User>('user');

  return (
    <Container>{`${user.firstName} ${user.lastName}`}</Container>
  )
};
