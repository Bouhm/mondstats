import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import App from './App';
import AbyssPage from './components/abyss/AbyssPage';
import ArtifactSetIndex from './components/artifactSets/ArtifactSetIndex';
import ArtifactSetPage from './components/artifactSets/ArtifactSetPage';
import CharacterIndex from './components/characters/CharacterIndex';
import CharacterPage from './components/characters/CharacterPage';
import RouteAdapter from './components/controls/RouteAdapter';
import Home from './components/Home';
import About from './components/pages/About';
import Changelog from './components/pages/Changelog';
import ScrollToTop from './components/ScrollToTop';
import ChartsPage from './components/stats/ChartsPage';
import WeaponIndex from './components/weapons/WeaponIndex';
import WeaponPage from './components/weapons/WeaponPage';
import store from './Store';

// const client = new ApolloClient({
//   uri: 'https://mondstats-server.herokuapp.com/graphql',
//   cache: new InMemoryCache(({
//     addTypename: false
//   })),
// });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
          <ScrollToTop />
          <App />
        </QueryParamProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
