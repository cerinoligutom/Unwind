import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps, RouteComponentProps } from 'react-router';
import { apiService } from '../../services/api.service';

export const PrivateRoute = ({ component, ...rest }: RouteProps) => {
  if (!component) {
    throw Error('component is undefined');
  }

  const Component = component; // JSX Elements have to be uppercase.
  const render = (props: RouteComponentProps<any>): React.ReactNode => {
    if (apiService.getToken(false)) {
      return <Component {...props} />;
    }
    return <Redirect to="/" />;
  };

  return <Route {...rest} render={render} />;
};
