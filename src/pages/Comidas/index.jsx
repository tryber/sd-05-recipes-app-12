import React, { useContext } from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import { RecipesContext } from '../../context/RecipesContext';


const Comidas = () => {
  const { data } = useContext(RecipesContext);
  if (data.meals !== undefined) {
    data.meals.map((meal) => console.log(meal));
  }
  return (
    <div>
      <Header />
      <SearchBar />
    </div>
  );
};

export default Comidas;
