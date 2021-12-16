import './CharacterIndex.css';

import { filter, includes, isEmpty, map } from 'lodash';
import React, { useState } from 'react';

import CardSearch from '../controls/CardSearch';
import useApi from '../hooks/useApi';
import useCharacterSearch from '../hooks/useCharacterSearch';
import { useAppSelector } from '../hooks/useRedux';
import Loader from '../ui/Loader';

function CharacterIndex() { 
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([])

  if (isEmpty(characterDb)) return <Loader />
  const { searchCharacters } = useCharacterSearch(characterDb);

  const handleSelect = (selectedIds: string[]) => {
    setSelectedCharacters(selectedIds)
  }
    
  return (
    <div className="character-table-container">
      <CardSearch.Characters items={filter(searchCharacters, character => !includes(selectedCharacters, character._id))} onSelect={handleSelect} />
    </div>
  )
}

export default CharacterIndex