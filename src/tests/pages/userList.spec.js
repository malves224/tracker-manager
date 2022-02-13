import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import { getUsersList } from '../../mockRequests/mockAPI';
import { UsersList } from '../../pages';
import { act } from 'react-dom/test-utils';

jest.mock('../../mockRequests/mockAPI');

const mockDataUsers = [
  {
    "id": 1,
    "status": "ativo",
    "login": "malves224@gmail.com",
    "password": "123456789",
    "fullName": "matheus alves",
    "contato": "1195666665",
    "cargo": "administrador",
    "perfil": "admin",
    "idPerfil": 1,
    "config": {
      "mode": "dark"
    }
  },
  {
    "id": 2,
    "status": "ativo",
    "login": "malves224@sgmail.com",
    "password": "123456789",
    "fullName": "theus alves",
    "contato": "1195666665",
    "cargo": "administrador",
    "perfil": "admin",
    "idPerfil": 1,
    "config": {
      "mode": "dark"
    }
  },
  {
    "id": 3,
    "status": "ativo",
    "login": "irineu@sgmail.com",
    "password": "123456789",
    "fullName": "irineu alves",
    "contato": "11956666ds",
    "cargo": "administrador",
    "perfil": "admin",
    "idPerfil": 1,
    "config": {
      "mode": "dark"
    }
  },
]


describe('Ao renderizar o componente UsersList', () => {

  beforeEach(async() => {
    await getUsersList.mockImplementation(() => mockDataUsers);
  })

  describe('Ao pesquisar um termo',() => {
    test('Deve retornar o usuario pesquisado, considerando todas colunas.',async () => {
      await act(async () => {renderWithRouter(<UsersList />) }); // caso o teste precise maniupular estado é preciso utilizar o act.
      expect(getUsersList).toBeCalled();

      const inputSearch = screen.getByPlaceholderText(/pesquise.../i);
      userEvent.type(inputSearch, 'irineu@sgmail.com');
      
      await waitFor(() => {
        expect(screen.getByText('irineu@sgmail.com')).toBeInTheDocument();
        expect(screen.getByText('irineu alves')).toBeInTheDocument();
      });
      const rowsSearchCurrentNoColumn = screen.getAllByRole('row').slice(1);
      expect(rowsSearchCurrentNoColumn).toHaveLength(1);
      userEvent.clear(inputSearch);

      userEvent.type(inputSearch, 'admin');
      const rowsExcludeRowOfColumn = screen.getAllByRole('row').slice(1);
      expect(rowsExcludeRowOfColumn).toHaveLength(3);
    });
  });

  describe('Ao clicar no botão "novo usuario"', () => {
    test('deve ser redirecionado para rota "/NewUser"',async () => {
      let history;
      await act(async () => {
        const { history: historyFromRender } = renderWithRouter(<UsersList />);
        history = historyFromRender;
      });
      const novoUsuarioButton = screen.getByRole('button', {name: /novo usuário/i});
      userEvent.click(novoUsuarioButton);
      expect(history.location.pathname).toBe('/NewUser');
    });
   });

  describe('Ao clicar em um dos usuarios da list', () => {
    test('Deve redirecionar para rota "/UserInfo/:idUser"',async () => {
      let history;
      await act(async () => {
        const { history: historyFromRender } = renderWithRouter(<UsersList />);
        history = historyFromRender;
      });
      const rowsSearchCurrentNoColumn = screen.getAllByRole('row').slice(1);
      userEvent.click(rowsSearchCurrentNoColumn[0]);
      expect(history.location.pathname).toBe('/UserInfo/1');
     });
   });

});