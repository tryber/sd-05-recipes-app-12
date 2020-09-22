import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/FooterMenu';
import './styles.css';

const Perfil = () => {
  const email = window.localStorage.getItem('user');
  const title = JSON.parse(email);
  return (
    <div>
      <Header />
      <div className="profile-title">
        { (title) &&
          <h2 data-testid="profile-email">{title.email}</h2>
        }
      </div>
      <div className="profile-box">
        <Link to="/receitas-feitas">
          <button data-testid="profile-done-btn">Receitas Feitas</button>
        </Link>
        <Link to="/receitas-favoritas">
          <button data-testid="profile-favorite-btn">Receitas Favoritas</button>
        </Link>
        <Link to="/" onClick={() => { window.localStorage.clear(); }}>
          <button data-testid="profile-logout-btn">Sair</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Perfil;
