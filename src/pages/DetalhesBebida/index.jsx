import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams, Link } from 'react-router-dom';
import shareFunctionDrink from 'clipboard-copy';
import { RecipesContext } from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { verify, recommended, saveToLocalStorageDrinks, recipeInProgress, favoriteRecipe } from '../../utils/utilities';
// O aluno Felipe Vieira auxiliou na solução da tag iframe

function shaheLinkDrink (id) {
  alert('Link copiado!');
  shareFunctionDrink(`http://localhost:3000/bebidas/${id}`);
}

function Inputs({ id, dataDetail, rec, filtersKey, inProgress, isMeal, liked, setLiked }) {
  return (
    <div>
      <img
        data-testid="recipe-photo" src={dataDetail.strDrinkThumb}
        width="200px" height="150px" alt={dataDetail.strDrink}
      />
      <h1 data-testid="recipe-title">{dataDetail.strDrink}</h1>
      <span data-testid="recipe-category">{dataDetail.strCategory}</span>
      <input
        type="image"
        onclick={() => shaheLinkDrink(id)}
        src={shareIcon} data-testid="share-btn" alt="Share Icon"
      />
      <input
        type="image"
        src={(liked) ? blackHeartIcon : whiteHeartIcon}
        onClick={() => favoriteRecipe(liked, setLiked, dataDetail, isMeal)}
        data-testid="favorite-btn" alt={(liked) ? "Black Heart Icon" : "White Heart Icon"}
      />
      <h1>Ingredients</h1>
      {filtersKey.map((filter, index) => (
        <p data-testid={`${index}-ingredient-name-and-measure`}>{dataDetail[filter]} - {dataDetail[`strMeasure${index + 1}`]}</p>
      ))}
      <h1>Instructions</h1>
      <p data-testid="instructions">{dataDetail.strInstructions}</p>
      <h1>Recomendadas</h1>
      {rec.map((recommend, index) => (
        <div key={recommend.strMeal} style={index < 2 ? { display: 'block' } : { display: 'none' }}>
          <div style={index < 2 ? { display: 'block' } : { display: 'none' }}>
            <img
              data-testid={`${index}-recomendation-card`} src={recommend.strMealThumb}
              width="200px" alt={recommend.strMeal}
            />
            <p data-testid={`${index}-recomendation-title`}>{recommend.strMeal}</p>
          </div>
        </div>
      ))}
      <Link to={`/bebidas/${id}/in-progress`} onClick={() => saveToLocalStorageDrinks(id)}>
        <input type="button" style={{position:'fixed', bottom:0}} data-testid="start-recipe-btn" value={(inProgress) ? "Continuar Receita" : "Iniciar Receita"} />
      </Link>
    </div>
  );
}

const DetalhesBebida = () => {
  const { dataDetail, setDataDetail, drink, setDrink, setIsMeal, isMeal, liked, setLiked } = useContext(RecipesContext);
  const history = useHistory();
  const histories = history;
  const pathName = history.location.pathname;
  const [inProgress, setInProgress] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    verify(pathName, id, setDataDetail, setIsMeal);
  }, [setDataDetail, id, pathName, setIsMeal]);
  useEffect(() => {
    recommended(pathName, null, setDrink);
    recipeInProgress(setInProgress, histories, id, inProgress)
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
  rec: PropTypes.arrayOf(PropTypes.object).isRequired,
  filtersKey: PropTypes.arrayOf(PropTypes.object).isRequired,
};
