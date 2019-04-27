import React from 'react';
import { useGlobal } from 'reactn';
import { Container, JoinRoomButton, FormContainer, ActionsContainer } from './JoinRoom.styles';
import { Formik, FormikActions, FormikProps, Form, Field, ErrorMessage } from 'formik';
import toastr from 'toastr';
import ReactModal from 'react-modal';
import { useModal } from 'react-modal-hook';
import { conversationRoomService } from '../../services/conversation-room.service';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import { conversationRoomReducer, actions as roomReducerActions } from '../../reducers/conversationRoom.reducer';

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

interface IJoinRoomFormValues {
  invitationCode: string;
}

interface IJoinRoomProps {
  connectToRoom(roomId: string): any;
}

export const JoinRoom = ({ connectToRoom } :IJoinRoomProps) => {
  const [, setActiveConversationRoomId] = useGlobal<string>('activeConversationRoomId');
  const dispatch = useGlobal(conversationRoomReducer);
  const [showModal, hideModal] = useModal(() => {
    return (
      <ReactModal isOpen ariaHideApp={false} style={modalStyle}>
        <h4>Join a room by invitation key</h4>
        <Formik
          initialValues={{ invitationCode: '' }}
          onSubmit={(values: IJoinRoomFormValues, actions: FormikActions<IJoinRoomFormValues>) => {
            actions.setSubmitting(true);

            conversationRoomService
              .joinRoomByInvitationKey(values.invitationCode)
              .then(room => {
                toastr.success(`Joined ${room.name}.`);
                dispatch(roomReducerActions.joinRoom({ conversationRoom: room }))
                connectToRoom(room.id);

                setTimeout(() => {
                  setActiveConversationRoomId(room.id);
                  hideModal();
                }, 1000);
              })
              .catch((err) => {
                console.error('error:', err);
                toastr.error(err.errors.map((x: any) => x.message).join('\n'));
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
          render={({ isSubmitting }: FormikProps<IJoinRoomFormValues>) => (
            <Form>
              <FormContainer>
                <Field style={{ margin: '12px 0 24px' }} required min="3" type="text" name="invitationCode" placeholder="Invitation code to room" component={TextField} />
                <ErrorMessage name="invitationCode" component="div" />

                <ActionsContainer>
                  <Button onClick={hideModal}>Close</Button>

                  <Button type="submit" disabled={isSubmitting}>
                    Join
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
      <JoinRoomButton onClick={showModal}>Join room</JoinRoomButton>
  );
};
