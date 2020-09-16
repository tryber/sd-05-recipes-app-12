import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';

const RecipeCard = () => {
  const { data, setData } = useContext(RecipesContext);

  useEffect(() => {
    async function apiFetch() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const datas = await response.json();
      setData(datas);
    }
    apiFetch();
  }, [setData]);

  if (data.meals === undefined) return <h1>Loading...</h1>;
  const test = data.meals.slice(0, 12);
  return (
    <div>
      {test.map((meal, index) => (
        <Link to={`/comidas/${meal.idMeal}`}>
          <div data-testid={`${index}-recipe-card`}>
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
