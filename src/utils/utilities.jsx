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

export function hasLocalStorage(str, id, histories) {
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
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
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
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
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (history.location.pathname.includes('comidas')) {
    storage.meals[id] = newArrayOfChecked;
  } else if (history.location.pathname.includes('bebidas')) {
    storage.cocktails[id] = newArrayOfChecked;
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
}

export function saveToLocalStorageDrinks(id) {
  const oldList = JSON.parse(localStorage.getItem('inProgressRecipes'));
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
  const oldList = JSON.parse(localStorage.getItem('inProgressRecipes'));
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
