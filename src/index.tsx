import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';

import App from './App';
import GlobalStyle from './common/GlobalStyle';
import { SERVER_URL } from './config';
import store from './redux/store';

axios.defaults.baseURL = `${SERVER_URL}/api`;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
