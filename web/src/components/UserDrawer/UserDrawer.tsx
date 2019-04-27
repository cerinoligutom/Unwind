import React from 'react';
import { useGlobal, setGlobal } from 'reactn';
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
  FormContainer,
  ActionsContainer,
} from './UserDrawer.styles';
import { User } from '../../models/User';
import { IEditProfileForm } from '../../models/IEditProfileForm';
import ReactModal from 'react-modal';
import { useModal } from 'react-modal-hook';
import { Formik, FormikActions, FormikProps, Form, Field, ErrorMessage } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import { userService } from '../../services/user.service';
import toastr from 'toastr';
import { localStorageService } from '../../services/local-storage.service';
import { RouterProps } from 'react-router';

const modalStyle: ReactModal.Styles = {
  content: {
    height: '350px',
    width: '400px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#26262b',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
};

const fieldStyle = {
  marginBottom: '24px',
  width: '350px',
};

interface IUserDrawerProps extends RouterProps {}

export const UserDrawer = ({ history }: IUserDrawerProps) => {
  const [user] = useGlobal<User>('user');

  const logout = () => {
    localStorageService.clear();

    setGlobal({
      user: {},
      conversationRooms: [],
      activeConversationRoomId: '',
    });

    toastr.success('Successfully logged out.');

    history.replace('/');
  };

  const [showModal, hideModal] = useModal(() => {
    const [user, setUser] = useGlobal<User>('user');

    return (
      <ReactModal isOpen ariaHideApp={false} style={modalStyle}>
        <h4>Edit profile</h4>
        <Formik
          initialValues={{
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            avatarUrl: user.avatarUrl,
          }}
          onSubmit={(values: IEditProfileForm, actions: FormikActions<IEditProfileForm>) => {
            actions.setSubmitting(true);

            userService
              .updateUser(user.id, values)
              .then(user => {
                toastr.success(`Profile updated!`);
                setUser(user);
                setTimeout(() => {
                  hideModal();
                }, 500);
              })
              .catch(err => {
                toastr.error(err.errors.map((x: any) => x.message).join('\n'));
                console.error('error:', err);
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
          render={({ isSubmitting }: FormikProps<IEditProfileForm>) => (
            <Form>
              <FormContainer>
                <Field
                  style={fieldStyle}
                  required
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  component={TextField}
                />
                <ErrorMessage name="firstName" component="div" />

                <Field
                  style={fieldStyle}
                  required
                  type="text"
                  name="middleName"
                  placeholder="Middle name"
                  component={TextField}
                />
                <ErrorMessage name="middleName" component="div" />

                <Field
                  style={fieldStyle}
                  required
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  component={TextField}
                />
                <ErrorMessage name="lastName" component="div" />

                <Field
                  style={fieldStyle}
                  required
                  type="text"
                  name="avatarUrl"
                  placeholder="Avatar URL"
                  component={TextField}
                />
                <ErrorMessage name="avatarUrl" component="div" />

                <ActionsContainer>
                  <Button onClick={hideModal}>Close</Button>

                  <Button type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </ActionsContainer>
              </FormContainer>
            </Form>
          )}
        />
      </ReactModal>
    );
  });

  return (
    <Container>
      {user && (
        <>
          <ImageContainer>
            {user.avatarUrl && (
              <img
                style={{
                  objectFit: 'contain',
                  height: '100%',
                  width: '100%',
                }}
                src={user.avatarUrl}
              />
            )}
            {!user.avatarUrl && user.username && user.username.charAt(0)}
          </ImageContainer>
          <UserDetails>
            <Username>{user.username}</Username>
            <Email>{user.email}</Email>
            <FullName>{`${user.firstName} ${user.lastName}`}</FullName>
          </UserDetails>
        </>
      )}
      <ActionsDrawer>
        <Action onClick={showModal}>
          <i className="far fa-edit" />
        </Action>
        <Action onClick={logout}>
          <i className="fas fa-sign-out-alt" />
        </Action>
      </ActionsDrawer>
    </Container>
  );
};
