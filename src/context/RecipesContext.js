import React, { useState, createContext } from 'react';

export const RecipesContext = createContext();

export const Provider = ({children}) => {
  const [ingredient, setIngredient] = useState('');
  const [name, setName] = useState('');
  const [firstLetter, setFirstLetter] = useState('');
  const [data, setData] = useState([]);

  const context = {
    ingredient,
    setIngredient,
    name,
    setName,
    firstLetter,
    setFirstLetter,
    data,
    setData,
  }

  return (
    <RecipesContext.Provider value={context}>
      {children}
    </RecipesContext.Provider>
  )
}