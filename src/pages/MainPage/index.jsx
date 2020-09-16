import React from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import RecipeCard from '../../components/RecipeCard';
import Footer from '../../components/FooterMenu';

function MainPage() {
  return (
    <div>
      <Header />
      <SearchBar />
      <RecipeCard />
      <Footer />
    </div>
  );
}

export default MainPage;
