import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Comidas from './components/Comidas/Comidas';
import './App.css';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/comidas" component={Comidas} />
      </Switch>
    </div>
  );
}

export default App;
