import React from "react";
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndStore } from "../helpers/renderWithRouterAndStore";
import userEvent from '@testing-library/user-event';
import { getPerfilList, createUser } from "../../mockRequests/mockAPI";
import FormNewUser from "../../components/forms/FormNewUser";
import { act } from "react-dom/test-utils";

jest.mock('../../mockRequests/mockAPI');


const mockUser = [
  {id: 1, name: "admin"}, 
  {id: 2, name: "vendedor"}
]

const dadosValidosUsuario = {
  nome: 'ana carolina',
  cargo: 'operador de cobrança',
  email: 'ana@yahoo.com',
  contato: '11912349876',
  perfilAcesso: 'vendedor',
  idPerfil: 2,
  senha: '12345678'
}

describe('Ao renderizar o "FormNewUser"', () => {
  test('O botão deve estar desabilitado', () => {
    renderWithRouterAndStore(<FormNewUser />);
    const button = screen.getByText(/cadastrar/i);
    expect(button).toBeDisabled();

  });
  test('Todos os campos devem estar limpo, e sem nenhum erro de validação', () => {
    renderWithRouterAndStore(<FormNewUser />);
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
      renderWithRouterAndStore(<FormNewUser />);
      const nomeInput = screen.getByLabelText(/nome/i);
      userEvent.type(nomeInput, 'Ana');

      expect(screen.getByText(/Insira o nome completo/i)).toBeInTheDocument();

    });
    test(`Cargo invalido, Input deve estar com a menssagem 'Insira o cargo ex: aux. administrativo'.`, () => {
      renderWithRouterAndStore(<FormNewUser />);
      const cargoInput = screen.getByLabelText(/cargo/i);
      userEvent.type(cargoInput, 'bb');

      expect(screen.getByText(/Insira o cargo ex: aux. administrativo/i)).toBeInTheDocument();

    });
    test(`Email invalido, Input deve estar com a menssagem 'Insira um email valido ex: lucas@gmail.com'.`, () => {
      renderWithRouterAndStore(<FormNewUser />);
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
      renderWithRouterAndStore(<FormNewUser />);
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
     renderWithRouterAndStore(<FormNewUser />);
     const senhaInput = screen.getByLabelText(/senha/i);

     userEvent.type(senhaInput, '1234567');
     expect(screen.getByText('Insira uma senha com ao menos 8 digitos'))
      .toBeInTheDocument();
    });
});

describe('Ao digitar a senha sem preencher o campo de perfil de acesso', () => {
  test('Deve estar com a menssagem "insira um perfil de acesso"', () => {
    renderWithRouterAndStore(<FormNewUser />);
    const senhaInput = screen.getByLabelText(/senha/i);
    const perfilSelect = screen.getByLabelText(/perfil de acesso/i);
    
    userEvent.type(senhaInput, '12345678');
    userEvent.click(perfilSelect);
    expect(screen.getByText('Insira um perfil de acesso'))
      .toBeInTheDocument();
  });
  
})

describe(`Ao preencher nome, Email, Telefone, Perfil de 
  acesso e Senha validos,`,() => {

  beforeEach(async () => {
    await getPerfilList.mockImplementation(() => mockUser);
  });

  test(`O botão "cadastrar" deve estar habilitado, 
    somente se todos campos estiver preenchido corretamente`,async () => {
      await act(async () => { renderWithRouterAndStore(<FormNewUser />)});
      expect(getPerfilList).toBeCalled();
      const nomeInput = screen.getByLabelText(/nome/i);
      const cargoInput = screen.getByLabelText(/cargo/i);
      const emailInput = screen.getByLabelText(/email/i);
      const contatoInput = screen.getByLabelText(/telefone celular/i);
      const inputSelect = screen.getByLabelText(/perfil de acesso/i);
      const senhaInput = screen.getByLabelText(/senha/i); 
      const button = screen.getByRole('button', {name: /cadastrar/i });
      userEvent.type(nomeInput, dadosValidosUsuario.nome);
      userEvent.type(cargoInput, dadosValidosUsuario.cargo);
      userEvent.type(emailInput, dadosValidosUsuario.email);      
      userEvent.type(contatoInput, dadosValidosUsuario.contato);
      userEvent.click(inputSelect);

      const option = await screen.findByText(/vendedor/i);
      userEvent.click(option);
      userEvent.type(senhaInput, dadosValidosUsuario.senha);
      expect(button).not.toBeDisabled();
  });
});

describe('Ao preencher os dados validos, e clicar em cadastrar', () => {
  
  beforeEach(async () => {
    await getPerfilList.mockImplementation(() => mockUser);

  });

  test('Em caso de sucesso deve fazer request para cadastrar usuario, e limpar os campos', async () => {
    await createUser.mockImplementation(() => Promise.resolve({message: "Usuario criado com sucesso"}));

    await act(async () => { renderWithRouterAndStore(<FormNewUser />)});

    const nomeInput = screen.getByLabelText(/nome/i);
    const cargoInput = screen.getByLabelText(/cargo/i);
    const emailInput = screen.getByLabelText(/email/i);
    const contatoInput = screen.getByLabelText(/telefone celular/i);
    const inputSelect = screen.getByLabelText(/perfil de acesso/i);
    const senhaInput = screen.getByLabelText(/senha/i); 
    const button = screen.getByRole('button', {name: /cadastrar/i });

    userEvent.type(nomeInput, dadosValidosUsuario.nome);
    userEvent.type(cargoInput, dadosValidosUsuario.cargo);
    userEvent.type(emailInput, dadosValidosUsuario.email);      
    userEvent.type(contatoInput, dadosValidosUsuario.contato);
    userEvent.click(inputSelect);

    const option = await screen.findByText(/vendedor/i);
    userEvent.click(option);
    userEvent.type(senhaInput, dadosValidosUsuario.senha);
    userEvent.click(button);

    expect(createUser).toBeCalledWith(dadosValidosUsuario, 'posiveltokendsadksa');
    await waitFor(() => {
      expect(nomeInput).toHaveAttribute("value", "");
      expect(cargoInput).toHaveAttribute("value", "");
      expect(emailInput).toHaveAttribute("value", "");
      expect(contatoInput).toHaveAttribute("value", "");
      expect(senhaInput).toHaveAttribute("value", "");
    })

   });
 });
