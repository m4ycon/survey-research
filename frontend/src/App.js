import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './global.css';
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} path="/" exact />
      </Switch>
    </BrowserRouter>
  );
}
