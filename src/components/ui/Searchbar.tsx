import React, { useState } from 'react'
import './Searchbar.css'

function Searchbar() {
  return (
    <div className="Searchbar">
        <input list="character-search" name="character-search" />
        <datalist id="character-search">
        </datalist>
    </div>
  )
}

export default Searchbar
