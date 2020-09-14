import React from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';

export const Explorar = () => (
  <div>
    <Header />
    <Link to="/explorar/comidas">
      <button data-testid="explore-food">Explorar Comidas</button>
    </Link>
    <Link to="/explorar/bebidas">
      <button data-testid="explore-drinks">Explorar Bebidas</button>
    </Link>
  </div>
);

export const ExplorarComidas = () => (
  <div>
    <Header />
  </div>
);
export const ExplorarComidasIngrediente = () => (
  <div>
    <Header />
  </div>
);
export const ExplorarOrigem = () => (
  <div>
    <Header />
  </div>
);
export const ExplorarBebidas = () => (
  <div>
    <Header />
  </div>
);
export const ExplorarBebidasIngrediente = () => (
  <div>
    <Header />
  </div>
);
export const NotFound = () => <div>Oi</div>;
