import React, { useContext } from 'react'
import _ from 'lodash'

import { ElementIcons } from '../data/constants'
import TravelerIcon from '../assets/TravelerIcon.png'
import { Store } from '../Store'
import './CharacterTile.css'

export type CharacterTileProps = {
  id: number
}

function CharacterTile({ id }: CharacterTileProps) {
  const [{ characterDb },] = useContext(Store)
  const character = _.find(characterDb, { id })

  if (!character) return null;

  let classes = "character-tile";
  classes += ` rarity-${character.rarity}`;

  const charElement = ElementIcons[character.element];
  const iconUrl = character.name === "Traveler" ? TravelerIcon : character.icon;

  return (
    <div className="character-tile-container">
      <div className={classes}>
        <img src={iconUrl} alt={`${character.name}-portrait`}></img>
        {charElement && <img className="element-icon" src={ElementIcons[character.element]} alt={character.element}></img>}
        <div className="character-tile-name">{character.name}</div>
      </div>
    </div>
  )
}

export default CharacterTile
