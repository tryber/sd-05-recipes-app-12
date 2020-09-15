import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import headerTitle from '../../utils/headerTitle';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import { RecipesContext } from '../../context/RecipesContext';

function ProfileContainer() {
  return (
    <Link to="/perfil">
      <input data-testid="profile-top-btn" type="image" src={profileIcon} alt="user" />
    </Link>
  );
}

const Header = () => {
  const url = useHistory();
  const pathName = url.location.pathname;
  const title = headerTitle(pathName);
  const { toggle, setToggle } = useContext(RecipesContext);
  const handleClick = () => {
    if (toggle === false) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };
  return (
    <div>
      {(pathName === '/explorar/comidas/area' || pathName === '/comidas' || pathName === '/bebidas') ?
        <div>
          <ProfileContainer />
          <h1 data-testid="page-title" >{title}</h1>
          <button
            data-testid="search-top-btn"
            type="button" src={searchIcon} onClick={() => handleClick()}>
            <img src={searchIcon} alt="user"
          />
          </button>
        </div>
      :
        <div>
          <ProfileContainer />
          <h1 data-testid="page-title" >{title}</h1>
        </div>
      }
    </div>
  );
};

export default Header;
