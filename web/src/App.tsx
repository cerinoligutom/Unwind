import React from 'react';
import { setGlobal } from 'reactn';
import './App.scss';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { ChatPage } from './pages/ChatPage/ChatPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

import moment from 'moment';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '>1s',
    ss: '%ss',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1M',
    MM: '%dM',
    y: '1Y',
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
      <PrivateRoute exact path="/chat" component={ChatPage} />
      {/* <Route exact path="/profile" component={ProfilePage} /> */}
      {/* <Route exact path="/profile/:id" component={ProfilePage} /> */}
      {/* <Route component={NotFoundPage} /> */}
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

export default App;
