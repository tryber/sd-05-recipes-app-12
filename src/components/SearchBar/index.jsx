import React, { useContext } from 'react';
import { RecipesContext } from '../../context/RecipesContext';

const SearchBar = () => {
  const {ingredient, name, firstLetter, setFirstLetter ,setName ,setIngredient } = useContext(RecipesContext);

  const handleChange = (event) => {
    const { id } = event.target;
    if(id === 'ingredient') {
      setIngredient(id);
    }else if (id === 'name') {
      setName(id);
    } else {
      setFirstLetter(id);
    }
  }

  return (
    <div>
      <input type="text" data-testid="search-input" />
      <label htmlFor="ingredient">
        Ingredient
        <input type="radio" id="ingredient" value={ingredient} name="radioInput" data-testid="ingredient-search-radio" onClick={(event) => handleChange(event)} />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          id="name"
          name="radioInput"
          value={name} data-testid="name-search-radio"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="firstLetter">
        First Letter
        <input type="radio" id="firstLetter" value={firstLetter} name="radioInput" data-testid="first-letter-search-radio" onChange={(e) => handleChange(e)} />
      </label>
      <button>Buscar</button>
    </div>
  );
};

export default SearchBar;
