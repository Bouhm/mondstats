import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route, Switch, useLocation } from 'react-router-dom';

import App from './App';
import { StoreProvider } from './Store';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StoreProvider>
          <App />
      </StoreProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
