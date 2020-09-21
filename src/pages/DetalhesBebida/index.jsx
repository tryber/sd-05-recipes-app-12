import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams, Link } from 'react-router-dom';
import shareFunctionDrink from 'clipboard-copy';
import { RecipesContext } from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { verify, recommended, saveToLocalStorageDrinks, recipeInProgress, favoriteRecipe } from '../../utils/utilities';
import './styles.css';
// O aluno Felipe Vieira auxiliou na solução da tag iframe

function shareLinkDrink() {
  const url = window.location.href;
  document.getElementById('copy').innerHTML = 'Link copiado!';
  alert('Link copiado!');
  shareFunctionDrink(url);
}

function Inputs({ id, dataDetail, rec, filtersKey, inProgress, isMeal, liked, setLiked }) {
  return (
    <div className="recipe-details-box">
      <img
        className="recipe-photo"
        data-testid="recipe-photo" src={dataDetail.strDrinkThumb}
        alt={dataDetail.strDrink}
      />
      <h1 data-testid="recipe-title" className="recipe-title">{dataDetail.strDrink}</h1>
      <div className="recipe-category-box">
        <span
          data-testid="recipe-category"
          className="recipe-category"
        >
          {dataDetail.strCategory}
        </span>
        <span className="recipe-hifen"> - </span>
        <span
          data-testid="recipe-category"
          className="recipe-tags"
        >
          Esta bebida é alcoólica: {dataDetail.strAlcoholic}
        </span>
      </div>
      <input
        className="share-btn"
        type="image"
        id="copy"
        onClick={() => shareLinkDrink()}
        src={shareIcon} data-testid="share-btn" alt="Share Icon"
      />
      <input
        className="like-btn"
        type="image"
        src={(liked) ? blackHeartIcon : whiteHeartIcon}
        onClick={() => favoriteRecipe(liked, setLiked, dataDetail, isMeal)}
        data-testid="favorite-btn" alt={(liked) ? 'Black Heart Icon' : 'White Heart Icon'}
      />
      <h1 className="recipe-ingredients-title">Ingredients</h1>
      <div className="recipe-ingredients">
        {filtersKey.map((filter, index) => (
          <span className="each-ingredient" data-testid={`${index}-ingredient-name-and-measure`}>{dataDetail[filter]} - {dataDetail[`strMeasure${index + 1}`]}</span>
        ))}
      </div>
      <h1 className="recipe-instruction-title">Instructions</h1>
      <div className="recipe-instructions">
        <p data-testid="instructions">{dataDetail.strInstructions}</p>
      </div>
      <h1 className="recipe-recommend-title">Recomendadas</h1>
      <div className="recipe-recommend-card">
        {rec.map((recommend, index) => (
          <div key={recommend.strMeal} style={index < 2 ? { display: '' } : { display: 'none' }}>
            <div className="each-item-food" style={index < 2 ? { display: 'block' } : { display: 'none' }}>
              <img
                data-testid={`${index}-recomendation-card`} src={recommend.strMealThumb}
                width="70px" alt={recommend.strMeal} className="card-img"
              />
              <p data-testid={`${index}-recomendation-title`}>{recommend.strMeal}</p>
            </div>
          </div>
      ))}
      </div>
      <Link to={`/bebidas/${id}/in-progress`} onClick={() => saveToLocalStorageDrinks(id)}>
        <button type="button" className="recipe-recommend-button" style={{ position: 'fixed', bottom: 0 }} data-testid="start-recipe-btn" value={(inProgress) ? 'Continuar Receita' : 'Iniciar Receita'} >{(inProgress) ? 'Continuar Receita' : 'Iniciar Receita'}</button>
      </Link>
    </div>
  );
}

const DetalhesBebida = () => {
  const { dataDetail, setDataDetail, drink, setDrink, setIsMeal, isMeal,
    liked, setLiked } = useContext(RecipesContext);
  const history = useHistory();
  const histories = history;
  const pathName = history.location.pathname;
  const [inProgress, setInProgress] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const storages = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const keys = Object.values(storages);
    console.log(keys);
    if (!storages) {
      console.error('nada pra mostrar');
    } else if (storages) {
      const isLiked = keys.some((item) => item.id === id);
      setLiked(isLiked);
    }
    verify(pathName, id, setDataDetail, setIsMeal);
  }, [setDataDetail, id, pathName, setIsMeal, setLiked]);
  useEffect(() => {
    recommended(pathName, null, setDrink);
    recipeInProgress(setInProgress, histories, id, inProgress);
  }, [pathName, setDrink, histories, id, inProgress]);
  if (dataDetail.length === 0) return <h1>loading...</h1>;
  const filtersKey = Object.keys(dataDetail).filter(
    (key) => key.includes('strIngredient') && dataDetail[key] !== null && dataDetail[key] !== '');
  const rec = drink.slice(0, 6);
  const params = { id, dataDetail, rec, filtersKey, inProgress, isMeal, liked, setLiked };
  return (
    Inputs(params)
  );
};
export default DetalhesBebida;

Inputs.propTypes = {
  dataDetail: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  isMeal: PropTypes.string.isRequired,
  inProgress: PropTypes.string.isRequired,
  liked: PropTypes.string.isRequired,
  setLiked: PropTypes.func.isRequired,
  rec: PropTypes.arrayOf(PropTypes.object).isRequired,
  filtersKey: PropTypes.arrayOf(PropTypes.object).isRequired,
};
