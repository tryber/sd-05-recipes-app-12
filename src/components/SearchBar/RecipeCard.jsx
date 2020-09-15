import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import index from './index';
import { RecipesContext } from '../../context/RecipesContext';

const RecipeCard = () => {
  const { data } = useContext(RecipesContext);
  console.log(data);

  if (data.meals !== undefined) {
    const test = data.meals.slice(0, 12);
    return (
      <div>
        {test.map((meal, index) => (
          <Link to={`/comidas/${meal.idMeal}`}>
            <div>
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
  }

  return (
    <div>
      <h1>ainda não fez nenhuma busca</h1>
    </div>
  );
};

export default RecipeCard;
