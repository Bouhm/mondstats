import './CharacterTile.scss';

import _, { map } from 'lodash';
import React, { ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';

import { getCharacterFileName, getShortName } from '../../scripts/util';
import { useAppSelector } from '../hooks/useRedux';
import LLImage from '../ui/LLImage';

export type CharacterTileProps = {
  id: string,
  labeled?: boolean,
  clickable?: boolean,
  onClick?: (char: string) => void,
  build?: any
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
    <div className={`character-tile ${clickable ? 'asClickable' : ''}`} onClick={() => handleClick(getShortName(character))}>
      <div className={classes}>
        <div className="character-image">
          <LLImage className="character-portrait" src={`/assets/characters/${character._id}.webp`} alt={`${character.name}-portrait`} />
          <LLImage className="element-icon" src={`/assets/elements/${character.element}.webp`} alt={character.element} />
        </div>
        {labeled && <div className="character-tile-name">
          {character.name}
        </div>}
      </div>
      {/* {build &&
        <div className="character-tile-build">
          {map(artifactSetBuildDb[build.artifactSetBuildId].sets, ({ _id }) => (
            <LLImage key={_id} src={`/assets/artifacts/${_id}.webp`} />
          ))}
          <LLImage src={`/assets/weapons/${build.weaponId}.webp`} />
        </div>
      } */}
    </div>
  )
}

export default CharacterTile