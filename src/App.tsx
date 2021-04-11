import React, { useState } from 'react'
import Character from './components/characters/Character'
import _ from "lodash"
import data from "./sample.json"
import CharacterTile from './components/CharacterTile'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="character-tiles-container">
        {_.map(_.keys(data), id => <CharacterTile id={parseInt(id)} />)}
      </div>
    </div>
  )
}

export default App
