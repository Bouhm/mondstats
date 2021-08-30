import './CharacterTile.css';

import _ from 'lodash';
import React, { ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';

import { getCharacterFileName, getShortName } from '../../scripts/util';
import { useAppSelector } from '../hooks/useRedux';
import LLImage from '../ui/LLImage';

export type CharacterTileProps = {
  id: string,
  labeled?: boolean,
  clickable?: boolean,
  onClick?: (char: string) => void
}

function CharacterTile({ id, labeled = true, onClick, clickable = true }: CharacterTileProps) {
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const character = characterDb[id]

  if (!character) return null;

  let classes = "character-tile";
  classes += ` rarity-${character.rarity}`;

  const handleClick = (char: string) => {
    onClick && onClick(char);
  }

  return (
    <div className={`character-tile-container ${clickable ? 'asClickable' : ''}`} onClick={() => handleClick(getShortName(character))}>
      <div className={classes}>
        <div className="character-image">
          <LLImage className="character-portrait" src={`/assets/characters/${getCharacterFileName(character)}.webp`} alt={`${character.name}-portrait`} />
          <LLImage className="element-icon" src={`/assets/elements/${character.element}.webp`} alt={character.element} />
        </div>
        {labeled && <div className="character-tile-name">
          {character.name}
        </div>}
      </div>
    </div>
  )
}

export default CharacterTile