import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import App from './App';
import ScrollToTop from './components/ScrollToTop';
import store from './Store';

// const client = new ApolloClient({
//   uri: 'https://favonius-server.herokuapp.com/graphql',
//   cache: new InMemoryCache(({
//     addTypename: false
//   })),
// });

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <Provider store={store}>
          <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
