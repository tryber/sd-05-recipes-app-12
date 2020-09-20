export async function verify(pathName, id, setDataDetail, setIsMeal) {
  if (pathName === `/comidas/${id}` || pathName === `/comidas/${id}/in-progress`) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setDataDetail(data.meals[0]);
    setIsMeal(true);
  } else if (pathName === `/bebidas/${id}` || pathName === `/bebidas/${id}/in-progress`) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setDataDetail(data.drinks[0]);
    setIsMeal(false);
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

export function hasLocalStorage(str, id, histories) {
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes')) || { meals: [], cocktails: [] };
  if (storage && histories.location.pathname.includes('comidas')) {
    if (storage.meals[id]) {
      const check = storage.meals[id].some((item) => item === str);
      return check;
    }
  } else {
    const check = storage.cocktails[id].some((item) => item === str);
    return check;
  }
  return false;
}

export function isDisabled() {
  let disabled = true;
  let checked = 0;
  const allInputs = document.querySelectorAll('input');
  allInputs.forEach((input) => (input.checked ? (checked += 1) : 0));
  if (checked > 0 && checked === allInputs.length) {
    disabled = false;
  }
  return disabled;
}

export function isChecked(e, id, checked, setChecked, history) {
  const checkInput = document.getElementsByClassName(`${e.target.id}`)[0];
  checkInput.style.textDecoration = 'line-through';
  setChecked([...checked, e.target.id]);
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes')) || { meals: [], cocktails: [] };
  if (history.location.pathname.includes('comidas')) {
    storage.meals[id] = [...checked, e.target.id];
  } else if (history.location.pathname.includes('bebidas')) {
    storage.cocktails[id] = [...checked, e.target.id];
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
}

export function isNotChecked(e, id, checked, setChecked, history) {
  const checkInput = document.getElementsByClassName(`${e.target.id}`)[0];
  checkInput.style.textDecoration = 'none';
  const newArrayOfChecked = checked.filter((check) => check !== e.target.id);
  setChecked(newArrayOfChecked);
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes')) || { meals: [], cocktails: [] };
  if (history.location.pathname.includes('comidas')) {
    storage.meals[id] = newArrayOfChecked;
  } else if (history.location.pathname.includes('bebidas')) {
    storage.cocktails[id] = newArrayOfChecked;
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
}

export function saveToLocalStorageDrinks(id) {
  const oldList = JSON.parse(localStorage.getItem('inProgressRecipes')) || { meals: [], cocktails: [] };
  let savedList = {
    cocktails: {},
    meals: {},
  };
  if (oldList) {
    savedList = { ...oldList, cocktails: { ...oldList.cocktails, [id]: [] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(savedList));
  } else {
    savedList.cocktails[id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(savedList));
  }
}

export function saveToLocalStorageMeals(id) {
  const oldList = JSON.parse(localStorage.getItem('inProgressRecipes')) || { meals: [], cocktails: [] };
  let savedList = {
    cocktails: {},
    meals: {},
  };
  if (oldList) {
    savedList = { ...oldList, meals: { ...oldList.meals, [id]: [] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(savedList));
  } else {
    savedList.meals[id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(savedList));
  }
}

export function handleChange(e, id, checked, setChecked, histories) {
  if (e.target.checked) {
    isChecked(e, id, checked, setChecked, histories);
  } else {
    isNotChecked(e, id, checked, setChecked, histories);
  }
}

export function recipeInProgress(setInProgress, histories, id) {
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes')) || { meals: [], cocktails: [] };
  if (storage) {
    if (histories.location.pathname.includes('comidas')) {
      const newAttr = Object.keys(storage.meals);
      setInProgress(newAttr.some((item) => item === id));
    } else if (histories.location.pathname.includes('bebidas')) {
      const newAttr = Object.keys(storage.cocktails);
      setInProgress(newAttr.some((item) => item === id));
    }
  }
}

export function mealObj(dataDetail) {
  return {
    id: dataDetail.idMeal,
    type: 'comida',
    area: dataDetail.strArea,
    category: dataDetail.strCategory,
    alcoholicOrNot: '',
    name: dataDetail.strMeal,
    image: dataDetail.strMealThumb,
  };
}

export function drinkObj(dataDetail) {
  return {
    id: dataDetail.idDrink,
    type: 'bebida',
    area: '',
    category: dataDetail.strCategory,
    alcoholicOrNot: dataDetail.strAlcoholic,
    name: dataDetail.strDrink,
    image: dataDetail.strDrinkThumb,
  };
}

export function newFavorite(isMeal, dataDetail) {
  const favorite = isMeal ? mealObj(dataDetail) : drinkObj(dataDetail);
  const hasFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  if (!hasFavorite) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([favorite]));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...hasFavorite, favorite]));
  }
}

export function removeFavorite(isMeal, dataDetail, setLiked) {
  const hasFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  let removed;
  if (isMeal) {
    setLiked(false);
    removed = hasFavorite.filter((item) => item.id !== dataDetail.idMeal);
  } else {
    setLiked(false);
    removed = hasFavorite.filter((item) => item.id !== dataDetail.idDrink);
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(removed));
}

export function favoriteRecipe(liked, setLiked, dataDetail, isMeal) {
  if (!liked) {
    setLiked(true)
    newFavorite(isMeal, dataDetail, setLiked);
  } else {
    setLiked(false);
    removeFavorite(isMeal, dataDetail, setLiked);
  }
}
