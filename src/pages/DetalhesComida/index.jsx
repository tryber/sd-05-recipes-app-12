import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams, Link } from 'react-router-dom';
import shareFunctionFood from 'clipboard-copy';
import { RecipesContext } from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import loading from '../../images/loader.gif';
import { verify, recommended, saveToLocalStorageMeals, recipeInProgress, favoriteRecipe } from '../../utils/utilities';
import './styles.css';
// O lindo aluno Felipe Vieira auxiliou na solução da tag iframe

function shareLinkFood(id) {
  shareFunctionFood(`http://localhost:3000/comidas/${id}`);
  alert('Link copiado!');
}

function Input({ id, dataDetail, rec, filtersKey, inProgress, isMeal, liked, setLiked }) {
  return (
    <div className="recipe-details-box">
      <img
        className="recipe-photo"
        data-testid="recipe-photo" src={dataDetail.strMealThumb}
        alt={dataDetail.strMeal}
      />
      <h1 data-testid="recipe-title" className="recipe-title">{dataDetail.strMeal}</h1>
      <div className="recipe-category-box">
        <span
          data-testid="recipe-category"
          className="recipe-category"
        >
          {dataDetail.strCategory}
        </span>
        <span className="recipe-hifen"> - </span>
        <span data-testid="recipe-category" className="recipe-tags">{dataDetail.strTags}</span>
      </div>
      <input
        className="share-btn"
        type="image"
        onClick={() => shareLinkFood(id)}
        src={shareIcon} data-testid="share-btn" alt="Share Icon"
      />
      <input
        className="like-btn"
        type="image"
        onClick={() => favoriteRecipe(liked, setLiked, dataDetail, isMeal)}
        src={liked ? blackHeartIcon : whiteHeartIcon}
        data-testid="favorite-btn" alt="White Heart Icon"
      />
      <h1 className="recipe-ingredients-title">Ingredients</h1>
      <div className="recipe-ingredients">
        {filtersKey.map((filter, index) => (
          <span className="each-ingredient" key={filter.strMeal} data-testid={`${index}-ingredient-name-and-measure`}>{dataDetail[filter]} - {dataDetail[`strMeasure${index + 1}`]}</span>
        ))}
      </div>
      <h1 className="recipe-instruction-title">Instructions</h1>
      <div className="recipe-instructions">
        <p data-testid="instructions">{dataDetail.strInstructions}</p>
      </div>
      {dataDetail.strYoutube &&
        <div>
          <h1 className="recipe-video-title">Vídeos</h1>
          <div className="recipe-video">
            <iframe
              data-testid="video" title={dataDetail.strYoutube}
              src={dataDetail.strYoutube && dataDetail.strYoutube.replace('watch?v=', 'embed/')}
              frameBorder="0" allow="autoplay" allowFullScreen="true"
            />
          </div>
        </div>
      }
      <h1 className="recipe-recommend-title">Recomendadas</h1>
      <div className="recipe-recommend-card">
        {rec.map((recommend, index) => (
          <div key={recommend.strDrink} className="each-item" style={index < 2 ? { display: '' } : { display: 'none' }}>
            <img
              data-testid={`${index}-recomendation-card`} src={recommend.strDrinkThumb}
              width="70px" alt={recommend.strDrink} className="card-img"
            />
            <p data-testid={`${index}-recomendation-title`}>{recommend.strDrink}</p>
          </div>
        ))}
      </div>
      <Link to={`/comidas/${id}/in-progress`} onClick={() => saveToLocalStorageMeals(id)}>
        <button type="button" className="recipe-recommend-button" style={{ position: 'fixed', bottom: 0 }} data-testid="start-recipe-btn" value={(inProgress) ? 'Continuar Receita' : 'Iniciar Receita'} >{(inProgress) ? 'Continuar Receita' : 'Iniciar Receita'}</button>
      </Link>
    </div>
  );
}

const DetalhesComida = () => {
  const { dataDetail, setDataDetail, meal, setMeal, isMeal, setIsMeal, liked,
    setLiked } = useContext(RecipesContext);
  const history = useHistory();
  const histories = history;
  const [inProgress, setInProgress] = useState(false);
  const pathName = history.location.pathname;
  const { id } = useParams();
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const keys = Object.values(storage);
    console.log(keys);
    if (!storage) {
      console.error('nada pra mostrar');
    } else if (storage) {
      const isLiked = keys.some((item) => item.id === id);
      setLiked(isLiked);
    }
    verify(pathName, id, setDataDetail, setIsMeal);
  }, [setDataDetail, id, pathName, setIsMeal, setLiked]);
  useEffect(() => {
    recommended(pathName, setMeal);
    recipeInProgress(setInProgress, histories, id, inProgress);
  }, [pathName, setMeal, histories, id, inProgress]);
  if (dataDetail.length === 0) return <img src={loading} alt="loader" />;
  const filtersKey = Object.keys(dataDetail).filter(
    (key) => key.includes('strIngredient') && dataDetail[key] !== null && dataDetail[key] !== '');
  const rec = meal.slice(0, 6);
  const param = { id, dataDetail, rec, filtersKey, inProgress, isMeal, liked, setLiked };
  return (
    Input(param)
  );
};
export default DetalhesComida;

Input.propTypes = {
  dataDetail: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  isMeal: PropTypes.string.isRequired,
  inProgress: PropTypes.string.isRequired,
  liked: PropTypes.string.isRequired,
  setLiked: PropTypes.func.isRequired,
  rec: PropTypes.arrayOf(PropTypes.object).isRequired,
  filtersKey: PropTypes.arrayOf(PropTypes.object).isRequired,
};
