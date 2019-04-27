import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import { ModalContainer, Actions } from './CreateRoomInviteCode.styles';
import toastr from 'toastr';
import { useModal } from 'react-modal-hook';
import { Button } from '@material-ui/core';
import ReactModal from 'react-modal';
import { conversationRoomService } from '../../services/conversation-room.service';

const modalStyle: ReactModal.Styles = {
  content: {
    height: '240px',
    width: '700px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#26262b',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
};

export const CreateRoomInviteCode = () => {

  const [showModal, hideModal] = useModal(() => {
    const [isLoading, setIsLoading] = useState(true);
    const [code, setCode] = useState('');
    const [roomId] = useGlobal<string>('activeConversationRoomId');


    const handleCopyToClipboard = () => {
      const dummy = document.createElement('input');
      document.body.appendChild(dummy);
      dummy.setAttribute('value', code);
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);

      toastr.info('Invitation code copied to clipboard');
    };

    useEffect(() => {
      console.log('effect trigger');

      if (!code) {
        conversationRoomService
          .generateInvitationKey(roomId)
          .then(({ invitationKey }) => {
            setCode(invitationKey);
          })
          .catch((err: any) => {
            console.log('error:', err);
            toastr.error('Oops. Something went wrong.');
            hideModal();
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }, []);
    return (
      <ReactModal isOpen ariaHideApp={false} style={modalStyle}>
        <ModalContainer key={roomId}>
          {!isLoading ? (
            <>
              <h4>Invitation Code:</h4>
              <pre
                style={{
                  margin: '1rem',
                  fontSize: '2rem',
                }}
              >
                {code}
              </pre>
              <h5>Note: This invitation code expires after 24 hours.</h5>
              <Actions>
                <Button
                  style={{
                    backgroundColor: '#f44336',
                  }}
                  onClick={hideModal}
                >
                  Close
                </Button>
                <Button
                  style={{
                    backgroundColor: '#4caf50',
                    marginLeft: '0.5rem',
                  }}
                  onClick={handleCopyToClipboard}
                >
                  Copy to clipboard
                </Button>
              </Actions>
            </>
          ) : (
            <h4>Generating code. Please wait.</h4>
          )}
        </ModalContainer>
      </ReactModal>
    );
  });

  // const handleButtonClick = () => {
  //   console.log('clicked');

  //   setTimeout(() => {
  //     setIsLoading(false);
  //     console.log('isLoading:', isLoading);
  //   }, 1000)

  //   showModal();
  // };

  return <Button onClick={showModal}>Create invite code</Button>;
};
