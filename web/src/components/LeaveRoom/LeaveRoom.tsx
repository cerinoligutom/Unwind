import React from 'react';
import { Button } from '@material-ui/core';
import ReactModal from 'react-modal';
import { useGlobal } from 'reactn';
import { useModal } from 'react-modal-hook';
import { ModalContainer, Actions } from './LeaveRoom.styles';
import { conversationRoomService } from '../../services/conversation-room.service';
import { User } from '../../models/User';
import { conversationRoomReducer, actions } from '../../reducers/conversationRoom.reducer';
import toastr from 'toastr';

const modalStyle: ReactModal.Styles = {
  content: {
    height: '160px',
    width: '520px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#26262b',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
};

interface ILeaveRoomProps {
  disconnectFromRoom(roomId: string): any;
}

export const LeaveRoom = ({ disconnectFromRoom }: ILeaveRoomProps) => {
  const [user] = useGlobal<User>('user');

  const dispatch = useGlobal(conversationRoomReducer);

  const [showModal, hideModal] = useModal(() => {
    const [roomId] = useGlobal<string>('activeConversationRoomId');

    const handleLeaveRoomClick = () => {
      conversationRoomService.leaveConversationRoom(user.id, roomId).then(() => {
        dispatch(actions.leaveRoom({ conversationRoomId: roomId }));
        disconnectFromRoom(roomId);
        hideModal();
      }).catch(err => {
        console.log('error:', err);
        toastr.error('Oops. Something went wrong.');
      });
    };

    return (
      <ReactModal isOpen ariaHideApp={false} style={modalStyle}>
        <ModalContainer>
          <h4>Are you sure you want to leave this room?</h4>
          <Actions>
            <Button onClick={hideModal}>Cancel</Button>
            <Button
              style={{
                backgroundColor: '#f44336',
                marginLeft: '1rem',
              }}
              onClick={handleLeaveRoomClick}
            >
              Yes, get me out of here.
            </Button>
          </Actions>
        </ModalContainer>
      </ReactModal>
    );
  });

  return <Button onClick={showModal}>Leave room</Button>;
};
