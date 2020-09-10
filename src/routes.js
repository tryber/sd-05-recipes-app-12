import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Profile from './pages/Profile';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/comidas" component={Comidas} />
    <Route path="/profile" component={Profile} />
  </Switch>
);

export default Routes;
