import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

const DetalhesBebida = () => {
  const { dataDetail, setDataDetail } = useContext(RecipesContext);
  const history = useHistory();
  const pathName = history.location.pathname;
  const { id } = useParams();
  console.log(dataDetail);

  useEffect(() => {
    async function verify() {
      if (pathName === `/comidas/${id}`) {
        const responses = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const datas = await responses.json();
        setDataDetail(datas);
      }
      if (pathName === `/bebidas/${id}`) {
        const responses = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const datas = await responses.json();
        setDataDetail(datas);
      }
    }
    verify();
  }, [setDataDetail, id, pathName]);
  if (dataDetail.length === 0) return <h1>loading...</h1>;
  const filtersKey = Object.keys(dataDetail.drinks[0]).filter(
    (key) => key.includes('strIngredient') && dataDetail.drinks[0][key] !== null && dataDetail.drinks[0][key] !== '');

  return (
    <div>
      <img
        data-testid="recipe-photo" src={dataDetail.drinks[0].strDrinkThumb}
        width="200px" height="150px" alt={dataDetail.drinks[0].strDrink}
      />
      <h1 data-testid="recipe-title">{dataDetail.drinks[0].strDrink}</h1>
      <span data-testid="recipe-category"> {dataDetail.drinks[0].strCategory} </span>
      <img src={shareIcon} data-testid="share-btn" alt="Share Icon" />
      <img src={whiteHeartIcon} data-testid="share-btn" alt="White Heart Icon" />
      <h1>Ingredients</h1>
      {filtersKey.map((filter, index) => (
        <p data-testid={`${index}-ingredient-name-and-measure`}>
          {dataDetail.drinks[0][filter]} -{' '} {dataDetail.drinks[0][`strMeasure${index + 1}`]}{' '}
          <img src={`https://www.thecocktaildb.com/images/ingredients/${dataDetail.drinks[0][filter].toLowerCase()}-Small.png`} alt={dataDetail.drinks[0][filter]} />
        </p>
      ))}
      <h1>Instructions</h1>
      <p data-testid="instructions">{dataDetail.drinks[0].strInstructions}</p>
    </div>
  );
};
export default DetalhesBebida;
