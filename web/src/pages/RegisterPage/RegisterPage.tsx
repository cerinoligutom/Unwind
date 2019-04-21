import React from 'react';
import { Container } from './RegisterPage.styles';
import { Register } from '../../components/Register/Register';
import { RouterProps } from 'react-router';

interface IRegisterPageProps extends RouterProps {}

export const RegisterPage = (props: IRegisterPageProps) => {
  return (
    <Container>
      <Register history={props.history} />
    </Container>
  );
};
