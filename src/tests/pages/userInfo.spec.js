import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import { getUsersList } from '../../mockRequests/mockAPI';
import { UsersList } from '../../pages';
import { act } from 'react-dom/test-utils';

jest.mock('../../mockRequests/mockAPI');


describe('Ao renderizar o componente userList', () => {
  describe('Ao clicar no botão de editar', () => {
    test('Deve habilitar os inputs para preencher', () => {
      // todos os inputs nao pode estar desabilitado
     });
     test('Deve habilitar os botões "salvar" e "cancelar" ', () => {
       // verifica se os botão nao estão desabilitado
     })
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

