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
        {
          test.map((meal) =>
            <div>
              <div>{meal.strMeal}</div>
              <img src={meal.strMealThumb} alt={meal.strMeal} width="200px" />
            </div>,
          )
        }
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
