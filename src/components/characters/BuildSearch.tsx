import './CharacterTable.css';

import { filter, includes, isEmpty, map } from 'lodash';
import React, { useState } from 'react';

import { getShortName } from '../../scripts/util';
import CardSearch from '../controls/CardSearch';
import useApi from '../hooks/useApi';
import useCharacterSearch from '../hooks/useCharacterSearch';
import { useAppSelector } from '../hooks/useRedux';
import Loader from '../ui/Loader';

function CharacterTable() { 
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const { searchCharacters } = useCharacterSearch(characterDb);

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

export default CharacterTable