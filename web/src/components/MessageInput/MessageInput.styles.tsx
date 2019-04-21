import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;

  background: #4a4a53;
`;

export const TextArea = styled.textarea`
  resize: none;
  border-radius: 0.25rem;
  width: 100%;
  padding: 0.25rem 1rem;

  :focus {
    outline: none;
  }
`;
