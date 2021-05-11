import React, { useState, useContext, useEffect } from 'react'
import _ from "lodash"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import data from "./sample.json"
import artifactDb from './data/artifacts.json'
import characterDb from './data/characters.json'
import weaponDb from './data/weapons.json'
import CharacterPage from './components/CharacterPage'
import CharacterSearch from './components/CharacterSearch';
import Navbar from './components/navbar/Navbar'
import { Store } from "./Store"

import './App.css'
import { getShortName } from './scripts/util';

function App() {
  const [, dispatch] = useContext(Store)

  useEffect(() => {
    console.log("App use effect")
    let charIdMap: { [shortname: string]: string } = {}
    _.forEach(_.values(characterDb), char => {
      charIdMap[getShortName(char.name)] = char.id + '';
    });

    dispatch({ type: "SET_CHARACTER_BUILDS", payload: data })
    dispatch({ type: "SET_ARTIFACT_DB", payload: artifactDb })
    dispatch({ type: "SET_WEAPON_DB", payload: weaponDb })
    dispatch({ type: "SET_CHARACTER_DB", payload: characterDb })
    dispatch({ type: 'SET_CHARACTER_ID_MAP', payload: charIdMap })
  }, [characterDb, artifactDb, weaponDb, data, getShortName, dispatch])

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={CharacterSearch} />
          <Route path="/builds/:shortName" component={CharacterPage} />
          <Redirect exact path="/builds" to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
