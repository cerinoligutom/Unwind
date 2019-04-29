import React, { useEffect } from 'react';
import { Container } from './HomePage.styles';
import { Login } from '../../components/Login/Login';
import { RouterProps } from 'react-router';
import { apiService } from '../../services/api.service';

interface IHomePageProps extends RouterProps {}

export const HomePage = (props: IHomePageProps) => {
  useEffect(() => {
    if (apiService.getToken(false)) {
      console.log('token:', apiService.getToken(false));
      console.log('fired');
      props.history.replace('/chat');
    }
  }, []);

  return (
    <Container>
      <Login history={props.history} />
    </Container>
  );
};
