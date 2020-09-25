import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareFunctionFood from 'clipboard-copy';
import { RecipesContext } from '../../context/RecipesContext';
import { isDisabled, handleChange, verify, favoriteRecipe } from '../../utils/utilities';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './styles.css';

function shareLinkDrink(id) {
  document.getElementById('copy').innerHTML = 'Link copiado!';
  alert('Link copiado!');
  shareFunctionFood(`http://localhost:3000/bebidas/${id}`);
}

function renderProgress({
  dataDetail, histories, id, filtersKeyOutra,
  isMeal, liked, setLiked, inProgress, setInProgress, isDone, setIsDone }) {
  return (
    <div className="recipe-detals-box">
      <img
        className="recipe-photo"
        data-testid="recipe-photo" src={dataDetail.strDrinkThumb}
        alt={dataDetail.strDrink}
      />
      <h1 className="recipe-title" data-testid="recipe-title">{dataDetail.strDrink}</h1>
      <div className="recipe-category-box">
        <span className="recipe-category" data-testid="recipe-category">
          {dataDetail.strCategory}
        </span>
        <span className="recipe-hifen"> - </span>
        <span className="recipe-tags" data-testid="recipe-category">{dataDetail.strTags}</span>
      </div>
      <input
        className="share-btn"
        type="image"
        id="copy"
        onClick={() => shareLinkDrink(id)}
        src={shareIcon} data-testid="share-btn" alt="Share Icon"
      />
      <input
        data-testid="favorite-btn" alt="White Heart Icon"
        onClick={() => favoriteRecipe(liked, setLiked, dataDetail, isMeal)}
        className="like-btn"
        type="image"
        src={liked ? blackHeartIcon : whiteHeartIcon}
      />
      <h1 className="recipe-ingredients-title">Ingredients</h1>
      <div className="recipe-ingredients">
        {filtersKeyOutra.map((filter, index) => (
          <div key={filter.strDrink}>
            <div data-testid={`${index}-ingredient-step`}>
              <label htmlFor={`drink${index + 1}`} className={`drink${index + 1}`} >
                <input
                  type="checkbox" checked={inProgress.cocktails[id].some((item) => item === `drink${index + 1}`)}
                  id={`drink${index + 1}`} className="check-ingredients"
                  onChange={(e) =>
                    handleChange(e, id, histories, setInProgress, setIsDone)
                  }
                />
                {dataDetail[filter]} - {dataDetail[`strMeasure${index + 1}`]}
              </label>
            </div>
          </div>
        ))}
      </div>
      <h1 className="recipe-instruction-title">Instructions</h1>
      <div className="recipe-instructions">
        <p data-testid="instructions">{dataDetail.strInstructions}</p>
      </div>
      <Link to="/receitas-feitas">
        <button
          data-testid="finish-recipe-btn" className="recipe-button" disabled={!isDone} type="button"
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

const DetalhesBebidaProgress = () => {
  const { dataDetail, setDataDetail, setIsMeal, isMeal,
    setLiked, liked, isDone, setIsDone } = useContext(RecipesContext);
  const [inProgress, setInProgress] = useState({});
  const history = useHistory();
  const histories = history;
  const pathName = history.location.pathname;
  const { id } = useParams();

  useEffect(() => {
    const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes')) || { meals: { [id]: [] }, cocktails: { [id]: [] } };
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const keys = Object.values(storage);
    setInProgress(inProgressStorage);
    if (!storage) {
      console.error('nada pra mostrar');
    } else if (storage) {
      const isLiked = keys.some((item) => item.id === id);
      setLiked(isLiked);
    }
    isDisabled(setIsDone);
    verify(pathName, id, setDataDetail, setIsMeal);
  }, [setDataDetail, id, pathName, setIsMeal, setLiked, setInProgress, setIsDone]);

  if (dataDetail.length === 0) return <h1>loading...</h1>;
  const filtersKeyOutra = Object.keys(dataDetail).filter(
    (key) => key.includes('strIngredient') && dataDetail[key] !== null && dataDetail[key] !== '');
  const params = {
    filtersKeyOutra,
    isMeal,
    liked,
    setLiked,
    id,
    histories,
    inProgress,
    setInProgress,
    dataDetail,
    isDone,
    setIsDone,
  };
  return (
    renderProgress(params)
  );
};
export default DetalhesBebidaProgress;

renderProgress.propTypes = {
  filtersKeyOutra: PropTypes.arrayOf(PropTypes.object).isRequired,
  // setChecked: PropTypes.func.isRequired,
  // checked: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  histories: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataDetail: PropTypes.arrayOf(PropTypes.object).isRequired,
  isMeal: PropTypes.arrayOf(PropTypes.object).isRequired,
  liked: PropTypes.arrayOf(PropTypes.object).isRequired,
  setLiked: PropTypes.func.isRequired,
  isDone: PropTypes.arrayOf(PropTypes.object).isRequired,
  inProgress: PropTypes.arrayOf(PropTypes.object).isRequired,
  setInProgress: PropTypes.func.isRequired,
  setIsDone: PropTypes.func.isRequired,
};
