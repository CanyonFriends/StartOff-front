import GlobalStyle from '../src/common/GlobalStyle';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from '../src/redux/store';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <Story />
        <GlobalStyle />
      </MemoryRouter>
    </Provider>
  ),
];
