import styled from 'styled-components';

export const ActionsDrawer = styled.div`
  display: flex;
  flex-direction: row;

  position: absolute;
  left: 100%;
  top: 0;

  padding: 1rem;

  height: 100%;
  width: 100%;

  background-color: #26262b;
  color: white;

  transition: left 0.25s;
`;

export const Action = styled.button`
  border: 2px solid white;
  border-radius: 0.25rem;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 6px;
  font-size: 2rem;

  background-color: #4A4A53;
  color: white;
  transition: background-color 0.5s, color 0.5s;

  :hover {
    background-color: white;
    color: black;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;

  height: 12vh;
  width: 300px;

  position: fixed;
  top: 0;
  left: 0;

  padding: 1rem;

  background: #26262b;

  &:hover ${ActionsDrawer} {
    left: 0;
  }
`;

export const Logout = styled.div`
  font-size: 0.8rem;
  position: absolute;
  margin: 0 auto;
  bottom: -35px;
  border: 1px solid white;
  border-radius: 16px;
  width: 100%;
  text-align: center;
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  font-size: 30px;
  text-transform: capitalize;

  border-radius: 50%;
  border: 2px solid white;

  margin-right: 0.5rem;

  width: 60px;
  min-width: 60px;
  max-width: 60px;
  height: 60px;
  min-height: 60px;
  max-height: 60px;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;

  flex-grow: 1;

  overflow: hidden;
`;

export const Username = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.2rem;
`;

export const Email = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FullName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
