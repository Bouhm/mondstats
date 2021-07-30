import './PartySelector.scss';

import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import CharacterSearch from '../characters/CharacterSearch';
import CharacterTile from '../characters/CharacterTile';
import { useAppSelector } from '../hooks/useRedux';
import Button from '../ui/Button';
import { Close, Plus } from '../ui/Icons';

type PartySelectorProps = {
  onPartyChange: (party: string[]) => void;
}

function PartySelector({ onPartyChange }: PartySelectorProps) {
  const characterIdMap = useAppSelector((state) => state.data.characterIdMap)
  const [showCharacterSearch, setShowCharacterSearch] = useState(false);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);

  const handleClickAddCharacter = () => {
    setShowCharacterSearch(true)
  }

  const handleSelect = (char: string) => {
    const characters = _.uniq([...selectedCharacters, char])
    setSelectedCharacters(characters);
    onPartyChange(_.map(characters, name => characterIdMap[name]));
    handleClose();
  }

  const handleDeselect = (char: string) => {
    const characters = _.uniq(_.filter(selectedCharacters, selected => selected !== char));
    setSelectedCharacters(characters);
    onPartyChange(_.map(characters, name => characterIdMap[name]));
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
            <CharacterTile id={characterIdMap["amber"]} labeled={false} />
            <span className="plus-icon"><Plus /></span>
          </div>
        ))}
      </div>
      {showCharacterSearch && selectedCharacters.length < 4 && 
        <>
          <CharacterSearch filter={selectedCharacters} onSelect={handleSelect} />
          {<Button onClick={handleClose}>Cancel</Button>}
        </>
      }
    </div>
  )
}

export default PartySelector;