import React, { useContext } from 'react';
// import index from './index';
import { RecipesContext } from '../../context/RecipesContext';


const RecipeCard = () => {
  const { data } = useContext(RecipesContext);
  console.log(data);

  if (data.meals !== undefined ) {
    const test = data.meals.map((meal) => <div>{meal.strMeal}</div>)
    return <div>{test[0]}</div>
  }
  return (
    <div>
      <h1>ainda não fez nenhuma busca</h1>
      
    </div>
  )
  

}

export default RecipeCard;
