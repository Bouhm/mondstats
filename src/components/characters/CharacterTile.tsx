import './CharacterTile.css';

import _ from 'lodash';
import React, { ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import { getCharacterFileName, getShortName } from '../../scripts/util';

export type CharacterTileProps = {
  id: string,
  labeled?: boolean,
  onClick?: (char: string) => void
}

function CharacterTile({ id, labeled = true, onClick }: CharacterTileProps) {
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const character = characterDb[id]

  if (!character) return null;

  let classes = "character-tile";
  classes += ` rarity-${character.rarity}`;

  const charName = character.name === "Traveler" ? getShortName(`${character.name}-${character.element}`) : getShortName(character.name);

  const handleClick = (char: string) => {
    onClick && onClick(char);
  }

  return (
    <div className={`character-tile-container`} onClick={() => handleClick(charName)}>
      <div className={classes}>
        <div className="character-image">
          <img className="character-portrait" src={`/assets/characters/${getCharacterFileName(character)}.webp`} alt={`${character.name}-portrait`}></img>
          <img className="element-icon" src={`/assets/elements/${character.element}.webp`} alt={character.element}></img>
        </div>
        {labeled && <div className="character-tile-name">
          {character.name}
        </div>}
      </div>
    </div>
  )
}

export default CharacterTile