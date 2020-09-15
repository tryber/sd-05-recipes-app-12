import React, { useState, useContext } from 'react';
import { RecipesContext } from '../../context/RecipesContext';

async function C(searchs, filteredText, setData) {
  if (searchs === 'ingredient') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${filteredText}`);
    const data = await response.json();
    setData(data);
  }
  if (searchs === 'name') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${filteredText}`);
    const data = await response.json();
    setData(data);
  }
  if (searchs === 'firstLetter') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${filteredText}`);
    const data = await response.json();
    setData(data);
  }
}

// Criar Função para Bebidas

const SearchBar = () => {
  const [ingredient] = useState('');
  const [name] = useState('');
  const [firstLetter] = useState('');
  const [search, setSearch] = useState('name');
  const [filteredText, setText] = useState('');
  const { setData, toggle } = useContext(RecipesContext);

  if (!toggle) {
    return (
      <div >
        <input data-testid="search-input" type="text" onChange={(e) => setText(e.target.value)} />
        <label htmlFor="ingredient">Ingredient</label>
        <input
          type="radio" id="ingredient" value={ingredient} name="radioInput"
          data-testid="ingredient-search-radio" onClick={(e) => setSearch(e.target.id)}
        />
        <label htmlFor="name">Name</label>
        <input
          type="radio" id="name" name="radioInput" value={name} data-testid="name-search-radio"
          onChange={(e) => setSearch(e.target.id)}
        />
        <label htmlFor="firstLetter">First Letter</label>
        <input
          type="radio" id="firstLetter" value={firstLetter} name="radioInput"
          data-testid="first-letter-search-radio" onChange={(e) => setSearch(e.target.id)}
        />
        <button
          type="button"
          data-testid="exec-search-btn" onClick={() => C(search, filteredText, setData)}
        >
        Buscar
        </button>
      </div>
    );
  }
  return <p>Categories</p>;
};

export default SearchBar;
