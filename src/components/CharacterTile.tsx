import './CharacterTile.css';

import _ from 'lodash';
import React, { ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';

import { ElementIcons } from '../data/constants';
import { getShortName } from '../scripts/util';
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
  const charName = character.name === "Traveler" ? getShortName(`${character.name}-${character.element}`) : getShortName(character.name);

  return (
    <Link to={`/builds/${charName}`}>
      <div className="character-tile-container">
        <div className={classes}>
          <img src={`/assets/characters/${character.id}.png`} alt={`${character.name}-portrait`}></img>
          {charElement && <img className="element-icon" src={ElementIcons[character.element]} alt={character.element}></img>}
          <div className="character-tile-name">
            {character.name}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CharacterTile
