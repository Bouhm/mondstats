import React from 'react';

import { ICharacterData } from '../../data/types';
import LLImage from '../ui/LLImage';
import Tooltip from '../ui/Tooltip';

type CharacterCountProps = {
  character: ICharacterData,
  count: number
}

const CharacterCount = ({character, count}: CharacterCountProps) => {
  if (!character) return null;

  return (
    <Tooltip content={`${character.name}: ${count}`}>
      <LLImage className={`character-stats rarity-${character.rarity}`} src={`/assets/characters/${character._id}}.webp`} alt={character.name} />
    </Tooltip>
  )
}

export default CharacterCount