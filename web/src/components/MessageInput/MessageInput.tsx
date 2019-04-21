import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import { Container } from './MessageInput.styles';
import { messageService } from '../../services/message.service';

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
    if (keyPressed == 13) {
      e.preventDefault();
      e.stopPropagation();

      messageService.createMessage(activeConversationRoomId, message).then(message => {
        console.log('message sent:', message);
      });
    }
  };

  return (
    <Container>
      <textarea value={message} onChange={handleInputChange} onKeyUp={handleInputKeyUp} />
    </Container>
  );
};
