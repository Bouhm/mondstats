import React from 'react';

import { ICharacterData } from '../../data/types';
import { getCharacterFileName } from '../../scripts/util';
import LLImage from '../ui/LLImage';
import Tooltip from '../ui/Tooltip';

type CharacterCountProps = {
  character: ICharacterData,
  battleCount: number
}

const CharacterCount = ({character, battleCount}: CharacterCountProps) => {
  if (!character) return null;

  return (
    <Tooltip content={`${character.name}: ${battleCount}`}>
      <LLImage className={`character-stats rarity-${character.rarity}`} src={`/assets/characters/${getCharacterFileName(character)}.webp`} alt={character.name} />
    </Tooltip>
  )
}

export default CharacterCount