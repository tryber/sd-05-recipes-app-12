import React, { useContext } from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import { RecipesContext } from '../../context/RecipesContext';


const Comidas = () => {
  const { data } = useContext(RecipesContext);
  console.log(`Esse é o data ${JSON.stringify(data)}`);
  return (
    <div>
      <Header />
      <SearchBar />
    </div>
  );
};

export default Comidas;
