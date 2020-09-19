import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams, Link } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { verify, recommended, saveToLocalStorage } from '../../utils/utilities';
// O aluno Felipe Vieira auxiliou na solução da tag iframe

function Input({ id, dataDetail, rec, filtersKey, histories }) {
  return (
    <div>
      <img
        data-testid="recipe-photo" src={dataDetail.strMealThumb}
        width="200px" height="150px" alt={dataDetail.strMeal}
      />
      <h1 data-testid="recipe-title">{dataDetail.strMeal}</h1>
      <span data-testid="recipe-category">{dataDetail.strCategory}</span>
      <img src={shareIcon} data-testid="share-btn" alt="Share Icon" />
      <img src={whiteHeartIcon} data-testid="favorite-btn" alt="White Heart Icon" />
      <h1>Ingredients</h1>
      {filtersKey.map((filter, index) => (
        <p key={filter.strMeal} data-testid={`${index}-ingredient-name-and-measure`}>{dataDetail[filter]} - {dataDetail[`strMeasure${index + 1}`]}</p>
      ))}
      <h1>Instructions</h1>
      <p data-testid="instructions">{dataDetail.strInstructions}</p>
      <h1>Vídeos</h1>
      <iframe
        data-testid="video" title={dataDetail.strYoutube} width="200px"
        src={dataDetail.strYoutube && dataDetail.strYoutube.replace('watch?v=', 'embed/')}
        frameBorder="0" allow="autoplay"
      />
      <h1>Recomendadas</h1>
      {rec.map((recommend, index) => (
        <div key={recommend.strDrink} style={index < 2 ? { display: 'block' } : { display: 'none' }}>
          <img
            data-testid={`${index}-recomendation-card`} src={recommend.strDrinkThumb}
            width="200px" alt={recommend.strDrink}
          />
          <p data-testid={`${index}-recomendation-title`}>{recommend.strDrink}</p>
        </div>
      ))}
      <Link to={`/comidas/${id}/progress`} onClick={() => saveToLocalStorage(id, histories)}>
        <input type="button" data-testid="start-recipe-btn" value="Iniciar Receitas" />
      </Link>
    </div>
  );
}

const DetalhesComida = () => {
  const { dataDetail, setDataDetail, meal, setMeal } = useContext(RecipesContext);
  const history = useHistory();
  const histories = history;
  const pathName = history.location.pathname;
  const { id } = useParams();
  useEffect(() => {
    verify(pathName, id, setDataDetail);
  }, [setDataDetail, id, pathName]);
  useEffect(() => {
    recommended(pathName, setMeal);
  }, [pathName, setMeal]);
  if (dataDetail.length === 0) return <h1>loading...</h1>;
  const filtersKey = Object.keys(dataDetail).filter(
    (key) => key.includes('strIngredient') && dataDetail[key] !== null && dataDetail[key] !== '');
  const rec = meal.slice(0, 6);
  const params = { id, dataDetail, rec, filtersKey, histories };
  return (
    Input(params)
  );
};
export default DetalhesComida;

Input.propTypes = {
  dataDetail: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  rec: PropTypes.arrayOf(PropTypes.object).isRequired,
  filtersKey: PropTypes.arrayOf(PropTypes.object).isRequired,
  histories: PropTypes.string.isRequired,
};
