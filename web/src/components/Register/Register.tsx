import React from 'react';
import { RouterProps } from 'react-router';
import { Formik, FormikActions, FormikProps, Form, ErrorMessage, Field } from 'formik';
import { authService } from '../../services/auth.service';
import toastr from 'toastr';
import { IRegisterForm } from '../../models/IRegisterForm';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import { Fields, Container, Actions } from './Register.styles';

const formInitialValues: IRegisterForm = {
  username: '',
  email: '',
  hash: '',
};

const fieldStyle = {
  marginBottom: '24px',
  width: '350px',
};

interface IRegisterProps extends RouterProps {}

export const Register = ({ history }: IRegisterProps) => {
  return (
    <div>
      <h1>Unwind</h1>
      <Formik
        initialValues={formInitialValues}
        onSubmit={(values: IRegisterForm, actions: FormikActions<IRegisterForm>) => {
          actions.setSubmitting(true);

          authService
            .register(values)
            .then(() => {
              toastr.success('Registered successfully!');
              history.push('/');
            })
            .catch((err: any) => {
              toastr.error(err.errors.map((x: any) => x.message).join('\n'));
              console.error('error:', err);
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
        render={({ isSubmitting }: FormikProps<IRegisterForm>) => (
          <Form>
            <Container>
              <Fields>
                <Field
                  style={fieldStyle}
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  component={TextField}
                />
                <ErrorMessage name="username" component="div" />

                <Field
                  style={fieldStyle}
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  component={TextField}
                />
                <ErrorMessage name="email" component="div" />

                <Field
                  style={fieldStyle}
                  type="password"
                  name="hash"
                  placeholder="Password"
                  required
                  component={TextField}
                />
                <ErrorMessage name="password" component="div" />
              </Fields>

              <Actions>
                <Button variant="outlined" type="submit" disabled={isSubmitting}>
                  Register
                </Button>
              </Actions>
            </Container>
          </Form>
        )}
      />
    </div>
  );
};
