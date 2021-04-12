import React, { useState } from 'react'
import _ from "lodash"
import characterDb from './data/characters.json'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Character from './components/characters/Character'
import CharacterTile from './components/CharacterTile'

import data from "./sample.json"
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <div className="character-tiles-container">
          {_.map(_.keys(data), id => {
            return (
              <Link to={`/builds/characters/${_.find(characterDb, { id: parseInt(id) })!.name.toLowerCase().replace(" ", "")}`}>
                <CharacterTile id={parseInt(id)} />
              </Link>
            )
          })}
        </div>
      </div>
    </Router>
  )
}

export default App
