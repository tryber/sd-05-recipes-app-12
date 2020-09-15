import React, { useState, useContext } from 'react';
import { RecipesContext } from '../../context/RecipesContext';
import Inputs from '../Inputs';

const SearchBar = () => {
  const [ingredient, setIngredient] = useState('');
  const [name, setName] = useState('');
  const [firstLetter, setFirstLetter] = useState('');
  const [search, setSearch] = useState('name');
  const [filteredText, setText] = useState('');
  const { setData, toggle } = useContext(RecipesContext);
  async function C(searchs) {
    if (searchs === 'ingredient') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${filteredText}`);
      const data = await response.json();
      setData(data);
      setIngredient(searchs);
    } else if (searchs === 'name') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${filteredText}`);
      const data = await response.json();
      setData(data);
      setName(searchs);
    } else {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${filteredText}`);
      const data = await response.json();
      setData(data);
      setFirstLetter(searchs);
    }
  }
  return (
    <div data-testid="search-input" style={{ display: toggle }} >
      <input type="text" onChange={(e) => setText(e.target.value)} />
      <Inputs htmlFor="ingredient" label="Ingredients" type="radio" id="ingredient" dataTestId="ingredient-search-radio" onClick={(e) => setSearch(e.target.id)} />
      <Inputs htmlFor="ingredient" label="Ingredients" type="radio" id="ingredient" dataTestId="ingredient-search-radio" onClick={(e) => setSearch(e.target.id)} />
      <Inputs htmlFor="ingredient" label="Ingredients" type="radio" id="ingredient" dataTestId="ingredient-search-radio" onClick={(e) => setSearch(e.target.id)} />
      <button type="button" data-testid="exec-search-btn" onClick={() => C(search)}>Buscar</button>
    </div>
  );
};

export default SearchBar;
