import './PartySelector.css';

import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import { useAppSelector } from '../../hooks';
import CharacterSearch from '../characters/CharacterSearch';
import CharacterTile from '../characters/CharacterTile';
import { Plus } from '../ui/Icons';
import Searchbar from '../ui/Searchbar';

function PartySelector() {
  const characterIdMap = useAppSelector((state) => state.data.characterIdMap)
  const [showCharacterSearch, setShowCharacterSearch] = useState(false);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);

  const handleClickAddCharacter = () => {
    setShowCharacterSearch(true)
  }

  const handleSelect = (char: string) => {
    const characters = [char, ...selectedCharacters]
    setSelectedCharacters(characters);
  }

  return (
    <div className="party-selector">
      {showCharacterSearch &&
        <div className="party-selector-modal">
          <CharacterSearch showAll={false} onSelect={handleSelect} />
        </div>
      }
      {_.map(selectedCharacters, char => (
        <div key={char} className="character-slot">
          <CharacterTile id={char} />
        </div>
      ))}
      {_.map(Array(4 - selectedCharacters.length), (_, i) => (
        <div key={`empty-${i}`} className="character-slot asEmpty" onClick={handleClickAddCharacter}>
          <Plus />
        </div>
      ))}
    </div>
  )
}

export default PartySelector;