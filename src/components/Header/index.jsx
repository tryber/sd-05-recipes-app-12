import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import headerTitle from '../../utils/headerTitle';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

const Header = () => {
  const url = useHistory();
  const pathName = url.location.pathname;
  const title = headerTitle(pathName);
  return (
    <div>
      {(pathName === '/explorar/comidas/area' || pathName === '/comidas' || pathName === ' /bebidas') ?
        <div>
          <Link to="/profile">
            <img src={profileIcon} alt="user" />
          </Link>
          <h1>{title}</h1>
          <img src={searchIcon} alt="user" />
        </div>
      :
        <div>
        <Link to="/profile">
          <img src={profileIcon} alt="user" />
        </Link>
        <h1>{title}</h1>
        </div>
      }
    </div>
  );
};

export default Header;
