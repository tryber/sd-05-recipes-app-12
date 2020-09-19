import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const RecipesContext = createContext();

export const Provider = ({ children }) => {
  const [ingredient, setIngredient] = useState('');
  const [name, setName] = useState('');
  const [firstLetter, setFirstLetter] = useState('');
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [meal, setMeal] = useState([]);
  const [drink, setDrink] = useState([]);
  const [goat, setGoat] = useState('All');
  const [isMeal, setIsMeal] = useState(true);
  const [liked, setLiked] = useState(false);
  const context = {
    ingredient,
    setIngredient,
    name,
    setName,
    firstLetter,
    setFirstLetter,
    categories,
    setCategories,
    data,
    setData,
    dataDetail,
    setDataDetail,
    toggle,
    setToggle,
    meal,
    setMeal,
    drink,
    setDrink,
    goat,
    setGoat,
    isMeal,
    setIsMeal,
    liked, 
    setLiked,
  };

  return (
    <RecipesContext.Provider value={context}>
      {children}
    </RecipesContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
