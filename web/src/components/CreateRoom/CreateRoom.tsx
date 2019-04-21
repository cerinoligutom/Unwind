import React from 'react';
import { useGlobal } from 'reactn';
import { Container, CreateRoomButton } from './CreateRoom.styles';
import { Formik, FormikActions, FormikProps, Form, Field, ErrorMessage } from 'formik';
import toastr from 'toastr';
import ReactModal from 'react-modal';
import { useModal } from 'react-modal-hook';
import { conversationRoomService } from '../../services/conversation-room.service';

const modalStyle: ReactModal.Styles = {
  content: {
    height: '200px',
    width: '600px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
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
        <h1>Unwind</h1>
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
              .catch(() => {
                toastr.error('Oops! Something went wrong.');
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
          render={({ isSubmitting }: FormikProps<ICreateRoomFormValues>) => (
            <Form>
              <Field min="3" type="text" name="name" placeholder="Conversation room name" />
              <ErrorMessage name="name" component="div" />

              <button type="submit" disabled={isSubmitting}>
                Create
              </button>
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
