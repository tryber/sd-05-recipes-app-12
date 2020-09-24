import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Redirect, Link } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';
import { getIngredientsFilter } from '../../utils/utilities';
import './styles.css';


const ExploreDrinkCard = () => {
  const { data, setData, goat } = useContext(RecipesContext);
  const history = useHistory();
  const pathName = history.location.pathname;

  useEffect(() => {
    async function getIngredientsDrink() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const datas = await response.json();
      setData(datas);
    }
    getIngredientsDrink();
  }, [setData]);

  if (data.drinks === undefined) return <h1>Loading...</h1>;
  let test;
  if (data.drinks === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    test = [];
  } else if (data.drinks.length === 1 && goat !== 'Goat') {
    return <Redirect to={'/explore/bebidas'} />;
  } else {
    test = data.drinks.slice(0, 12);
  }
  return (
    <div className="recipeCard">
      {test.map((drink, index) => (
        <Link
          to="/comidas"
          onClick={() => getIngredientsFilter(pathName, drink.strIngredient1, setData)}
        >
          <div >
            <div className="each-item" data-testid={`${index}-ingredient-card`} key={drink.idDrink}>
              <img
                className="card-img"
                data-testid={`${index}-card-img`}
                src={`https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png`}
                alt={drink.strDrink}
                width="70px"
              />
              <p data-testid={`${index}-card-name`}>{drink.strIngredient1}</p>

            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ExploreDrinkCard;
