import React from 'react';
import { RouterProps } from 'react-router';
import { Formik, FormikActions, FormikProps, Form, ErrorMessage, Field } from 'formik';
import { authService } from '../../services/auth.service';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import { Container, Actions, Fields } from './Login.styles';
import { Link } from 'react-router-dom';

interface ILoginFormValues {
  email: string;
  password: string;
}

const formInitialValues: ILoginFormValues = { email: '', password: '' };

interface ILoginProps extends RouterProps {}

export const Login = ({ history }: ILoginProps) => {
  return (
    <div>
      <h1>Unwind</h1>
      <Formik
        initialValues={formInitialValues}
        onSubmit={(values: ILoginFormValues, actions: FormikActions<ILoginFormValues>) => {
          actions.setSubmitting(true);

          authService
            .login(values.email, values.password)
            .then(() => {
              history.push('/chat');
            })
            .catch(err => {
              console.log('error:', err);
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
        render={({ isSubmitting }: FormikProps<ILoginFormValues>) => (
          <Form>
            <Container>
              <Fields>
                <Field
                  style={{ marginRight: '8px', width: '250px' }}
                  type="email"
                  name="email"
                  placeholder="Email"
                  component={TextField}
                />
                <ErrorMessage name="email" component="div" />

                <Field
                  style={{ width: '250px' }}
                  type="password"
                  name="password"
                  placeholder="Password"
                  component={TextField}
                />
                <ErrorMessage name="password" component="div" />
              </Fields>

              <Actions>
                <Link style={{ color: 'grey' }} to="/register">
                  Do not have an account yet? Sign up here.
                </Link>
                <Button variant="outlined" type="submit" disabled={isSubmitting}>
                  Login
                </Button>
              </Actions>
            </Container>
          </Form>
        )}
      />
    </div>
  );
};
