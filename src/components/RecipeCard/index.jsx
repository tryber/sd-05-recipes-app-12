import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import index from './index';
import { RecipesContext } from '../../context/RecipesContext';

const RecipeCard = () => {
  const { data, setData, goat } = useContext(RecipesContext);
  useEffect(() => {
    async function apiFetch() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const datas = await response.json();
      setData(datas);
    }
    apiFetch();
  }, [setData]);
  if (data.meals === undefined) return <h1>Loading...</h1>;
  let test;
  if (data.meals === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    test = [];
  } else if (data.meals.length === 1 && goat !== 'Goat') {
    return <Redirect to ={`/comidas/${data.meals[0].idMeal}`} />
  } else {
    test = data.meals.slice(0, 12);
  }
  return (
    <div>
      {test.map((meal, index) => (
        <Link to={`/comidas/${meal.idMeal}`}>
          <div data-testid={`${index}-recipe-card`} key={meal.idMeal}>
            <img
              data-testid={`${index}-card-img`}
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width="200px"
            />
            <div data-testid={`${index}-card-name`}>{meal.strMeal}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecipeCard;
