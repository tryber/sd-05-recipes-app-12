const headerTitle = (title) => {
  switch (title) {
    case '/comidas':
      return 'Comidas';
    case '/profile':
      return 'Profile';
    default: return '';
  }
};

export default headerTitle;
