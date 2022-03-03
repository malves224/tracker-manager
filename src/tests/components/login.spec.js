import React from "react";
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from "../../App";
import * as mockRequests from "../../mockRequests/mockAPI";
import { renderWithRouterAndStore } from "../helpers/renderWithRouterAndStore";

const PASSWORD_VALID = '12345678';
const EMAIL_VALID = 'valido@host.com';
const mockResponseAuth = {
  "id": "1",
  "login": "malves224@gmail.com",
  "fullName": "matheus alves",
  "contato": "1195666665",
  "cargo": "administrador",
  "perfil": "admin",
  "idPerfil": "1",
  "config": {
    "mode": "dark"
  },
  "perfilData": {
    "id": "1",
    "name": "admin",
    "permissions": [
      {
        "page": "Home",
        "write": true,
        "editing": true,
        "delete": true
      },
      {
        "page": "NewClient",
        "write": true
      },
      {
        "page": "ListClients",
        "write": true,
        "editing": true,
        "delete": true
      },
      {
        "page": "ListVehicles",
        "write": true,
        "editing": true,
        "delete": true
      },
      {
        "page": "NewVehicle",
        "write": true,
        "editing": true,
        "delete": true
      },
      {
        "page": "NewAgendamento",
        "write": true
      },
      {
        "page": "ListAgendamentos",
        "write": true,
        "editing": true,
        "delete": true
      },
      {
        "page": "UsersControl",
        "write": true,
        "editing": true,
        "delete": true
      },
      {
        "page": "Financeiro",
        "write": true,
        "editing": true,
        "delete": true
      },
      {
        "page": "Estoque",
        "hasSubItem": false,
        "write": true,
        "editing": true,
        "delete": true
      }
    ]
  },
  "token": ""
}

describe('Testas para tela de login', () => {
  it('O botão de "Acessar" deve está desabilitado ao entrar na página', () => {
    renderWithRouterAndStore(<App />, "/");
    const button = screen.getByText(/acessar/i);
    expect(button).toBeDisabled();
  });
  it('O botão de "Acessar" deve estar desabilitado quando um email inválido é digitado', () => {
    renderWithRouterAndStore(<App />, "/");
    const button = screen.getByText(/acessar/i);
    const inputEmail = screen.getByLabelText(/e-mail/i);
    const inputPassword = screen.getByLabelText(/senha/i);

    userEvent.type(inputEmail, 'emailInvalido');
    userEvent.type(inputPassword, PASSWORD_VALID);
    expect(button).toBeDisabled();
    
    userEvent.type(inputEmail, 'emailInvalido@');
    userEvent.type(inputPassword, PASSWORD_VALID);
    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'emailInvalido@email.');
    userEvent.type(inputPassword, PASSWORD_VALID);
    expect(button).toBeDisabled();
  });
  it('O botão de "Acessar" deve estar desabilitado ao digitar uma senha inválida',() => {
    renderWithRouterAndStore(<App />, "/");
    const button = screen.getByText(/acessar/i);
    const inputEmail = screen.getByLabelText(/e-mail/i);
    const inputPassword = screen.getByLabelText(/senha/i);

    userEvent.type(inputEmail, EMAIL_VALID);
    userEvent.type(inputPassword, '123456');
    expect(button).toBeDisabled();

  });
  it('Ao logar com email e senha incorreto um alerta é renderizado na tela,e o campo password deve estar vazio',async () => {
    renderWithRouterAndStore(<App />, "/");
    const button = screen.getByText(/acessar/i);
    const inputEmail = screen.getByLabelText(/e-mail/i);
    const inputPassword = screen.getByLabelText(/senha/i);
    userEvent.type(inputEmail, EMAIL_VALID);
    userEvent.type(inputPassword, PASSWORD_VALID);
    userEvent.click(button);

    expect(button).toHaveTextContent("Aguarde");
    const alert = await screen.findByText("Usuario ou senha inválido!");
    expect(alert).toBeInTheDocument();

    const buttonClose = screen.getByLabelText("close");
    userEvent.click(buttonClose);
  });
  it('O botão "acessar" deve estar habilitado quando digitar um email e senha válidos', () => {
    renderWithRouterAndStore(<App />, "/");
    const button = screen.getByText(/acessar/i);
    const inputEmail = screen.getByLabelText(/e-mail/i);
    const inputPassword = screen.getByLabelText(/senha/i);

    userEvent.type(inputEmail, EMAIL_VALID);
    userEvent.type(inputPassword, PASSWORD_VALID);
    expect(button).toBeEnabled();
  });

  const mockFuncAuth = jest.spyOn(mockRequests, 'authenticationLogin')
    .mockImplementation(() => Promise.resolve(mockResponseAuth));

  it('Quando o email e senha estão corretos deve se renderizar para rota "/Home"',async () => {
    const { history } = renderWithRouterAndStore(<App />, "/");
    const button = screen.getByText(/acessar/i);
    const inputEmail = screen.getByLabelText(/e-mail/i);
    const inputPassword = screen.getByLabelText(/senha/i);

    userEvent.type(inputEmail, "malves224@gmail.com");
    userEvent.type(inputPassword, "123456789");
    userEvent.click(button);
    await waitFor(() => expect(mockFuncAuth).toHaveBeenCalledTimes(1));
  });
});
