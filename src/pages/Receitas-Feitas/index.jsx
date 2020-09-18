import React from 'react';
import Header from '../../components/Header';

export const ReceitasFeitas = () => (
  <div>
    <Header />
    <button data-testid="filter-by-all-btn">All</button>
    <button data-testid="filter-by-food-btn">Food</button>
    <button data-testid="filter-by-drink-btn">Drinks</button>
  </div>
);

export default ReceitasFeitas;
