import React from 'react';
import { Link } from 'react-router-dom';
import { drinkIcon, exploreIcon, mealIcon } from '../images';

const BottomMenu = () => (
  <footer className="footer" data-testid="footer" >
    <Link className="btn" to="/bebidas">
      <img src={drinkIcon} alt="drink-icon" data-testid="drinks-bottom-btn" />
    </Link>
    <Link to="/explorar">
      <img src={exploreIcon} alt="explore-icon" data-testid="explore-bottom-btn" />
    </Link>
    <Link to="/comidas">
      <img src={mealIcon} alt="meal-icon" data-testid="food-bottom-btn" />
    </Link>
  </footer>
);

export default BottomMenu;
