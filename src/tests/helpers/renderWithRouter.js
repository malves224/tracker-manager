import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => { // função helper para testar routes no RTL
  const history = createMemoryHistory();
  return ({
    ...render(
        <Router history={ history }>{ component }</Router>
    ),
    history,
  });
};
export default renderWithRouter;
