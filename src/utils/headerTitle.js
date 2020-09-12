const headerTitle = (title) => {
  switch (title) {
    case '/comidas':
      return 'Comidas';
    case '/perfil':
      return 'Perfil';
    case '/bebidas':
      return 'Bebidas';
    case '/explorar':
      return 'Explorar';
    case '/explorar/comidas':
      return 'Explorar Comidas';
    case '/explorar/bebidas':
      return 'Explorar Bebidas';
    case '/explorar/comidas/ingredientes':
      return 'Explorar Ingredientes';
    case '/explorar/bebidas/ingredientes':
      return 'Explorar Ingredientes';
    case '/explorar/comidas/area':
      return 'Explorar Origem';
    case '/receitas-feitas':
      return 'Receitas Feitas';
    case '/receitas-favoritas':
      return 'Receitas Favoritas';
    default:
      return '';
  }
};

export default headerTitle;
