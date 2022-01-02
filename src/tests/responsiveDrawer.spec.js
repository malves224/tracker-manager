import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { render } from "@testing-library/react";
import * as mockRequests from "../mockRequests/mockAPI";
import userEvent from "@testing-library/user-event";
import { ResponsiveDrawer } from "../components/";
import { renderWithRouterAndStore } from "./helpers/renderWithRouterAndStore";
import App from "../App";

const initialStateStore = { user: {
    email: '',
    id: '1',
    login: 'malves224@gmail.com',
    fullName: 'matheus alves',
    contato: '1195666665',
    cargo: 'administrador',
    perfil: 'admin',
    idPerfil: '1',
    perfilData: {
      id: '1',
      name: 'admin',
      permissions: [
        {
          page: 'Home',
          write: true,
          editing: true,
          'delete': true
        },
        {
          page: 'NewClient',
          write: true
        },
        {
          page: 'ListClients',
          write: true,
          editing: true,
          'delete': true
        },
        {
          page: 'ListVehicles',
          write: true,
          editing: true,
          'delete': true
        },
        {
          page: 'NewVehicle',
          write: true,
          editing: true,
          'delete': true
        },
        {
          page: 'NewAgendamento',
          write: true
        },
        {
          page: 'ListAgendamentos',
          write: true,
          editing: true,
          'delete': true
        },
        {
          page: 'UsersControl',
          write: true,
          editing: true,
          'delete': true
        },
        {
          page: 'Financeiro',
          write: true,
          editing: true,
          'delete': true
        },
        {
          page: 'Estoque',
          hasSubItem: false,
          write: true,
          editing: true,
          'delete': true
        }
      ]
    },
    token: '',
    config: {
      mode: 'dark'
    }
}};

const itemsMenuMock = [
  {
    name: "Pagina inicial",
    subItemsDropdown: [],
    route: "Home",
  },
  {
    name: "Clientes",
    subItemsDropdown: [
      {name: "Novo cliente", route: "NewClient", }, 
      {name: "Clientes", route: "ListClients"}
    ],
  },
  {
    name: "Veiculos",
    subItemsDropdown: [
      {name:"Novo veiculo", route: "NewVehicle"},
      {name: "Listar Veiculos", route : "ListVehicles"} 
    ],
  },
  {
    name: "Agendamentos",
    subItemsDropdown: [
      {name: "Novo Agendamento", route: "NewAgendamento"}, 
      {name: "Listar Agendamentos", route: "ListAgendamentos"}
    ],
  },
  {
    name: "Administração",
    subItemsDropdown: [
      {name: "Usuarios", route: "UsersControl"},
      {name: "Financeiro", route: "Financeiro"}
    ],
  },
  {
    name: "Estoque",
    subItemsDropdown: [],
    route: "Estoque"
  }
]

const mock = jest.spyOn(mockRequests, 'getItemsNav').mockImplementation(() => Promise.resolve(itemsMenuMock));

describe('Testes para o componente responsiveDrawer, que é o menu lateral de navegação', () => {
  test('should ',async () => {
    renderWithRouterAndStore(<App />, "/", initialStateStore);
    await waitFor(() => expect(mock).toHaveBeenCalledTimes(1))
  });
});
