import styled, { css } from 'styled-components';

interface IContainerProps {
  backgroundColor: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: 220px;
  color: white;
  margin: 8px;
  padding: 8px 16px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);

  :hover {
    cursor: pointer;
  }

  ${(props: IContainerProps) =>
    props.backgroundColor &&
    css`
      background-color: ${props.backgroundColor};
    `}
`;

export const SsoIcon = styled.div`
  text-align: center;
  width: 10%;
`;

export const SsoText = styled.div`
  padding-left: 1rem;
  width: 90%;
`;
