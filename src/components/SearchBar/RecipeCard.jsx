import React, { useContext } from 'react';
// import index from './index';
import { RecipesContext } from '../../context/RecipesContext';

const RecipeCard = () => {
  const { data } = useContext(RecipesContext);
  console.log(data);

  if (data.meals !== undefined) {
    const test = data.meals.slice(0, 12);
    return (
      <div>
<<<<<<< HEAD
        {
          test.map((meal, index) =>
            <div key={meal.idMeal}>
              <img data-testid={`${index}-card-img`} src={meal.strMealThumb} alt={meal.strMeal} width="200px" />
              <div data-testid={`${index}-card-name`}>{meal.strMeal}</div>
            </div>,
          )
        }
=======
        {test.map((meal, index) => (
          <div>
            <img
              data-testid={`${index}-card-img`}
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width="200px"
            />
            <div data-testid={`${index}-card-name`}>{meal.strMeal}</div>
          </div>
        ))}
>>>>>>> b5b01721680d390c3664fe6222c34d98ff3fe379
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
