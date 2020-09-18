import React from 'react';
import { useContext } from 'react';
import { RecipesContext } from '../../context/RecipesContext';
import DoneAndFavRecipesHeader from '../../components/Header/DoneAndFavRecipesHeader';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import Header from '../../components/Header';

const ReceitasFavoritas = () => {

  const { fav, setFav } = useContext(RecipesContext);
  
  toggleImage = () => {
    setFav(fav => ({fav: !fav}));
  };

  getImageName = () => fav ? blackHeartIcon : whiteHeartIcon;

  return (
    <div>
      <Header />
      <DoneAndFavRecipesHeader />
      <RecipesCard />
    
    {/* <img style={{maxWidth: '50px'}} src={imagesPath[imageName]} onClick={this.toggleImage} /> */}
      <button src={blackHeartIcon}></button>
      <button src={shareIcon}></button>
    </div>
  );
};

export default ReceitasFavoritas;
