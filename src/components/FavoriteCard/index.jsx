import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import shareFunctionFood from 'clipboard-copy';
import { RecipesContext } from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import { removeFavorite } from '../../utils/utilities';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function shareLinkFood() {
  const url = window.location.href;
  document.getElementById('copy').innerHTML = 'Link copiado!';
  alert('Link copiado!');
  shareFunctionFood(url);
}

function handleClickFoodFavorite(setDone) {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const newFilter = favorites.filter((item) => item.type === 'comida');
  setDone(newFilter);
}

function handleClickDrinkFavorite(setDone) {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const newFilter = favorites.filter((item) => item.type === 'bebida');
  setDone(newFilter);
}

function handleClickFoodAllFavorite(setDone) {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  setDone(favorites);
}

function render({ liked, setLiked, isMeal, done, setDone }) {
  return (
    <div>
      <div>
        <input
          type="button" value="All" data-testid="filter-by-all-btn"
          onClick={() => handleClickFoodAllFavorite(setDone)}
        />
        <input
          type="button" value="Food" data-testid="filter-by-food-btn"
          onClick={() => handleClickFoodFavorite(setDone)}
        />
        <input
          type="button" value="Drinks" data-testid="filter-by-drink-btn"
          onClick={() => handleClickDrinkFavorite(setDone)}
        />
      </div>
      <br />
      {done.map((data, index) => (
        <div>
          <img
            data-testid={`${index}-horizontal-image`} src={data.image}
            width="200px" height="150px" alt={data.name}
          />
          <h1 data-testid={`${index}-horizontal-name`}>{data.name}</h1>
          <span data-testid={`${index}-horizontal-top-text`}>{data.category}</span>
          <input
            type="image" data-testid={`${index}-horizontal-share-btn`} alt="Share Icon"
            id="copy"
            onClick={() => shareLinkFood()}
            src={shareIcon}
          />
          <input
            type="image" onClick={() => removeFavorite(isMeal, data, setLiked)}
            src={!liked ? blackHeartIcon : whiteHeartIcon}
            data-testid={`${index}-horizontal-favorite-btn`} alt="black heart icon"
          />
        </div>
      ))}
    </div>
  );
}

const FavoriteCard = () => {
  const { dataDetail, isMeal, setLiked, setData, data } = useContext(RecipesContext);
  const [checked, setChecked] = useState([]);
  const [done, setDone] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setDone(storage);
    const keys = Object.values(storage);
    if (!storage) {
      console.error('nada pra mostrar');
    } else if (storage) {
      const isLiked = keys.some((item) => item.id === id);
      setLiked(isLiked);
    }
  }, [id, setLiked]);

  if (dataDetail.length === undefined) return <h1>loading...</h1>;
  const filtersKeyOutra = Object.keys(dataDetail).filter(
    (key) => key.includes('strIngredient') && dataDetail[key] !== null && dataDetail[key] !== '');
  const params = {
    dataDetail,
    shareIcon,
    id,
    checked,
    setChecked,
    filtersKeyOutra,
    isMeal,
    setLiked,
    data,
    setData,
    done,
    setDone,
  };
  return (
    render(params)
  );
};

export default FavoriteCard;

render.propTypes = {
  setDone: PropTypes.func.isRequired,
  done: PropTypes.arrayOf(PropTypes.object).isRequired,
  liked: PropTypes.string.isRequired,
  setLiked: PropTypes.func.isRequired,
  isMeal: PropTypes.string.isRequired,
};
