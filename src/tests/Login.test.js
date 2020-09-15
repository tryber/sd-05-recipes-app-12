import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

afterEach(cleanup);
describe('Todos os elementos devem respeitar os atributos descritos no protótipo para a tela de login', () => {
  test('Tem os data-getByTestIds email-input, password-inout e login-submit-btn', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(getByTestId('email-input')).toBeInTheDocument();
    expect(getByTestId('password-input')).toBeInTheDocument();
    expect(getByTestId('login-submit-btn')).toBeInTheDocument();
    expect(getByTestId('email-input')).toBeDefined();
    expect(getByTestId('password-input')).toBeDefined();
    expect(getByTestId('login-submit-btn')).toBeDefined();
    expect(location.pathname).toBe('/')
  });

  test('A pessoa deve conseguir escrever seu email no input de email', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(getByTestId('email-input')).toBeDefined();
    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'teste@teste.com' },
    });
    expect(getByTestId('email-input').value).toEqual('teste@teste.com');
  });

  test('A pessoa deve conseguir escrever sua senha no input de senha', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(getByTestId('password-input')).toBeDefined();
    fireEvent.change(getByTestId('password-input'), {
      target: { value: '1234567' },
    });
    expect(getByTestId('password-input').value).toEqual('1234567');
  });
});

describe('O formulário só fica válido após um email válido e uma senha de mais de 6 caracteres serem preenchidos. Caso o formulário esteja inválido, o botão de submeter deve estar desativado, contendo a propriedade disabled. Caso contrário, deve estar ativado, não contendo a propriedade disabled', () => {
  test('O botão deve estar desativado se o email for inválido', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(getByTestId('email-input')).toBeDefined();
    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'bxfbcxnnc' },
    });
    fireEvent.change(getByTestId('password-input'), {
      target: { value: '1234567' },
    });
    expect(getByTestId('login-submit-btn')).toBeDisabled();
    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'teste@testecom' },
    });
    fireEvent.change(getByTestId('password-input'), {
      target: { value: '1234567' },
    });
    expect(getByTestId('login-submit-btn')).toBeDisabled();
  });

  test('O botão deve estar desativado se a senha deve tiver 6 caracteres ou menos', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(getByTestId('email-input')).toBeDefined();
    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'teste@teste.com' },
    });
    fireEvent.change(getByTestId('password-input'), {
      target: { value: '123456' },
    });
    expect(getByTestId('login-submit-btn')).toBeDisabled();
  });

  test('O botão deve estar ativado se o email e a senha forem válidos.', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(getByTestId('email-input')).toBeDefined();
    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'teste@teste.com' },
    });
    fireEvent.change(getByTestId('password-input'), {
      target: { value: '1234567' },
    });
    expect(getByTestId('login-submit-btn')).toBeEnabled();
  });
});

describe('testando submit', () => {
  test('Após a submissão, 2 tokens devem ser salvos em localStorage identificados pelas chaves mealsToken e cocktailsToken (o token de teste é sempre "1").', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(getByTestId('login-submit-btn')).toBeDefined();
    expect(getByTestId('login-submit-btn')).toBeDisabled();
    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'teste@teste.com' },
    });
    fireEvent.change(getByTestId('password-input'), {
      target: { value: '1234567' },
    });
    expect(localStorage.getItem('mealsToken')).toBe(null);
    expect(localStorage.getItem('cocktailsToken')).toBe(null);
    expect(getByTestId('login-submit-btn')).toBeEnabled();
    fireEvent.click(getByTestId('login-submit-btn'));
    expect(localStorage.__STORE__['mealsToken']).toBe('1');
    expect(localStorage.__STORE__['cocktailsToken']).toBe('1');
  });
  test('Após a submissão, o e-mail de pessoa usuária deve ser salvo em localStorage na chave user no formato { email: email-da-pessoa }', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(getByTestId('login-submit-btn')).toBeDefined();
    expect(getByTestId('login-submit-btn')).toBeDisabled();
    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'teste@teste.com' },
    });
    fireEvent.change(getByTestId('password-input'), {
      target: { value: '1234567' },
    });
    expect(getByTestId('login-submit-btn')).toBeEnabled();
    fireEvent.click(getByTestId('login-submit-btn'));
    expect(localStorage.__STORE__['user']).toStrictEqual({
      email: 'teste@teste.com',
    });
  });
  test('Após a submissão e validação com sucesso do login, o usuário deve ser redirecionado para a tela principal de receitas de comidas.', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(getByTestId('login-submit-btn')).toBeDefined();
    expect(getByTestId('login-submit-btn')).toBeDisabled();
    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'teste@teste.com' },
    });
    fireEvent.change(getByTestId('password-input'), {
      target: { value: '1234567' },
    });
    expect(getByTestId('login-submit-btn')).toBeEnabled();
    fireEvent.click(getByTestId('login-submit-btn'));
    expect(getByTestId(location.pathname)).toBe('/comidas')
  });
});
