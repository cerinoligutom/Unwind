import React from 'react';
import { RouterProps } from 'react-router';
import { Formik, FormikActions, FormikProps, Form, Field, ErrorMessage } from 'formik';
import { authService } from '../../services/auth.service';
import toastr from 'toastr';
import { IRegisterForm } from '../../models/IRegisterForm';

const formInitialValues: IRegisterForm = {
  firstName: '',
  middleName: '',
  lastName: '',
  username: '',
  email: '',
  hash: '',
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
              console.log('error:', err);
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
        render={({ isSubmitting }: FormikProps<IRegisterForm>) => (
          <Form>
            <Field type="text" name="firstName" placeholder="First Name" required />
            <ErrorMessage name="firstName" component="div" />

            <Field type="text" name="middleName" placeholder="Middle Name" />
            <ErrorMessage name="middleName" component="div" />

            <Field type="text" name="lastName" placeholder="Last Name" required />
            <ErrorMessage name="lastName" component="div" />

            <Field type="text" name="username" placeholder="Username" required />
            <ErrorMessage name="username" component="div" />

            <Field type="email" name="email" placeholder="Email" required />
            <ErrorMessage name="email" component="div" />

            <Field type="password" name="hash" placeholder="Password" required />
            <ErrorMessage name="password" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      />
    </div>
  );
};
