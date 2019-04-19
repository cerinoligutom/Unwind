import React from 'react';
import { RouterProps } from 'react-router';
import { Formik, FormikActions, FormikProps, Form, Field, ErrorMessage } from 'formik';
import { authService } from '../../services/auth.service';

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
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />

            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      />
    </div>
  );
};
