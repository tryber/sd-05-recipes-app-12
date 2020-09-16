import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import DetalhesComidaProgress from './pages/DetalhesComidaProgress';
import DetalhesComida from './pages/DetalhesComida';
import DetalhesBebida from './pages/DetalhesBebida';
import Perfil from './pages/Profile';
import {
  Bebidas,
  DetalhesBebidaProgress,
} from './pages/Bebidas';
import {
  NotFound,
  Explorar,
  ExplorarComidas,
  ExplorarComidasIngrediente,
  ExplorarOrigem,
  ExplorarBebidas,
  ExplorarBebidasIngrediente,
} from './pages/Explore';
import ReceitasFavoritas from './pages/Receitas-Fav';
import ReceitasFeitas from './pages/Receitas-Feitas';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/perfil" component={Perfil} />
    <Route path="/comidas/:id/progress" component={DetalhesComidaProgress} />
    <Route path="/comidas/:id/" component={DetalhesComida} />
    <Route path="/comidas" component={MainPage} />
    <Route path="/bebidas/:id/progress" component={DetalhesBebidaProgress} />
    <Route path="/bebidas/:id" component={DetalhesBebida} />
    <Route path="/bebidas" component={Bebidas} />
    <Route
      path="/explorar/comidas/ingredientes"
      component={ExplorarComidasIngrediente}
    />
    <Route path="/explorar/comidas/area" component={ExplorarOrigem} />
    <Route path="/explorar/comidas" component={ExplorarComidas} />
    <Route
      path="/explorar/bebidas/ingredientes"
      component={ExplorarBebidasIngrediente}
    />
    <Route path="/explorar/bebidas/area" component={NotFound} />
    <Route path="/explorar/bebidas" component={ExplorarBebidas} />
    <Route path="/explorar" component={Explorar} />
    <Route path="/receitas-feitas" component={ReceitasFeitas} />
    <Route path="/receitas-favoritas" component={ReceitasFavoritas} />
  </Switch>
);

export default Routes;
