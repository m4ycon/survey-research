import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './global.css';
import Home from './pages/Home';
import Results from './pages/Results';
import ConfirmVote from './pages/ConfirmedVote/Index';
import Success from './pages/ConfirmedVote/Success';
import Failure from './pages/ConfirmedVote/Failure';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={ConfirmVote} path="/confirm-vote" exact />
        <Route component={Success} path="/confirm-vote/success" exact />
        <Route component={Failure} path="/confirm-vote/failure" exact />
        <Route component={Results} path="/results" exact />
      </Switch>
    </BrowserRouter>
  );
}
