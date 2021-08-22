import './CharacterStatistics.css';

import { filter, includes, isEmpty, map } from 'lodash';
import React, { useState } from 'react';

import useApi from '../hooks/useApi';
import { useAppSelector } from '../hooks/useRedux';
import CardSearch from '../ui/CardSearch';
import Loader from '../ui/Loader';
import { getCharacterLabel, getShortName } from '../../scripts/util';
import { useHistory } from 'react-router-dom';
import useCharacterSearch from '../hooks/useCharacterSearch';

function CharacterStatistics() { 
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const { searchCharacters } = useCharacterSearch(characterDb);
  const routerHistory = useHistory();

  if (isEmpty(characterDb)) return <Loader />

  const handleSelect = (selectedIds: string[]) => {
    routerHistory.push(`/builds/${getShortName(characterDb[selectedIds[0]])}`)
  }
    
  return (
    <div className="character-stats-container">
      <CardSearch.Characters items={searchCharacters} onSelect={handleSelect} showAll={true} placeholder='Search character builds'/>
    </div>
  )
}

export default CharacterStatistics