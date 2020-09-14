import React from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import RecipeCard from '../../components/RecipeCard';

export function Comidas() {
  return (
    <div>
      <Header />
      <SearchBar />
      <RecipeCard />
    </div>
  );
}

export const DetalhesComida = () => (<h1>Olá</h1>);
export const DetalhesComidaProgress = () => <div>Oi</div>;
