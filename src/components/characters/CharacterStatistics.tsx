import './CharacterStatistics.css';

import { filter, includes, isEmpty, map } from 'lodash';
import React, { useState } from 'react';

import useApi from '../hooks/useApi';
import { useAppSelector } from '../hooks/useRedux';
import StatsTable from '../stats/StatsTable';
import CardSearch from '../ui/CardSearch';
import Loader from '../ui/Loader';
import { getCharacterLabel } from '../../scripts/util';

function CharacterStatistics() { 
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const characterStats = useApi(`/characters/top-characters.json`)
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([])

  if (isEmpty(characterDb) || isEmpty(characterStats)) return <Loader />

  const characters = map(characterStats, ({_id}) => {
    const character = characterDb[_id]

    return ({
      _id,
      name: getCharacterLabel(character),
      element: character.element,
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