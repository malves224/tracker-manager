import React from "react";
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from "../../App";
import FormNewUser from "../../components/forms/FormNewUser";

describe('Ao renderizar o "FormNewUser"', () => {
  test('O botão deve estar desabilitado', () => {
    render(<FormNewUser />);
  });
  test('Todos os campos devem estar limpo, e sem nenhum erro de validação')
    render(<FormNewUser />);

});

describe('Ao digitar nome, Email, Telefone e Senha invalidos,', () => {
  test(`Nome invalido, Input deve estar vermelho 
    com a menssagem 'Insira um nome valido'.`, () => {
      render(<FormNewUser />);
      // implementação da verificação
    });
    test(`Email invalido, Input deve estar vermelho 
    com a menssagem 'Insira um nome valido'.`, () => {
      render(<FormNewUser />);
      // implementação da verificação
    });
    test(`Telefone celular invalido, Input deve estar vermelho 
    com a menssagem 'Insira um nome valido'.`, () => {
      render(<FormNewUser />);
      // implementação da verificação
    });
    test(`Senha invalido, Input deve estar vermelho 
    com a menssagem 'Insira um nome valido'.`, () => {
      render(<FormNewUser />);
      // implementação da verificação
    });
});

describe(`Ao preencher nome, Email, Telefone, Perfil de 
  acesso e Senha validos,`, () => {
    test(`O botão "cadastrar" deve estar habilitado, 
      somente se todos campos estiver preenchido`, () => {
        render(<FormNewUser />);
        // testes
      });
});


