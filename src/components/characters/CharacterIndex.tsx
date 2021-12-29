import { isEmpty } from 'lodash';
import React from 'react';

import CardSearch from '../controls/CardSearch';
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