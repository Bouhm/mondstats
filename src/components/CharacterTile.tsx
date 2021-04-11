import React, { useState } from 'react'
import _ from 'lodash'

import characterDb from '../data/characters.json'
import './CharacterTile.css'

type CharacterTileProps = {
  id: number
}

function CharacterTile({ id }: CharacterTileProps) {
  const character = _.find(characterDb, { id })
  console.log(character);

  if (!character) return null;

  return (
    <div className="character-tile">
      <img src={character.icon} alt={`${character.name}-portrait`}></img>
    </div>
  )
}

export default CharacterTile
