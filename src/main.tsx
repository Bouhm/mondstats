import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import App from './App';
import AbyssPage from './components/abyss/AbyssPage';
import ArtifactSetIndex from './components/artifact-sets/ArtifactSetIndex';
import ArtifactSetPage from './components/artifact-sets/ArtifactSetPage';
import CharacterPage from './components/characters/builds/CharacterPage';
import CharacterIndex from './components/characters/CharacterIndex';
import Home from './components/Home';
import About from './components/pages/About';
import Changelog from './components/pages/Changelog';
import WIP from './components/pages/WIP';
import ScrollToTop from './components/ScrollToTop';
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
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App/>}>
            <Route path="about" element={<About/>} />
            <Route path="changelog" element={<Changelog/>} />
            <Route path="abyss" element={<AbyssPage/>} />
            <Route path="characters/:shortName" element={<CharacterPage/>} />
            <Route path="characters" element={<CharacterIndex/>} />
            {/* <Route path="artifacts/:shortName" element={<ArtifactSetPage/>} />
            <Route path="artifacts" element={<ArtifactSetIndex/>} />
            <Route path="weapons/:shortName" element={<WeaponPage/>} />
            <Route path="weapons" element={<WeaponIndex/>} /> */}
            <Route path="artifacts/:shortName" element={<WIP />} />
            <Route path="artifacts" element={<WIP />} />
            <Route path="weapons/:shortName" element={<WIP />} />
            <Route path="weapons" element={<WIP />} />
            <Route path="charts" element={<WIP />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
