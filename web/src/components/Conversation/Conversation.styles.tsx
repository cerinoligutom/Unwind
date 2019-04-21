import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  height: 95vh;

  padding: 1rem;

  overflow-y: scroll;

  background: #4a4a53;
`;

export const RoomDetails = styled.div`
  display: flex;
  flex-direction: row;

  margin: 0.5rem;
`;

export const RoomName = styled.div`
  font-weight: bold;
`;
