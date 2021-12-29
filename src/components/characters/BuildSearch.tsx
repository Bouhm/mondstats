import './CharacterTable.css';

import { isEmpty } from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getShortName } from '../../scripts/util';
import CardSearch from '../controls/CardSearch';
import useCharacterSearch from '../hooks/useCharacterSearch';
import { useAppSelector } from '../hooks/useRedux';
import Loader from '../ui/Loader';

function CharacterTable() { 
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const { searchCharacters } = useCharacterSearch(characterDb);
  const navigate = useNavigate();

  if (isEmpty(characterDb)) return <Loader />

  const handleSelect = (selectedIds: string[]) => {
    navigate(`/builds/${getShortName(characterDb[selectedIds[0]])}`)
  }
    
  return (
    <div className="character-stats-container">
      <CardSearch.Characters items={searchCharacters} onSelect={handleSelect} showAll={true} placeholder='Search character builds'/>
    </div>
  )
}

export default CharacterTable