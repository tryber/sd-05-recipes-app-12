import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';

const RecipeCard = () => {
  const { data, setData } = useContext(RecipesContext);

  useEffect(() => {
    async function apiFetch() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const datas = await response.json();
      setData(datas);
    }
    apiFetch();
  }, [setData]);

  if (data.drinks === undefined) return <h1>Loading...</h1>;
  const test = data.drinks.slice(0, 12);
  return (
    <div>
      {test.map((drink, index) => (
        <Link to={`/bebidas/${drink.idDrink}`}>
          <div>
            <img
              data-testid={`${index}-card-img`}
              src={drink.strDrinkThumb}
              alt={drink.strDrink}
              width="200px"
            />
            <div data-testid={`${index}-card-name`}>{drink.strDrink}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecipeCard;
