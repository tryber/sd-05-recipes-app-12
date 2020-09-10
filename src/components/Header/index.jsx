import React from 'react';
import { useHistory } from 'react-router-dom';
import headerTitle from '../../utils/headerTitle';
import profileIcon from '../../images/profileIcon.svg';

const Header = () => {
  const url = useHistory();
  const pathName = url.location.pathname;
  const title = headerTitle(pathName);
  return (
    <div>
      <img src={profileIcon} alt="User" />
      <h1>{title}</h1>
    </div>
  );
};

export default Header;
