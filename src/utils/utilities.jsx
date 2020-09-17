export async function verify(pathName, id, setDataDetail) {
  if (pathName === `/comidas/${id}`) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setDataDetail(data.meals[0]);
  } else if (pathName === `/bebidas/${id}`) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setDataDetail(data.drinks[0]);
  }
}

export async function recommended(pathName, setMeal, setDrink) {
  if (pathName.match(/comidas/)) {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setMeal(data.drinks);
  }
  if (pathName.match(/bebidas/)) {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setDrink(data.meals);
  }
}
