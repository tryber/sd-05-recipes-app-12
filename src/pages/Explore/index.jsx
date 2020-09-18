import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/FooterMenu';

export const Explorar = () => (
  <div>
    <Header />
    <Link to="/explorar/comidas">
      <button data-testid="explore-food">Explorar Comidas</button>
    </Link>
    <Link to="/explorar/bebidas">
      <button data-testid="explore-drinks">Explorar Bebidas</button>
    </Link>
    <Footer />
  </div>
);

export const ExplorarComidas = () => (
  <div>
    <Header />
    <Footer />
  </div>
);
export const ExplorarComidasIngrediente = () => (
  <div>
    <Header />
    <Footer />
  </div>
);
export const ExplorarOrigem = () => (
  <div>
    <Header />
    <Footer />
  </div>
);
export const ExplorarBebidas = () => (
  <div>
    <Header />
    <Footer />
  </div>
);
export const ExplorarBebidasIngrediente = () => (
  <div>
    <Header />
    <Footer />
  </div>
);
export const NotFound = () => <div>Oi</div>;
