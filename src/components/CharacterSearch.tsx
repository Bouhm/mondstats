import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import CharacterTile, { CharacterTileProps } from './CharacterTile'
import Searchbar from './ui/Searchbar'
import { Store } from '../Store'
import Logo from '../assets/logo_sm.png'
import { getShortName } from '../scripts/util'
import './CharacterSearch.css'

type CharacterTileLink = CharacterTileProps & { shortname: string };

function CharacterSearch() {
  const [{ characterDb, searchedChars }, dispatch] = useContext(Store)
  const [unfilteredChars, setUnfilteredChars] = useState<{ id: string, shortname: string }[]>([]);
  const [filteredChars, setFilteredChars] = useState<{ id: string, shortname: string }[]>([]);

  useEffect(() => {
    let filtered: CharacterTileLink[] = [];
    let unfiltered: CharacterTileLink[] = [];
    _.forEach(_.values(characterDb), char => {
      if (searchedChars.includes(char.name)) {
        filtered.push({ id: char.id + '', shortname: getShortName(char.name) })
      } else {
        unfiltered.push({ id: char.id + '', shortname: getShortName(char.name) })
      }
    })

    setFilteredChars(filtered);
    setUnfilteredChars(unfiltered);
  }, [characterDb, searchedChars, getShortName, setFilteredChars, setUnfilteredChars])

  // Set character search filter
  const handleSearchCharacter = (filteredChars: string[]) => {
    dispatch({ type: 'SET_FILTER', payload: filteredChars })
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
          {_.map(filteredChars, (char: CharacterTileLink) => {
            return (
              <Link key={char.id} to={`/characters/${char.shortname}`}>
                <CharacterTile id={char.id} />
              </Link>
            )
          })
          }
        </div>
        <div className="unfiltered-characters">
          {_.map(_.orderBy(unfilteredChars, ['name'], ['asc']), (char: CharacterTileLink) => {
            return (
              <Link key={char.id} to={`/characters/${char.shortname}`}>
                <CharacterTile id={char.id} />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CharacterSearch;