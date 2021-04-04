import React, { useState } from 'react'
import Character from './components/characters/Character'
import data from "./sample.json"
import './App.css'

function App() {
  return (
    <div className="App">
      <Character {...data[0]} />
    </div>
  )
}

export default App
