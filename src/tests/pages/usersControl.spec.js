import React from 'react';
import { screen, render } from '@testing-library/react';
import UsersControl from '../../pages/UsersControl';
import UserList from '../../pages/UsersList';
import userEvent from '@testing-library/user-event';


describe('Ao renderizar a tela', () => { 
  test('Deve estar selecionado o subitem de usuarios, e renderizar o componente users list', () => { 
    render(<UsersControl />);
    const userListComponente = screen.getByTestId('users-list');
    expect(userListComponente).toBeInTheDocument();
   })
 })

 describe('Ao clicar em "perfil de acesso" ', () => {
   test('deve renderizar o componente perfil list ', () => {
    render(<UsersControl />);
    const buttonPerfil = screen.getByText(/Perfis de acesso/i);
    userEvent.click(buttonPerfil);
    expect(screen.getByTestId('perfil-list')).toBeInTheDocument();
    });
  });