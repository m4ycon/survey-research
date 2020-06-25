import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './global.css';
import Home from './pages/Home';
import Results from './pages/Results';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={Results} path="/results" exact />
      </Switch>
    </BrowserRouter>
  );
}
