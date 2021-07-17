import './PartySelector.scss';

import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import { useAppSelector } from '../../hooks';
import { getShortName } from '../../scripts/util';
import CharacterSearch from '../characters/CharacterSearch';
import CharacterTile from '../characters/CharacterTile';
import Button from '../ui/Button';
import { ChevronDown, Close, Plus } from '../ui/Icons';
import Modal from '../ui/Modal';
import Searchbar from '../ui/Searchbar';

function PartySelector() {
  const characterIdMap = useAppSelector((state) => state.data.characterIdMap)
  const [showCharacterSearch, setShowCharacterSearch] = useState(false);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);

  const handleClickAddCharacter = () => {
    setShowCharacterSearch(true)
  }

  const handleSelect = (char: string) => {
    const characters = [...selectedCharacters, char]
    setSelectedCharacters(characters);
  }

  const handleDeselect = (char: string) => {
    setSelectedCharacters(_.filter(selectedCharacters, selected => selected !== char));
  }

  const handleClose = () => {
    setShowCharacterSearch(false)
  }

  return (
    <div className="party-selector">
      <div className="character-slots">
        {_.map(selectedCharacters, char => (
          <div key={char} className="character-slot" onClick={() => handleDeselect(char)}>
            <CharacterTile id={characterIdMap[char]} labeled={false} />
            <span className="close-icon"><Close /></span>
          </div>
        ))}
        {_.map(Array(4 - selectedCharacters.length), (_, i) => (
          <div key={`empty-${i}`} className="character-slot asEmpty" onClick={handleClickAddCharacter}>
            <div className="plus-icon">
              <Plus />
            </div>
          </div>
        ))}
      </div>
      {showCharacterSearch && 
        <>
          <CharacterSearch showAll={false} linked={false} filter={selectedCharacters} onSelect={handleSelect} />
          {<Button onClick={handleClose}>Cancel</Button>}
        </>
      }
    </div>
  )
}

export default PartySelector;