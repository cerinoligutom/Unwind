import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import { Container } from './MessageInput.styles';
import { messageService } from '../../services/message.service';
import TextareaAutosize from 'react-textarea-autosize';
import toastr from 'toastr';

export const MessageInput = () => {
  const [activeConversationRoomId] = useGlobal<string>('activeConversationRoomId');
  const [message, setMessage] = useState('');

  useEffect(() => {
    return () => {
      setMessage('');
    };
  }, [activeConversationRoomId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const keyPressed = e.keyCode || e.which || e.charCode;

    if (!e.shiftKey && keyPressed == 13 && message.trim().length > 0) {
      e.preventDefault();

      const messageDraft = message;
      setMessage('');

      messageService.createMessage(activeConversationRoomId, messageDraft).catch(() => {
        setMessage(messageDraft);
        toastr.error('Oops. Something went wrong.');
      });
    }
  };

  return (
    <Container>
      <TextareaAutosize
        style={{
          resize: 'none',
          borderRadius: '0.25rem',
          width: '100%',
          padding: '0.25rem 1rem',
          margin: '0.5rem',
        }}
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        minRows={1}
        maxRows={5}
        placeholder="Send a message..."
      />
    </Container>
  );
};
