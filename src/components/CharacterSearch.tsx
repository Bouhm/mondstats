import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import CharacterTile, { CharacterTileProps } from './CharacterTile'
import Searchbar from './ui/Searchbar'
import { Store } from '../Store'
import Logo from '../assets/textlogo.png'
import { getShortName } from '../scripts/util'
import './CharacterSearch.css'

function CharacterSearch() {
  const [{ characterIdMap }] = useContext(Store)
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
      <div className="logo-container">
        {/* <img className="logo" src={Logo} alt="logo" /> */}
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
          {_.map(_.orderBy(unfilteredChars, 'asc'), char => (
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