import React, { useState, useContext, useEffect } from 'react'
import _ from "lodash"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import artifactDb from './data/artifacts.json'
import characterDb from './data/characters.json'
import weaponDb from './data/weapons.json'
import CharacterPage from './components/characters/CharacterPage'
import CharacterSearch from './components/CharacterSearch';
import Navbar from './components/navbar/Navbar'
import { Store } from "./Store"

import './App.css'

function App() {
  const [, dispatch] = useContext(Store)

  useEffect(() => {
    dispatch({ type: "SET_ARTIFACT_DB", payload: artifactDb })
    dispatch({ type: "SET_WEAPON_DB", payload: weaponDb })
    dispatch({ type: "SET_CHARACTER_DB", payload: characterDb })
  }, [dispatch])

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
