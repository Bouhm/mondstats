import './CharacterSearch.css';

import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../assets/logo_sm.png';
import { Store } from '../Store';
import CharacterTile, { CharacterTileProps } from './CharacterTile';
import Searchbar from './ui/Searchbar';

type CharacterSearchProps = {
  dataTotal: number;
}

function CharacterSearch({ dataTotal }: CharacterSearchProps) {
  const [{ characterIdMap, allData }] = useContext(Store)
  const [unfilteredChars, setUnfilteredChars] = useState<string[]>([]);
  const [filteredChars, setFilteredChars] = useState<string[]>([]);

  console.log(dataTotal)
  useEffect(() => {
    setUnfilteredChars(_.keys(characterIdMap))
  }, [characterIdMap, setUnfilteredChars, allData])

  // Set character search filter
  const handleSearchCharacter = (filteredChars: string[]) => {
    setFilteredChars(filteredChars);
    setUnfilteredChars(_.filter(_.keys(characterIdMap), name => !filteredChars.includes(name)));
  }

  return (
    <div className="character-search">
      <div className="logo-container">
        <img className="logo" src={Logo} alt="logo" />
        <div className="players-total">DATA TOTAL: {dataTotal} PLAYERS</div>
      </div>
      <div className="character-searchbar">
        <Searchbar maxResults={4} onSearch={handleSearchCharacter} list={_.keys(characterIdMap)} placeholder="Search character" />
      </div>
      <div className="character-tiles">
        <div className="searched-character">
          {_.map(filteredChars, char => (
            <Link key={characterIdMap[char]} to={`/builds/${char}`}>
              <CharacterTile id={characterIdMap[char]} />
            </Link>
          )
          )}
        </div>
        <div className="unfiltered-characters">
          {_.map(unfilteredChars.sort(), char => (
            <Link key={characterIdMap[char]} to={`/builds/${char}`}>
              <CharacterTile id={characterIdMap[char]} />
            </Link>
          )
          )}
        </div>
      </div>
    </div>
  )
}

export default CharacterSearch;