import './CharacterSearch.css';

import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../useRedux';
import { getShortName } from '../../scripts/util';
import Dropdown, { Option } from '../ui/Dropdown';
import Searchbar from '../ui/Searchbar';
import CharacterTile from './CharacterTile';

type CharacterSearchProps =
 {
  showAll?: boolean;
  onSelect?: (char: string) => void;
  filter?: string[];
  asLink?: boolean;
}

function CharacterSearch({ showAll = true, asLink = true, filter = [], onSelect }: CharacterSearchProps) {
  const characterDb = useAppSelector((state) => state.data.characterDb)
  // const [unfilteredChars, setUnfilteredChars] = useState<string[]>([]);
  // const [filteredChars, setFilteredChars] = useState<string[]>([]);

  // useEffect(() => {
  //   setUnfilteredChars(_.keys(characterIdMap))
  // }, [characterIdMap, setUnfilteredChars])

  // useEffect(() => {
  //   setFilteredChars(filteredChars)
  // }, [filter, setFilteredChars])

  // // Set character search filter
  // const handleSearchCharacter = (filteredChars: string[]) => {
  //   setFilteredChars(filteredChars);
  //   setUnfilteredChars(_.filter(_.keys(characterIdMap), name => !filteredChars.includes(name)));
  // }

  const handleSelect = (char: Option) => {
    onSelect && onSelect(char.value);
  }

  return (
    <div className="character-search">
      <div className="character-searchbar">
        <Dropdown.SearchSelect
          options={
            _.orderBy(
              _.filter(
                _.map(characterDb, ({element, name}) => {
                  if (name === "Traveler") {
                    return { label: `${name} (${element})`, value: getShortName(`${name}-${element}`)}
                  } else {
                    return { label: name, value: getShortName(name) }
                  }
                }),
              ({ value }) => !_.some(filter, name => value.split('-')[0] === name.split('-')[0])),
            'label', 'asc')
          } 
          onChange={handleSelect}
        />
      </div>
      {/* <div className="character-tiles">
        <div className="searched-characters">
          {_.map(_.filter(filteredChars, char => !_.includes(filter, char)), charName => linked ? (
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
      </div> */}
    </div>
  )
}

export default CharacterSearch;