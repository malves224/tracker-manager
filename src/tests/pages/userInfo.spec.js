import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getUserById, getPerfilList } from '../../mockRequests/mockAPI';
import { renderWithRouterAndStore } from '../helpers/renderWithRouterAndStore';
import { UserInfo } from '../../pages';
import { act } from 'react-dom/test-utils';

jest.mock('../../mockRequests/mockAPI');

const mockPerfilUser = [
  {id: 1, name: "admin"}, 
  {id: 2, name: "vendedor"}
]

const mockUser = {
  "nome": "theus alves",
  "cargo": "administrador",
  "contato": "1195666665",
  "email": "malves224@sgmail.com",
  "idPerfil": 1,
  "perfilAcesso": "admin"
}

describe('Ao renderizar o componente userList', () => {

  beforeEach(async () => {
    await getPerfilList.mockImplementation(() => Promise.resolve(mockPerfilUser));
    await getUserById.mockImplementation(() => Promise.resolve(mockUser));

  });

  describe('Ao clicar no botão de editar', () => {
    test('Deve habilitar os inputs para preencher',async () => {
      await act (async() => {
        renderWithRouterAndStore(<UserInfo />, {route: '/UserInfo/1'});
      });
      expect(getPerfilList).toBeCalled();
      expect(getUserById).toBeCalledWith('1');

      const buttonEdit = screen.getByTestId('EditIcon');
      
      userEvent.click(buttonEdit);  

      const inputNome = screen.getByLabelText(/nome/i);
      const inputCargo = screen.getByLabelText(/cargo/i);
      const inputContato = screen.getByLabelText(/contato/i);
      const inputEmail = screen.getByLabelText(/email/i);
      const selectPerfil = screen.getByLabelText(/perfil de acesso/i);

      expect(inputNome).not.toBeDisabled();
      expect(inputCargo).not.toBeDisabled();
      expect(inputContato).not.toBeDisabled();
      expect(inputEmail).not.toBeDisabled();
      expect(selectPerfil).not.toBeDisabled();
     });
     test('Deve habilitar os botões "salvar" e "cancelar" ',async () => {
      await act (async() => {
        renderWithRouterAndStore(<UserInfo />, {route: '/UserInfo/1'});
      });
      const buttonEdit = screen.getByTestId('EditIcon');
      userEvent.click(buttonEdit);  


      const buttonSave = screen.getByRole('button', {name: /salvar/i});
      const buttonCancel = screen.getByRole('button', {name: /cancelar/i})
      
      expect(buttonSave).not.toBeDisabled();
      expect(buttonCancel).not.toBeDisabled();
     });
     test('O input de senha deve estar vazio',async () => {
      await act (async() => {
        renderWithRouterAndStore(<UserInfo />, {route: '/UserInfo/1'});
      });

      const inputPassword = screen.getByLabelText(/senha/i);
      expect(inputPassword).toBeDisabled();
      expect(inputPassword).toHaveAttribute('value', '');
     });
  });
  describe('Ao editar com dados invalidos', () => {
    test('Deve retornar um helper text para cada input', () => {

    });
    test('O botão "salvar" deve estar desabilitado', () => {

    });
  });
  describe('Ao editar com dados validos', () => {
    test('o botão "salvar" deve estar habilitado', () => {

    });
    test('ao salvar, deve retornar um alerta com a mensagem adequada', () => {

    });
   });
});

