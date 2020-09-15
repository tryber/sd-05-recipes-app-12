import React from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import RecipeCard from '../../components/RecipeCard';

const MainPage = () => {
  return (
    <div>
      <Header />
      <SearchBar />
      <RecipeCard />
    </div>
  );
}

export default MainPage;