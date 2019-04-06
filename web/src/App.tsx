import React from 'react';
import './App.scss';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { ChatPage } from './pages/ChatPage/ChatPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/chat" component={ChatPage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/profile/:id" component={ProfilePage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
