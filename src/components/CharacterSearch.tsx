import './CharacterSearch.css';

import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import { useAppSelector } from '../hooks';
import Searchbar from './ui/Searchbar';
import CharacterTile from './characters/CharacterTile';

type CharacterSearchProps = {
  dataTotal: number;
}

function CharacterSearch({ dataTotal }: CharacterSearchProps) {
  const characterIdMap = useAppSelector((state) => state.data.characterIdMap)
  const [unfilteredChars, setUnfilteredChars] = useState<string[]>([]);
  const [filteredChars, setFilteredChars] = useState<string[]>([]);

  useEffect(() => {
    setUnfilteredChars(_.keys(characterIdMap))
  }, [characterIdMap, setUnfilteredChars])

  // Set character search filter
  const handleSearchCharacter = (filteredChars: string[]) => {
    setFilteredChars(filteredChars);
    setUnfilteredChars(_.filter(_.keys(characterIdMap), name => !filteredChars.includes(name)));
  }

  return (
    <div className="character-search">
      <div className="character-searchbar">
        <Searchbar maxResults={4} onSearch={handleSearchCharacter} list={_.keys(characterIdMap)} placeholder="Search character builds" />
      </div>
      <div className="character-tiles">
        <div className="searched-character">
          {_.map(filteredChars, char => (
            <CharacterTile key={characterIdMap[char]} id={characterIdMap[char]} />
          ))}
        </div>
        <div className="unfiltered-characters">
          {_.map(unfilteredChars.sort(), char => (
            <CharacterTile key={characterIdMap[char]} id={characterIdMap[char]} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CharacterSearch;