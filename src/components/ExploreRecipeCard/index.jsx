import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Redirect, Link } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';
import { getIngredientsFilter } from '../../utils/utilities';


const ExploreRecipeCard = () => {
  const { data, setData, goat } = useContext(RecipesContext);
  const history = useHistory();
  const pathName = history.location.pathname;

  useEffect(() => {
    async function getIngredientsFood() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const datas = await response.json();
      setData(datas);
    }
    getIngredientsFood();
  }, [setData]);

  if (data.meals === undefined) return <h1>Loading...</h1>;
  let test;
  if (data.meals === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    test = [];
  } else if (data.meals.length === 1 && goat !== 'Goat') {
    return <Redirect to={'/explore/comidas'} />;
  } else {
    test = data.meals.slice(0, 12);
  }
  return (
    <div className="recipeCard">
      {test.map((meal, index) => (
        <Link to={'/comidas'} onClick={() => getIngredientsFilter(pathName, meal.strIngredient, setData)} >
          <div >
            <div className="each-item" data-testid={`${index}-ingredient-card`} key={meal.idMeal}>
              <img
                className="card-img"
                data-testid={`${index}-card-img`}
                src={`https://www.themealdb.com/images/ingredients/${meal.strIngredient}-Small.png`}
                alt={meal.strMeal}
                width="70px"
              />
              <p data-testid={`${index}-card-name`}>{meal.strIngredient}</p>

            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ExploreRecipeCard;
