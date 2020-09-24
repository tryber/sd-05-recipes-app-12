import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';
import loading from '../../images/loader.gif';
import './styles.css';

const DrinkCard = () => {
  const { data, setData } = useContext(RecipesContext);
  useEffect(() => {
    async function apiFetch() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const datas = await response.json();
      setData(datas);
    }
    apiFetch();
  }, [setData]);
  if (data.drinks === undefined) return <img src={loading} alt="loader" />;
  let test;
  if (data.drinks === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    test = [];
  } else if (data.drinks.length === 1) {
    return <Redirect to={`/bebidas/${data.drinks[0].idDrink}`} />;
  } else {
    test = data.drinks.slice(0, 12);
  }
  return (
    <div className="recipeCard">
      {test.map((drink, index) => (
        <Link to={`/bebidas/${drink.idDrink}`}>
          <div className="each-item" data-testid={`${index}-recipe-card`} key={drink.idDrink}>
            <img
              className="card-img"
              data-testid={`${index}-card-img`}
              src={drink.strDrinkThumb}
              alt={drink.strDrink}
              width="70px"
            />
            <p data-testid={`${index}-card-name`}>{drink.strDrink}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DrinkCard;
