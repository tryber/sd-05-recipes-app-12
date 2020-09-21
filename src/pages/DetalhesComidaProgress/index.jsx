import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareFunctionFood from 'clipboard-copy';
import { RecipesContext } from '../../context/RecipesContext';
import { isDisabled, hasLocalStorage, handleChange, isChecked, isNotChecked, verify, favoriteRecipe } from '../../utils/utilities';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './styles.css';

function shareLinkFood() {
  const url = window.location.href;
  document.getElementById('copy').innerHTML = 'Link copiado!';
  alert('Link copiado!');
  shareFunctionFood(url);
}

function render({ dataDetail, histories, id, checked, setChecked, filtersKeyOutra, isMeal, liked, setLiked }) {
  return (
    <div className="recipe-detals-box">
      <img
        className="recipe-photo"
        data-testid="recipe-photo" src={dataDetail.strMealThumb}
        alt={dataDetail.strMeal}
        />
      <h1 className="recipe-title" data-testid="recipe-title">{dataDetail.strMeal}</h1>
      <div className="recipe-category-box">
        <span className="recipe-category" data-testid="recipe-category">{dataDetail.strCategory}</span>
        <span className="recipe-hifen"> - </span>
        <span className="recipe-tags" data-testid="recipe-category">{dataDetail.strTags}</span>
      </div>
      <button
        className="share-btn"
        type="image"
        id="copy"
        onClick={() => shareLinkFood()}
        src={shareIcon} data-testid="share-btn" alt="Share Icon"
      >
        <img src={shareIcon} data-testid="share-btn" alt="Share Icon"/>
      </button>
      <button
        className="like-btn"
        type="image"
        onClick={() => favoriteRecipe(liked, setLiked, dataDetail, isMeal)}
        src={liked ? blackHeartIcon : whiteHeartIcon}
        data-testid="favorite-btn" alt="White Heart Icon"
      >
        <img  src={liked ? blackHeartIcon : whiteHeartIcon} alt="White Heart Icon"/>
      </button>
      <h1 className="recipe-ingredients-title">Ingredients</h1>
      <div className="recipe-ingredients">
        {filtersKeyOutra.map((filter, index) => (
          <div key={filter.strMeal}>
            <div>
              <label htmlFor={`meal${index + 1}`} className={`meal${index + 1}`} >
                <input
                  type="checkbox" checked={hasLocalStorage(`meal${index + 1}`, id, histories)}
                  id={`meal${index + 1}`} className="check-ingredients"
                  onChange={(e) =>
                    handleChange(e, id, checked, setChecked, histories, isChecked, isNotChecked)
                  }
                  data-testid={`${index}-ingredient-step`}
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
        <button  data-testid="finish-recipe-btn" disabled={isDisabled()} type="button">
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

const DetalhesComidaProgress = () => {
  const { dataDetail, setDataDetail, setIsMeal, isMeal, setLiked, liked } = useContext(RecipesContext);
  const [checked, setChecked] = useState([]);
  const history = useHistory();
  const histories = history;
  const pathName = history.location.pathname;
  const { id } = useParams();
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const keys = Object.values(storage);
    if (!storage) {
      console.error('nada pra mostrar');
    } else if (storage) {
      const isLiked = keys.some((item) => item.id === id);
      setLiked(isLiked);
    }
    verify(pathName, id, setDataDetail, setIsMeal);
  }, [setDataDetail, id, pathName, setIsMeal, setLiked]);

  if (dataDetail.length === 0) return <h1>loading...</h1>;
  const filtersKeyOutra = Object.keys(dataDetail).filter(
    (key) => key.includes('strIngredient') && dataDetail[key] !== null && dataDetail[key] !== '');
  const params = {
    dataDetail, shareIcon, histories, id, checked, setChecked, filtersKeyOutra, isMeal, setLiked, liked 
  };
  return (
    render(params)
  );
};
export default DetalhesComidaProgress;

render.propTypes = {
  filtersKeyOutra: PropTypes.arrayOf(PropTypes.object).isRequired,
  setChecked: PropTypes.func.isRequired,
  checked: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  histories: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataDetail: PropTypes.arrayOf(PropTypes.object).isRequired,
};
