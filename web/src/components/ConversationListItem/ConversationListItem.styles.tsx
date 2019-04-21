import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  overflow: hidden;

  padding: 0.25rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;

  background-color: ${(props: { active?: boolean }) => (props.active ? '#4A4A53' : '#26262b')};

  :hover {
    background-color: #4a4a53;
    cursor: pointer;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 30px;
  text-transform: capitalize;

  border-radius: 50%;
  border: 2px solid white;

  margin-right: 0.5rem;

  min-width: 50px;
  min-height: 50px;
`;

export const RoomDetails = styled.div`
  display: flex;
  flex-direction: column;

  flex-grow: 1;

  overflow: hidden;
`;

export const RoomName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LatestMessage = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
