import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  height: 95vh;

  padding: 1rem;

  overflow-y: auto;

  background: #4a4a53;
`;

export const RoomDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin: 0 0.5rem 0.5rem;
  padding: 0.25rem;

  border-bottom: 2px solid white;
`;

export const RoomName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-weight: bold;
  font-size: 1.5rem;
`;

export const RoomActions = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  margin-left: 1rem;
`;
