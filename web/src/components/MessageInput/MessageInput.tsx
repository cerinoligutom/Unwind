import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import { Container, TextArea } from './MessageInput.styles';
import { messageService } from '../../services/message.service';
import TextareaAutosize from 'react-textarea-autosize';

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

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const keyPressed = e.keyCode || e.which || e.charCode;

    // TODO: Pressing shift + enter on textarea for a new line shouldn't send the message
    // 13 is enter
    if (keyPressed == 13 && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();

      messageService.createMessage(activeConversationRoomId, message).then(message => {
        console.log('message sent:', message);
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
        onKeyUp={handleInputKeyUp}
        minRows={1}
        maxRows={5}
        placeholder="Send a message..."
      />
    </Container>
  );
};
