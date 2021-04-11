import React, { useState } from 'react'
import characterDb from '../data/characters.json'
import _ from 'lodash'
import './Character.css'

type CharacterProps = {
  id: number,
  artifacts: any[],
  weapons: any[]
}

function CharacterTile({ id }: CharacterProps) {
  const character = _.find(characterDb, { id })
  console.log(character);

  if (!character) return null;

  return (
    <div className="character-tile">
      <img src="" alt={`${character.name}-portrait`}></img>
    </div>
  )
}

export default CharacterTile
