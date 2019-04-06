import React from 'react';
import { ISsoButtonProps } from '../../interfaces/ISsoButtonProps';
import { SsoButton } from '../SsoButton/SsoButton';
import { RouterProps } from 'react-router';

interface ILoginProps extends RouterProps {}

export const Login = ({ history }: ILoginProps) => {
  const ssoButtonData: ISsoButtonProps[] = [
    {
      text: 'Login with Facebook',
      faIcon: 'fab fa-facebook-square',
      backgroundColor: '',
      onClick: () => {
        history.push('/chat');
      },
    },
    {
      text: 'Login with Google',
      faIcon: 'fab fa-google',
      backgroundColor: '',
      onClick: () => {
        history.push('/chat');
      },
    },
    {
      text: 'Login with Microsoft',
      faIcon: 'fab fa-windows',
      backgroundColor: '',
      onClick: () => {
        history.push('/chat');
      },
    },
    {
      text: 'Login with Twitter',
      faIcon: 'fab fa-twitter-square',
      backgroundColor: '',
      onClick: () => {
        history.push('/chat');
      },
    },
    {
      text: 'Login with Steam',
      faIcon: 'fab fa-steam-square',
      backgroundColor: '',
      onClick: () => {
        history.push('/chat');
      },
    },
    {
      text: 'Login with Discord',
      faIcon: 'fab fa-discord',
      backgroundColor: '',
      onClick: () => {
        history.push('/chat');
      },
    },
  ];

  return (
    <div>
      {ssoButtonData.map((sso, index) => (
        <SsoButton {...sso} key={index} />
      ))}
    </div>
  );
};
