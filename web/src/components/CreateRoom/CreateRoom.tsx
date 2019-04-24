import React from 'react';
import { useGlobal } from 'reactn';
import { Container, CreateRoomButton, FormContainer, ActionsContainer } from './CreateRoom.styles';
import { Formik, FormikActions, FormikProps, Form, Field, ErrorMessage } from 'formik';
import toastr from 'toastr';
import ReactModal from 'react-modal';
import { useModal } from 'react-modal-hook';
import { conversationRoomService } from '../../services/conversation-room.service';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';

const modalStyle: ReactModal.Styles = {
  content: {
    height: '185px',
    width: '600px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#26262b',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
};

interface ICreateRoomFormValues {
  name: string;
}

export const CreateRoom = () => {
  const [, setActiveConversationRoomId] = useGlobal<string>('activeConversationRoomId');
  const [showModal, hideModal] = useModal(() => {
    return (
      <ReactModal isOpen ariaHideApp={false} style={modalStyle}>
        <h4>Create a new room</h4>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={(values: ICreateRoomFormValues, actions: FormikActions<ICreateRoomFormValues>) => {
            actions.setSubmitting(true);

            conversationRoomService
              .create(values.name)
              .then(room => {
                toastr.success(`Room ${values.name} created.`);

                setTimeout(() => {
                  setActiveConversationRoomId(room.id);
                  hideModal();
                }, 1000);
              })
              .catch((err) => {
                toastr.error(err.errors.map((x: any) => x.message).join('\n'));
                console.log('error:', err);
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
          render={({ isSubmitting }: FormikProps<ICreateRoomFormValues>) => (
            <Form>
              <FormContainer>
                <Field style={{ margin: '12px 0 24px' }} required min="3" type="text" name="name" placeholder="Conversation room name" component={TextField} />
                <ErrorMessage name="name" component="div" />

                <ActionsContainer>
                  <Button onClick={hideModal}>Close</Button>

                  <Button type="submit" disabled={isSubmitting}>
                    Create
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
      <CreateRoomButton onClick={showModal}>+ Create a new room</CreateRoomButton>
    </Container>
  );
};
