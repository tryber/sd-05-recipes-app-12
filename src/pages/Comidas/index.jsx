import React from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
//import { RecipesContext } from '../../context/RecipesContext';
import RecipeCard from '../../components/SearchBar/RecipeCard';


const Comidas = () => {
  //const { data } = useContext(RecipesContext);
  //console.log(`Esse é o data ${JSON.stringify(data)}`);
  
  return (
       
    
    <div>
      <Header />
      <SearchBar />
      <RecipeCard />

    </div>
  );
};

export default Comidas;
