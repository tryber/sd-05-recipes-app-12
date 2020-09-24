import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import headerTitle from '../../utils/headerTitle';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import { RecipesContext } from '../../context/RecipesContext';
import './styles.css';

function ProfileContainer() {
  return (
    <div classNameheader>
      <Link to="/perfil">
        <input
          className="profile-icon"
          data-testid="profile-top-btn" type="image" src={profileIcon} alt="user"
        />
      </Link>
    </div>
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
        <div className="header-box">
          <ProfileContainer />
          <h1 data-testid="page-title" className="header-title" >{title}</h1>
          <input
            type="image"
            className="search-icon"
            src={searchIcon} alt="user"
            data-testid="search-top-btn"
            onClick={() => handleClick()}
          />
        </div>
      :
        <div className="header-box">
          <ProfileContainer />
          <h1 className="header-title" data-testid="page-title" >{title}</h1>
          <span></span>
        </div>
      }
    </div>
  );
};

export default Header;
