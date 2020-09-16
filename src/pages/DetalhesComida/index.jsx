import React, { useContext, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

const DetalhesComida = () => {
  const { dataDetail, setDataDetail } = useContext(RecipesContext);
  const history = useHistory();
  const pathName = history.location.pathname;
  const { id } = useParams();
  useEffect(() => {
    async function verify() {
      if (pathName === `/comidas/${id}`) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setDataDetail(data.meals[0]);
      }
      if (pathName === `/bebidas/${id}`) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setDataDetail(data.drinks[0]);
      }
    }
    verify();
  }, [setDataDetail, id, pathName]);
  if (dataDetail.length === 0) return <h1>loading...</h1>;
  const filtersKey = Object.keys(dataDetail).filter((key) => key.includes('strIngredient') && dataDetail[key] !== null && dataDetail[key] !== '');
  return (
    <div>
      <img
        data-testid="recipe-photo" src={dataDetail.strMealThumb}
        width="200px" height="150px" alt={dataDetail.strMeal}
      />
      <h1 data-testid="recipe-title">{dataDetail.strMeal}</h1>
      <span data-testid="recipe-category">{dataDetail.strCategory}</span>
      <img src={shareIcon} data-testid="share-btn" alt="Share Icon" />
      <img src={whiteHeartIcon} data-testid="share-btn" alt="White Heart Icon" />
      <h1>Ingredients</h1>
      {filtersKey.map((filter, index) => (
        <p data-testid={`${index}-ingredient-name-and-measure`}>{dataDetail[filter]} - {dataDetail[`strMeasure${index + 1}`]} <img src={`https://www.themealdb.com/images/ingredients/${dataDetail[filter].toLowerCase()}-Small.png`} alt={dataDetail[filter]} /></p>
      ))}
      <h1>Instructions</h1>
      <p data-testid="instructions">{dataDetail.strInstructions}</p> 
      <h1>Vídeos</h1>
      <Link>
        <iframe
          data-testid="video" title={dataDetail.strYoutube} width="300px" src={dataDetail.strYoutube
          && dataDetail.strYoutube.replace('watch?v=', 'embed/')} frameBorder="0" allow="autoplay" allowFullScreen="true"
        />
      </Link>
    </div>
  );
};
export default DetalhesComida;
