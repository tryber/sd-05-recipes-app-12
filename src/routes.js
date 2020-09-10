import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Comidas from './components/Comidas';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/comidas" component={Comidas} />
  </Switch>
)

export default Routes;