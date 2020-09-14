import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import headerTitle from '../../utils/headerTitle';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import { RecipesContext } from '../../context/RecipesContext';


const Header = () => {
  const url = useHistory();
  const pathName = url.location.pathname;
  const title = headerTitle(pathName);
  const { toggle, setToggle } = useContext(RecipesContext);
  const handleClick = () => {
    if (toggle === 'none') {
      setToggle('block');
    } else {
      setToggle('none');
    }
  };
  return (
    <div>
      {(pathName === '/explorar/comidas/area' || pathName === '/comidas' || pathName === '/bebidas') ?
        <div>
          <Link to="/perfil">
            <input data-testid="profile-top-btn" type="image" src={profileIcon} alt="user" />
          </Link>
          <h1 data-testid="page-title" >{title}</h1>
          <button type="button" src={searchIcon} onClick={() => handleClick()}>
            <input data-testid="search-top-btn" type="image" src={searchIcon} alt="user" />
          </button>
        </div>
      :
        <div>
          <Link to="/perfil">
            <input data-testid="profile-top-btn" type="image" src={profileIcon} alt="user" />
          </Link>
          <h1 data-testid="page-title" >{title}</h1>
        </div>
      }
    </div>
  );
};

export default Header;
