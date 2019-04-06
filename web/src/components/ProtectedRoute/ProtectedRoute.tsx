import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

interface IProtectedRouteProps {
  component: Component;
  [key: string]: any;
}

const PrivateRoute = ({ component, ...rest }: IProtectedRouteProps) => {
  // TODO: get value from context
  const isAuth = true;
  return (
    <Route
      {...rest}
      render={props => {
        return isAuth ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};
