import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  padding: 0.25rem;
  margin: 0 0.25rem 0.5rem;
  border-radius: 0.25rem;

  transition: background-color 0.25s;

  :hover {
    background-color: #4a4a53;
    cursor: pointer;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
  text-transform: capitalize;

  border-radius: 50%;
  border: 2px solid white;

  margin-right: 0.5rem;

  width: 30px;
  min-width: 30px;
  height: 30px;
  min-height: 30px;

  overflow: hidden;
`;

export const ParticipantDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  flex-grow: 1;

  overflow: hidden;
`;

export const ParticipantUsername = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
