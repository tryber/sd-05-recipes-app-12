import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RecipesContext } from '../../context/RecipesContext';
import { isDisabled, hasLocalStorage, handleChange, isChecked, isNotChecked, verify } from '../../utils/utilities';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function render({ dataDetail, histories, id, checked, setChecked, filtersKeyOutra }) {
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
      {filtersKeyOutra.map((filter, index) => (
        <div key={filter.strMeal}>
          <label htmlFor={`meal${index + 1}`} className={`meal${index + 1}`} >
            <input
              type="checkbox" checked={hasLocalStorage(`meal${index + 1}`, id, histories)}
              id={`meal${index + 1}`}
              onChange={(e) =>
                handleChange(e, id, checked, setChecked, histories, isChecked, isNotChecked)
              }
              data-testid={`${index}-ingredient-step`}
            />
            {dataDetail[filter]} - {dataDetail[`strMeasure${index + 1}`]}
          </label>
        </div>
      ))}
      <h1>Instructions</h1>
      <p data-testid="instructions">{dataDetail.strInstructions}</p>
      <button data-testid="finish-recipe-btn" disabled={isDisabled()} type="button">
        Finalizar Receita
      </button>
    </div>
  );
}

const DetalhesComidaProgress = () => {
  const { dataDetail, setDataDetail } = useContext(RecipesContext);
  const [checked, setChecked] = useState([]);
  const history = useHistory();
  const histories = history;
  const pathName = history.location.pathname;
  const { id } = useParams();
  useEffect(() => {
    verify(pathName, id, setDataDetail);
  }, [setDataDetail, id, pathName]);

  if (dataDetail.length === 0) return <h1>loading...</h1>;
  const filtersKeyOutra = Object.keys(dataDetail).filter(
    (key) => key.includes('strIngredient') && dataDetail[key] !== null && dataDetail[key] !== '');
  const params = { dataDetail, shareIcon, histories, id, checked, setChecked, filtersKeyOutra };
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
