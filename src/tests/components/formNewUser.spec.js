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
  test(`Nome invalido, Input deve estar com a menssagem 'Insira o nome completo'.`, () => {
      render(<FormNewUser />);
      const nomeInput = screen.getByLabelText(/nome/i);
      userEvent.type(nomeInput, 'Ana');

      expect(screen.getByText(/Insira o nome completo/i)).toBeInTheDocument();

    });
    test(`Email invalido, Input deve estar com a menssagem 'Insira um email valido ex: lucas@gmail.com'.`, () => {
      render(<FormNewUser />);
      const emailInput = screen.getByLabelText(/email/i);

      userEvent.type(emailInput, 'ana');
      expect(screen.getByText(/Insira um email valido ex: lucas@gmail.com/i))
        .toBeInTheDocument();

      userEvent.type(emailInput, '@gmail');
      expect(screen.getByText(/Insira um email valido ex: lucas@gmail.com/i))
        .toBeInTheDocument();

    });
    test(`Telefone celular invalido, Input deve estar com a menssagem 
    'Insira um contato valido ex: 11921497099'.`, () => {
      render(<FormNewUser />);
      const contatoInput = screen.getByLabelText(/telefone celular/i);
      
      userEvent.type(contatoInput, '90912344321')
      expect(screen.getByText(/Insira um contato valido ex: 11921497099/i))
      .toBeInTheDocument();
      userEvent.clear(contatoInput);

      userEvent.type(contatoInput, '11912345');
      expect(screen.getByText(/Insira um contato valido ex: 11921497099/i))
      .toBeInTheDocument();
    });
    test(`Senha invalido, Input deve estar com a menssagem 
    'Insira uma senha com ao menos 8 digitos'.`, () => {
     render(<FormNewUser />);
     const senhaInput = screen.getByLabelText(/senha/i);

     userEvent.type(senhaInput, '1234567');
     expect(screen.getByText('Insira uma senha com ao menos 8 digitos'))
      .toBeInTheDocument();
    });
});

describe('Ao digitar a senha sem preencher o campo de perfil de acesso', () => {
  test('Deve estar com a menssagem "insira um perfil de acesso"', () => {
    render(<FormNewUser />);
    const senhaInput = screen.getByLabelText(/senha/i);
    const perfilSelect = screen.getByLabelText(/perfil de acesso/i);
    
    userEvent.type(senhaInput, '12345678');
    userEvent.click(perfilSelect);
    expect(screen.getByText('Insira um perfil de acesso'))
      .toBeInTheDocument();
  });
  
})

// describe.only(`Ao preencher nome, Email, Telefone, Perfil de 
//  acesso e Senha validos,`, () => {
//    const dadosValidosUsuario = {
//      nome: 'ana carolina',
//      email: 'ana@yahoo.com',
//      telefone: '11912349876',
//      perfil: 'vendedor',
//      senha: '12345678'
//    }
//    test(`O botão "cadastrar" deve estar habilitado, 
//      somente se todos campos estiver preenchido corretamente`, () => {
//        render(<FormNewUser />);
//        const nomeInput = screen.getByLabelText(/nome/i);
//        const emailInput = screen.getByLabelText(/email/i);
//        const contatoInput = screen.getByLabelText(/telefone celular/i);
//        const perfilSelect = screen.getByLabelText(/perfil de acesso/i);
//        const senhaInput = screen.getByLabelText(/senha/i); 
//        const button = screen.getByRole('button', {name: /cadastrar/i });


//        userEvent.type(nomeInput, dadosValidosUsuario.nome);
//        userEvent.type(emailInput, dadosValidosUsuario.email);
//        userEvent.selectOptions

//        userEvent.type(contatoInput, dadosValidosUsuario.telefone);
//        userEvent.click(perfilSelect);
//        userEvent.click(screen.getByText(dadosValidosUsuario.perfil));
//        userEvent.type(senhaInput, dadosValidosUsuario.senha);
//        expect(button).not.toBeDisabled();
//    });
//});


