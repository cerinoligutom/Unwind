import React from 'react';
import { Container } from './HomePage.styles';
import { Login } from '../../components/Login/Login';
import { RouterProps } from 'react-router';

interface IHomePageProps extends RouterProps {}

export const HomePage = (props: IHomePageProps) => {
  return (
    <Container>
      <Login history={props.history} />
    </Container>
  );
};
