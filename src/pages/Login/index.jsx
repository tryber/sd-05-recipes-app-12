import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const regexEmail = /\S+@\S+\.\S+/i;
  const validateEmail = new RegExp(regexEmail);
  const regExTest = validateEmail.test(email);

  const Verify = () => !(regExTest && pass.length > 6);

  const setToken = () => {
    const storeEmail = { email };
    localStorage.setItem('user', JSON.stringify(storeEmail));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  };

  return (
    <div className="bg-login">
      <div className="box-login">
        <h1>Login</h1>
        <span>Find your favorite recipes</span>
        <input
          data-testid="email-input"
          type="email"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="Senha"
          onChange={(event) => {
            setPass(event.target.value);
          }}
        />
        <Link to="/comidas" onClick={() => setToken()}>
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={Verify()}
          >
            Entrar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
