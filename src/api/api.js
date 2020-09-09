// categorias: https://www.themealdb.com/api/json/v1/1/list.php?c=list
// areas: https://www.themealdb.com/api/json/v1/1/list.php?a=list
// ingredientes: https://www.themealdb.com/api/json/v1/1/list.php?i=list
// FOTOS: https://www.themealdb.com/images/ingredients/{nome-do-ingrediente}.png

const endPoint = {
  categorias: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
  areas: 'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
  ingredientes: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
  // fotos: `https://www.themealdb.com/images/ingredients/${photo}`,
};

// Busca da lista de categorias
export async function getCategories() {
  const urlCategories = endPoint.categorias;
  const response = await fetch(urlCategories);
  const data = await response.json();
  return data;
}

// Busca da lista de areas
export async function getAreas() {
  const urlArea = endPoint.areas;
  const response = await fetch(urlArea);
  const data = await response.json();
  return data;
}

// Busca da lista de Ingredientes
export async function getIngredientes() {
  const urlIngredientes = endPoint.ingredientes;
  const response = await fetch(urlIngredientes);
  const data = await response.json();
  return data;
}

// Busca da lista de fotos
/* export async function getFotos(nomeIngrediente) {
  const urlFotos = endPoint.ingredientes;
  const response = await fetch(urlFotos);
  const data = await response.json();
  return data;
} */

/* const dataAPIMeal = 'https://www.themealdb.com/api.php';

export const requisicaoAPIMeal = (dataAPIMeal) =>
fetch(dataAPIMeal)
  .then((resposta) => resposta.json())
  .then((resposta) => resposta)
  .catch((error) => console.error(error, `A API apresentou o seguinte erro.`)); */


/* const dataAPICocktail = 'https://www.thecocktaildb.com/api.php';

export const requisicaoAPICocktail = (dataAPICocktail) =>
fetch(dataAPICocktail)
  .then((resposta) => resposta.json())
  .then((resposta) => resposta)
  .catch((error) => console.error(error, `A API apresentou o seguinte erro.`)); */
