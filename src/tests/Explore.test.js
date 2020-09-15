import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

afterEach(cleanup);
describe('Todos os elementos devem respeitar os atributos descritos no protótipo para a tela de explorar', () => {
  test('Tem os data-testids explore-food e explore-drinks', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/explorar']}>
        <App />
      </MemoryRouter>
    );
    expect(getByTestId('explore-food')).toBeInTheDocument();
    expect(getByTestId('explore-drinks')).toBeInTheDocument();
  });
  test('A tela deve ter dois botões: um para explorar comidas e o outro para explorar bebidas', () => {
    expect(getByTestId('explore-food')).toBeDefined();
    expect(getByTestId('explore-drinks')).toBeDefined();
  });
});

describe('Ao clicar em um dos botões, a rota deve mudar para a página de explorar comidas ou de explorar bebidas', () => {
  test('O nomes dos botões devem ser "Explorar Comidas" e "Explorar Bebidas', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/explorar']}>
        <App />
      </MemoryRouter>
    );
    expect(getByTestId('explore-food').textContent).toBe('Explorar Comidas');
    expect(getByTestId('explore-drinks').textContent).toBe('Explorar Bebidas');
  });
  test('Clicar envia para Explorar Comidas ou Explorar Bebidas', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/explorar']}>
        <App />
      </MemoryRouter>
    );
    fireEvent.click(getByTestId('explorar-comidas'));
    expect(getByTestId(location.pathname)).toBe('/explorar/comidas');
    fireEvent.click(getByTestId('explorar-bebidas'));
    expect(getByTestId(location.pathname)).toBe('/explorar/bebidas');
  });
});
