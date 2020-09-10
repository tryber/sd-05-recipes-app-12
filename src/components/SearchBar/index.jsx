import React, { useState, useContext } from 'react';
import { RecipesContext } from '../../context/RecipesContext';

const SearchBar = () => {
  const [ingredient, setIngredient] = useState('');
  const [name, setName] = useState('');
  const [firstLetter, setFirstLetter] = useState('');
  const [search, setSearch] = useState('name');
  const [filteredText, setfilteredText] = useState('');
  const { setData } = useContext(RecipesContext);

  async function handleClick(search) {
    if (search === 'ingredient') {
      const response =  await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${filteredText}`);
      const data = await response.json();
      setData(data);
      setIngredient(search);
    }else if (search === 'name') {
      const response =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${filteredText}`);
      const data = await response.json();
      setData(data);
      setName(search);
    } else {
      const response =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${filteredText}`);
      const data = await response.json();
      setData(data);
      setFirstLetter(search);
    }
  }

  console.log(search);

  return (
    <div>
      <input type="text" data-testid="search-input" onChange={(e) => setfilteredText(e.target.value)}/>
      <label htmlFor="ingredient">
        Ingredient
        <input type="radio" id="ingredient" value={ingredient} name="radioInput" data-testid="ingredient-search-radio" onClick={(e) => setSearch(e.target.id)} />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          id="name"
          name="radioInput"
          value={name} data-testid="name-search-radio"
          onChange={(e) => setSearch(e.target.id)}
        />
      </label>
      <label htmlFor="firstLetter">
        First Letter
        <input type="radio" id="firstLetter" value={firstLetter} name="radioInput" data-testid="first-letter-search-radio" onChange={(e) => setSearch(e.target.id)} />
      </label>
      <button type="button" onClick={() => handleClick(search)}>Buscar</button>
    </div>
  );
};

export default SearchBar;
