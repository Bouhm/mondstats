import React, { useState } from 'react'
import _ from "lodash"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import CharacterBuilds from './components/characters/CharacterBuilds'
import CharacterSearch from './components/CharacterSearch';

import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={CharacterSearch} />
          <Route path="/characters/:characterName" component={CharacterBuilds} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
