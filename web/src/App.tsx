import React from 'react';
import { setGlobal } from 'reactn';
import './App.scss';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { ChatPage } from './pages/ChatPage/ChatPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import moment from 'moment';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'seconds',
    ss: '%ss',
    m: 'a minute',
    mm: '%dm',
    h: 'an hour',
    hh: '%dh',
    d: 'a day',
    dd: '%dd',
    M: 'a month',
    MM: '%dM',
    y: 'a year',
    yy: '%dY',
  },
});

setGlobal({
  user: {},
  conversationRooms: [],
  activeConversationRoomId: '',
});

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/chat" component={ChatPage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/profile/:id" component={ProfilePage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
