import React, { useContext, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
// O aluno Felipe Vieira auxiliou na solução da tag iframe

const DetalhesComida = () => {
  const { dataDetail, setDataDetail, meal, setMeal } = useContext(RecipesContext);
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
        setDataDetail(data.meals[0]);
      }
    }
    verify();
  }, [setDataDetail, id, pathName]);
  
  useEffect(() => {
    async function recommended() {
      if (pathName.match(/comidas/)) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`);
        const data = await response.json();
        setMeal(data.drinks);
      } else if (pathName.match(/bebidas/)) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
        const data = await response.json();
        setMeal(data.drinks);
      }
    }
    recommended()
  },[])
  if (dataDetail.length === 0) return <h1>loading...</h1>;
  const filtersKey = Object.keys(dataDetail).filter((key) => key.includes('strIngredient') && dataDetail[key] !== '');
  const rec = meal.slice(0, 6)
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
        <p data-testid={`${index}-ingredient-name-and-measure`}>{dataDetail[filter]} - {dataDetail[`strMeasure${index + 1}`]}</p>
      ))}
      <h1>Instructions</h1>
      <p data-testid="instructions">{dataDetail.strInstructions}</p>
      <h1>Vídeos</h1>
      <iframe
        data-testid="video" title={dataDetail.strYoutube} width="200px" src={dataDetail.strYoutube &&
        dataDetail.strYoutube.replace('watch?v=', 'embed/')}
        frameBorder="0" allow="autoplay" allowFullScreen="true"
      />
      <h1>Recomendadas</h1>
      {rec.map((recommend, index) => (
        <div style={index < 2 ? {display:'block'} : {display: 'none'}} >
          <img data-testid={`${index}-recomendation-card`} src={recommend.strDrinkThumb} width="200px"/>
          <p data-testid={`${index}-recomendation-title`}>{recommend.strDrink}</p>
        </div>
       ))}     
      <Link to={`/comidas/${id}/progress`}>
        <input type="button" data-testid="start-recipe-btn" value="Iniciar Receitas" />           
      </Link>
    </div>
  );
};
export default DetalhesComida;
