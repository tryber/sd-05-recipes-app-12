import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams, Link } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { verify, recommended, saveToLocalStorageDrinks } from '../../utils/utilities';
// O aluno Felipe Vieira auxiliou na solução da tag iframe

function Inputs({ id, dataDetail, rec, filtersKey }) {
  return (
    <div>
      <img
        data-testid="recipe-photo" src={dataDetail.strDrinkThumb}
        width="200px" height="150px" alt={dataDetail.strDrink}
      />
      <h1 data-testid="recipe-title">{dataDetail.strDrink}</h1>
      <span data-testid="recipe-category">{dataDetail.strCategory}</span>
      <img src={shareIcon} data-testid="share-btn" alt="Share Icon" />
      <img src={whiteHeartIcon} data-testid="favorite-btn" alt="White Heart Icon" />
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
      <Link to={`/bebidas/${id}/progress`} onClick={() => saveToLocalStorageDrinks(id)}>
        <input type="button" data-testid="start-recipe-btn" value="Iniciar Receitas" />
      </Link>
    </div>
  );
}

const DetalhesBebida = () => {
  const { dataDetail, setDataDetail, drink, setDrink } = useContext(RecipesContext);
  const history = useHistory();
  const pathName = history.location.pathname;
  const { id } = useParams();
  useEffect(() => {
    verify(pathName, id, setDataDetail);
  }, [setDataDetail, id, pathName]);
  useEffect(() => {
    recommended(pathName, null, setDrink);
  }, [pathName, setDrink]);
  if (dataDetail.length === 0) return <h1>loading...</h1>;
  const filtersKey = Object.keys(dataDetail).filter(
    (key) => key.includes('strIngredient') && dataDetail[key] !== null && dataDetail[key] !== '');
  const rec = drink.slice(0, 6);
  const params = { id, dataDetail, rec, filtersKey };
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
