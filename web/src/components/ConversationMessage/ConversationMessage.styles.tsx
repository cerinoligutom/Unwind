import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  margin: 0.5rem;
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
  max-width: 50px;

  min-height: 50px;
  max-height: 50px;
`;

export const MessageDetails = styled.div`
  display: flex;
  flex-direction: column;

  flex-grow: 1;
`;

export const UsernameAndDateContainer = styled.div`
  display: flex;
  flex-direction: row;

  flex-grow: 1;
`;

export const Username = styled.div`
  font-weight: bold;
  margin-right: 0.5rem;
`;

export const Text = styled.div`
  display: flex;
  flex-grow: 1;
`;

export const Date = styled.div``;
