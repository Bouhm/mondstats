import React, { useState } from 'react'
import _ from "lodash"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import CharacterPage from './components/characters/CharacterPage'
import CharacterSearch from './components/CharacterSearch';
import Navbar from './components/navbar/Navbar';

import './App.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/" component={CharacterSearch} />
          <Route path="/characters/:characterName" component={CharacterPage} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
