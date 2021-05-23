import './CharacterTile.css';

import _ from 'lodash';
import React, { ReactNode, useContext } from 'react';

import { ElementIcons } from '../data/constants';
import { Store } from '../Store';

export type CharacterTileProps = {
  id: string
}

function CharacterTile({ id }: CharacterTileProps) {
  const [{ characterDb },] = useContext(Store)
  const character = characterDb[id]

  if (!character) return null;

  let classes = "character-tile";
  classes += ` rarity-${character.rarity}`;

  const charElement = ElementIcons[character.element];
  // const iconUrl = character.name === "Traveler" ? TravelerIcon : character.icon;

  return (
    <div className="character-tile-container">
      <div className={classes}>
        <img src={character.icon} alt={`${character.name}-portrait`}></img>
        {charElement && <img className="element-icon" src={ElementIcons[character.element]} alt={character.element}></img>}
        <div className="character-tile-name">
          {character.name}
        </div>
      </div>
    </div>
  )
}

export default CharacterTile
