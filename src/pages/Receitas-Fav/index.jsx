import React from 'react';
import { useContext } from 'react';
import RecipesFavCard from '../../components/DrinkCard/DrinkFavCard'
import { RecipesContext } from '../../context/RecipesContext';
import DoneAndFavoriteHeader from '../../components/DoneAndFavoriteHeader';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import Header from '../../components/Header';

const ReceitasFavoritas = () => {
  const { fav, setFav } = useContext(RecipesContext);
  // const toggleImage = () => {
  //   setFav((fav) => { !fav });
  // };

  // const getImageName = () => fav ? blackHeartIcon : whiteHeartIcon;
  return (
    <div>
      <Header />
      <DoneAndFavoriteHeader />
      <RecipesFavCard />
      {/* <img style={{maxWidth: '50px'}} src={imagesPath[imageName]}
      onClick={this.toggleImage} /> */}
      <button src={blackHeartIcon} />
      <button src={shareIcon} />
    </div>
  );
};

export default ReceitasFavoritas;
