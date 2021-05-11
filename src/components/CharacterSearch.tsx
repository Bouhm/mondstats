import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import CharacterTile, { CharacterTileProps } from './CharacterTile'
import Searchbar from './ui/Searchbar'
import { Store } from '../Store'
import Logo from '../assets/logo_sm.png'
import { getShortName } from '../scripts/util'
import './CharacterSearch.css'

type CharacterTileLink = CharacterTileProps & { shortName: string };

function CharacterSearch() {
  const [{ characterDb }] = useContext(Store)
  const [unfilteredChars, setUnfilteredChars] = useState<{ id: string, shortName: string }[]>([]);
  const [filteredChars, setFilteredChars] = useState<{ id: string, shortName: string }[]>([]);

  useEffect(() => {
    setUnfilteredChars(_.map(_.values(characterDb), char => ({ id: char.id + '', shortName: getShortName(char.name) })))
  }, [characterDb, getShortName, setUnfilteredChars])

  // Set character search filter
  const handleSearchCharacter = (filteredChars: string[]) => {
    let filtered: CharacterTileLink[] = [];
    let unfiltered: CharacterTileLink[] = [];
    
    _.forEach(_.values(characterDb), char => {
      if (filteredChars.includes(char.name)) {
        filtered.push({ id: char.id + '', shortName: getShortName(char.name) })
      } else {
        unfiltered.push({ id: char.id + '', shortName: getShortName(char.name) })
      }
    })

    setFilteredChars(_.reverse(filtered));
    setUnfilteredChars(unfiltered);
  }

  return (
    <div className="character-search">
      <div className="logo-container">
        <img className="logo" src={Logo} alt="logo" />
      </div>
      <div className="character-searchbar">
        <Searchbar maxResults={3} onSearch={handleSearchCharacter} list={_.map(_.values(characterDb), character => character.name)} placeholder="Search character" />
      </div>
      <div className="character-tiles">
        <div className="searched-character">
          {_.map(filteredChars, char => (
              <Link key={char.id} to={`/builds/${char.shortName}`}>
                <CharacterTile id={char.id} />
              </Link>
            )
          )}
        </div>
        <div className="unfiltered-characters">
          {_.map(_.orderBy(unfilteredChars, 'shortName', 'asc'), char => (
              <Link key={char.id} to={`/builds/${char.shortName}`}>
                <CharacterTile id={char.id} />
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default CharacterSearch;