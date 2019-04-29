import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 90vh;
  width: 300px;

  position: fixed;
  bottom: 0;
  left: 0;

  padding: 1rem;

  background: #26262b;
`;

export const RoomActions = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;

export const ConversationListContainer = styled.div`
  display: flex;
  flex-direction: column;

  flex-grow: 1;

  overflow-y: auto;
`;