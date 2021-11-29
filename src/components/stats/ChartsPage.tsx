import './ChartsPage.css';

import { filter, includes, isEmpty } from 'lodash';
import React, { useState } from 'react';

import useApi from '../hooks/useApi';
import useCharacterSearch from '../hooks/useCharacterSearch';
import { useAppSelector } from '../hooks/useRedux';
import Loader from '../ui/Loader';
import StatsTable from './StatsTable';

function ChartsPage() { 
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const characterStats = useApi(`/characters/top-characters.json`)
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([])

  if (isEmpty(characterDb) || isEmpty(characterStats)) return <Loader />
  const { searchCharacters } = useCharacterSearch(characterDb);

  const handleSelect = (selectedIds: string[]) => {
    setSelectedCharacters(selectedIds)
  }
    
  return (
    <div className="charts-page-container">
      <div className="charts-tabs"></div>
      <div className="charters-container">
        <StatsTable.Characters data={isEmpty(selectedCharacters) ? characterStats.characters : filter(characterStats.characters, character => includes(selectedCharacters, character._id))} /> 
      </div>
    </div>
  )
}

export default ChartsPage