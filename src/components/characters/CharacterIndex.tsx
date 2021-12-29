import { filter, includes, isEmpty, map } from 'lodash';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CardSearch from '../controls/CardSearch';
import useApi from '../hooks/useApi';
import useCharacterSearch from '../hooks/useCharacterSearch';
import { useAppSelector } from '../hooks/useRedux';
import Loader from '../ui/Loader';

function CharacterIndex() { 
  const characterDb = useAppSelector((state) => state.data.characterDb)

  if (isEmpty(characterDb)) return <Loader />
  const { searchCharacters } = useCharacterSearch(characterDb);

  return (
    <div className="character-table-container">
      <CardSearch.Characters items={searchCharacters} />
    </div>
  )
}

export default CharacterIndex