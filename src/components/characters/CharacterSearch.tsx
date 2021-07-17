import './CharacterSearch.css';

import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import Searchbar from '../ui/Searchbar';
import CharacterTile from './CharacterTile';

type CharacterSearchProps = {
  showAll?: boolean;
  onSelect?: (char: string) => void;
  filter?: string[];
  linked?: boolean;
}

function CharacterSearch({ showAll = true, linked = true, filter = [], onSelect }: CharacterSearchProps) {
  const characterIdMap = useAppSelector((state) => state.data.characterIdMap)
  const [unfilteredChars, setUnfilteredChars] = useState<string[]>([]);
  const [filteredChars, setFilteredChars] = useState<string[]>([]);
  const [, updateState] = React.useState({});
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    setUnfilteredChars(_.keys(characterIdMap))
  }, [characterIdMap, setUnfilteredChars])

  // Set character search filter
  const handleSearchCharacter = (filteredChars: string[]) => {
    let filtered = filteredChars;

    if (filter) filtered = _.filter(filteredChars, char => !_.includes(filter, char));

    setFilteredChars(filtered);
    setUnfilteredChars(_.filter(_.keys(characterIdMap), name => !filtered.includes(name)));
  }

  const handleSelect = (char: string) => {
    onSelect && onSelect(char);
    if (filter) setFilteredChars(_.filter(filteredChars, filteredChar => !_.includes([...filter, char], filteredChar)));
  }

  return (
    <div className="character-search">
      <div className="character-searchbar">
        <Searchbar maxResults={4} onSearch={handleSearchCharacter} list={_.keys(characterIdMap)} placeholder="Search character" focused={true} />
      </div>
      <div className="character-tiles">
        <div className="searched-character">
          {_.map(filteredChars, charName => linked ? (
            <Link key={`filtered-${charName}`} to={`/builds/${charName}`}>
              <CharacterTile onClick={handleSelect} key={characterIdMap[charName]} id={characterIdMap[charName]} />
            </Link>
          ) : (
            <CharacterTile onClick={handleSelect} key={characterIdMap[charName]} id={characterIdMap[charName]} />
          ))}
        </div>
        {showAll && 
          <div className="unfiltered-characters">
            {_.map(unfilteredChars.sort(), charName => linked ? (
              <Link key={`filtered-${charName}`} to={`/builds/${charName}`}>
                <CharacterTile onClick={handleSelect} key={characterIdMap[charName]} id={characterIdMap[charName]} />
              </Link>
            ) : (
            <CharacterTile onClick={handleSelect} key={characterIdMap[charName]} id={characterIdMap[charName]} />
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default CharacterSearch;