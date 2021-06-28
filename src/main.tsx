import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import App from './App';
import { StoreProvider } from './Store';

const client = new ApolloClient({
  uri: 'https://favonius-server.herokuapp.com/graphql',
  cache: new InMemoryCache(({
    addTypename: false
  })),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Router>
        <StoreProvider>
          <App />
        </StoreProvider>
      </Router>
    </React.StrictMode>
  </ApolloProvider >,
  document.getElementById('root')
)
