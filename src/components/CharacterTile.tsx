import React, { useState } from 'react'
import _ from 'lodash'

import characterDb from '../data/characters.json'
import { ElementIcons } from '../data/constants'

import './CharacterTile.css'

type CharacterTileProps = {
  id: number
}

function CharacterTile({ id }: CharacterTileProps) {
  const character = _.find(characterDb, { id })
  console.log(character);

  if (!character) return null;

  let classes = "character-tile";
  classes += ` rarity-${character.rarity}`;

  const charElement = ElementIcons[character.element];

  return (
    <div className={classes}>
      <img src={character.icon} alt={`${character.name}-portrait`}></img>
      {charElement && <img className="element-icon" src={ElementIcons[character.element]} alt={character.element}></img>}
    </div>
  )
}

export default CharacterTile
