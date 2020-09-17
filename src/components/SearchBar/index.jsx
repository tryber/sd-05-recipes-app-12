import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types';
import { RecipesContext } from '../../context/RecipesContext';

async function FHC(searchs, filteredText, setData) {
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

async function FDC(searchs, filteredText, setData) {
  if (searchs === 'ingredient') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filteredText}`);
    const data = await response.json();
    setData(data);
  }
  if (searchs === 'name') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filteredText}`);
    const data = await response.json();
    setData(data);
  }
  if (searchs === 'firstLetter') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${filteredText}`);
    const data = await response.json();
    setData(data);
  }
}

function Inputs({ setText, setSearch, search, filteredText, setData, pathName }) {
  return (
    <div >
      <input data-testid="search-input" type="text" onChange={(e) => setText(e.target.value)} />
      <label htmlFor="ingredient">Ingredient</label>
      <input
        type="radio" id="ingredient" name="radioInput"
        data-testid="ingredient-search-radio" onClick={(e) => setSearch(e.target.id)}
      />
      <label htmlFor="name">Name</label>
      <input
        type="radio" id="name" name="radioInput" data-testid="name-search-radio"
        onChange={(e) => setSearch(e.target.id)}
      />
      <label htmlFor="firstLetter">First Letter</label>
      <input
        type="radio" id="firstLetter" name="radioInput"
        data-testid="first-letter-search-radio" onChange={(e) => setSearch(e.target.id)}
      />
      {(pathName === '/comidas')&&   
      <button
        type="button"
        data-testid="exec-search-btn" onClick={() => FHC(search, filteredText, setData)}
      >
      Buscar
      </button>}
      {(pathName === '/bebidas') &&
      <button
        type="button"
        data-testid="exec-search-btn" onClick={() => FDC(search, filteredText, setData)}
      >
      Buscar
      </button>
}
    </div>
  );
}

async function updateCategory(catFilter, setData) {
  if (catFilter === 'All') {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setData(data);
  } else {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catFilter}`);
    const data = await response.json();
    setData(data);
  }
}

// Criar Função para Bebidas
const SearchBar = () => {
  const [search, setSearch] = useState('name');
  const [filteredText, setText] = useState('');
  const { setData, toggle, categories, setCategories } = useContext(RecipesContext);
  const history = useHistory();
  const pathName = history.location.pathname;

  useEffect(() => {
    async function getCategories() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const cat = data.meals.slice(0, 5);
      setCategories(cat);
    }
    getCategories();
  }, [setCategories]);

  if (!toggle) {
    const params = { setText, setSearch, FHC, FDC, pathName, search, filteredText, setData };
    return (
      Inputs(params)
    );
  }
  return (
    <div>
      <button
        value="All" data-testid="All-category-filter"
        onClick={(e) => updateCategory(e.target.value, setData)}
      >
      All
      </button>
      {(categories !== undefined) && categories.map((category) => (
        <button
          data-testid={`${category.strCategory}-category-filter`} value={Object.values(category)}
          onClick={(e) => updateCategory(e.target.value, setData)}
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
};

export default SearchBar;

Inputs.propTypes = {
  setData: PropTypes.arrayOf(PropTypes.object).isRequired,
  filteredText: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  setText: PropTypes.func.isRequired,
};
