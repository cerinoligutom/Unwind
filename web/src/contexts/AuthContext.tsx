import React, { useState } from 'react';
import { RouteProps } from 'react-router';

export const AuthContext = React.createContext({});

export const AuthContextProvider = (props: RouteProps) => {
  const [user, setUser] = useState({});

  return <AuthContext.Provider value={{ user, setUser }}>{props.children}</AuthContext.Provider>;
};
