import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import CharacterTile, { CharacterTileProps } from './CharacterTile'
import data from "../sample.json"
import Searchbar from './ui/Searchbar'
import { ICharData, Store } from '../Store'
import Logo from '../assets/logo_sm.png'
import { getShortName } from '../scripts/util'
import './CharacterSearch.css'

type CharacterTileLink = CharacterTileProps & { shortname: string };

function CharacterSearch() {
  const [charData, setCharData] = useState<{ [id: string]: ICharData }>({});
  const [{ characterDb, searchedChars }, dispatch] = useContext(Store)

  useEffect(() => {
    setCharData(data as { [id: string]: ICharData });
    let charIdMap: { [shortname: string]: string } = {}
    _.forEach(_.keys(charData), (id: string) => {
      charIdMap[getShortName(charData[id].name)] = id;
    });

    dispatch({ type: 'SET_CHARACTER_ID_MAP', payload: charIdMap })
  }, [charData, getShortName, dispatch, setCharData])

  const [unfilteredChars, setUnfilteredChars] = useState<{ id: number, shortname: string }[]>([]);
  const [filteredChars, setFilteredChars] = useState<{ id: number, shortname: string }[]>([]);

  useEffect(() => {
    let filtered: CharacterTileLink[] = [];
    let unfiltered: CharacterTileLink[] = [];
    _.forEach(characterDb, char => {
      if (searchedChars.includes(char.name)) {
        filtered.push({ id: char.id, shortname: getShortName(char.name) })
      } else {
        unfiltered.push({ id: char.id, shortname: getShortName(char.name) })
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
        <Searchbar maxResults={3} onSearch={handleSearchCharacter} list={_.map(characterDb, character => character.name)} placeholder="Search character" />
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