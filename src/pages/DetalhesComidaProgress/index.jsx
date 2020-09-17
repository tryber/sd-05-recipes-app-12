import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

const DetalhesComidaProgress = () => {
  const { dataDetail, setDataDetail } = useContext(RecipesContext);
  const history = useHistory();
  const pathName = history.location.pathname;
  const { id } = useParams();
  useEffect(() => {
    async function verify() {
      if (pathName === `/comidas/${id}`) {
        const responses = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const datas = await responses.json();
        setDataDetail(datas.meals[0]);
      }
      if (pathName === `/bebidas/${id}`) {
        const responses = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const datas = await responses.json();
        setDataDetail(datas.meals[0]);
      }
    }
    verify();
  }, [setDataDetail, id, pathName]);
  if (dataDetail.length === 0) return <h1>loading...</h1>;
  const filtersKeyOutra = Object.keys(dataDetail).filter((key) => key.includes('strIngredient') && dataDetail[key] !== '');
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
        <p data-testid={`${index}-ingredient-name-and-measure`}>{dataDetail[filter]} - {dataDetail[`strMeasure${index + 1}`]}</p>
      ))}
      <h1>Instructions</h1>
      <p data-testid="instructions">{dataDetail.strInstructions}</p>
      <button data-testid="finish-recipe-btn" type="button">Finalizar Receita</button>
    </div>
  );
};
export default DetalhesComidaProgress;
