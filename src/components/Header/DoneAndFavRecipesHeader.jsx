import React from 'react';

const DoneAndFavRecipesHeader = () => (
  <div>
    <button data-testid="filter-by-all-btn">All</button>
    <button data-testid="filter-by-food-btn">Meals</button>
    <button data-testid="filter-by-drink-btn">Drink</button>
  </div>
);

export default DoneAndFavRecipesHeader;
