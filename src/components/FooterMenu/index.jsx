import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './styles.css';

const Footer = () => (
  <footer className="footer" style={{ position: 'fixed', bottom: 0 }} data-testid="footer" >
    <div>
      <div className="footer-box">
        <Link className="btn-drink" to="/bebidas">
          <img src={drinkIcon} alt="drink-icon" data-testid="drinks-bottom-btn" />
        </Link>
        <Link className="btn-explore" to="/explorar">
          <img src={exploreIcon} alt="explore-icon" data-testid="explore-bottom-btn" />
        </Link>
        <Link className="btn-meal" to="/comidas">
          <img src={mealIcon} alt="meal-icon" data-testid="food-bottom-btn" />
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
