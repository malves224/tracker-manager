import React from "react";
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Apifuncs from "../../mockRequests/mockAPI";
import App from "../../App";
import FormNewUser from "../../components/forms/FormNewUser";

// é nescesarrio mockar as requisições

describe('Ao renderizar o "FormNewUser"', () => {
  test('O botão deve estar desabilitado', () => {
    render(<FormNewUser />);
    const button = screen.getByText(/cadastrar/i);
    expect(button).toBeDisabled();

  });
  test('Todos os campos devem estar limpo, e sem nenhum erro de validação', () => {
    render(<FormNewUser />);
    const nomeInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const contatoInput = screen.getByLabelText(/telefone celular/i);
    const senhaInput = screen.getByLabelText(/senha/i);

    expect(nomeInput).toHaveAttribute("value", "");
    expect(emailInput).toHaveAttribute("value", "");
    expect(contatoInput).toHaveAttribute("value", "");
    expect(senhaInput).toHaveAttribute("value", "");
  });
});

describe('Ao digitar nome, Email, Telefone e Senha invalidos,', () => {
  test(`Nome invalido, Input deve estar vermelho 
    com a menssagem 'Insira um nome valido'.`, () => {
      // implementação da verificação
    });
    test(`Email invalido, Input deve estar vermelho 
    com a menssagem 'Insira um nome valido'.`, () => {
      // implementação da verificação
    });
    test(`Telefone celular invalido, Input deve estar vermelho 
    com a menssagem 'Insira um nome valido'.`, () => {
      render(<FormNewUser />);
      // implementação da verificação
    });
    test(`Senha invalido, Input deve estar vermelho 
    com a menssagem 'Insira um nome valido'.`, () => {
      // implementação da verificação
    });
});

describe(`Ao preencher nome, Email, Telefone, Perfil de 
  acesso e Senha validos,`, () => {
    test(`O botão "cadastrar" deve estar habilitado, 
      somente se todos campos estiver preenchido`, () => {
        // testes
      });
    test(`Dispara menssagem do perfil de acesso, ao terminar de digitar a senha`, () => {
      // testes
    })
});


