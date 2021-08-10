import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import App from './App';
import GlobalStyle from './common/GlobalStyle';
import { SERVER_URL } from './config';

axios.defaults.baseURL = `${SERVER_URL}/api`;

ReactDOM.render(
  <BrowserRouter>
    <GlobalStyle />
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
