import './CharacterStatistics.css';

import { filter, flatten, includes, intersection, isEmpty, map, reduce, some, union, uniq } from 'lodash';
import React, { useState } from 'react';

import useApi from '../hooks/useApi';
import { useAppSelector } from '../hooks/useRedux';
import StatsTable from '../stats/StatsTable';
import CardSearch, { SearchItem } from '../ui/CardSearch';
import Loader from '../ui/Loader';

function CharacterStatistics() { 
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const characterStats = useApi(`/characters/top-characters.json`)
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([])

  if (isEmpty(characterDb) || isEmpty(characterStats)) return <Loader />

  const characters = map(characterStats, ({_id}) => {
    const character = characterDb[_id]

    return ({
      _id,
      name: character.name,
      rarity: character.rarity,
      keys: character.element
    })
  });

  const handleSelect = (selectedIds: string[]) => {
    setSelectedCharacters(selectedIds)
  }
    
  return (
    <div className="character-stats-container">
      <CardSearch.Characters items={filter(characters, character => !includes(selectedCharacters, character._id))} onSelect={handleSelect} />
      <StatsTable.CharacterStatistics data={isEmpty(selectedCharacters) ? characterStats : filter(characterStats, character => includes(selectedCharacters, character._id))} />
    </div>
  )
}

export default CharacterStatistics