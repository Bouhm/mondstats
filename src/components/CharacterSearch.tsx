import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import CharacterTile from './CharacterTile'
import characterDb from '../data/characters.json'
import data from "../sample.json"
import Searchbar from './ui/Searchbar'
import { Store } from '../Store'
import './CharacterSearch.css'

function CharacterSearch() {
  const [state, dispatch] = useContext(Store)
  let searchResults: ({ id: number, name: string }[]) = []

  // Set character search filter
  const handleSearchCharacter = (filteredChars: string[]) => {
    dispatch({ type: "SEARCH_CHARACTER", payload: filteredChars })
  }


  useEffect(() => {
    // Get ids and names of filtered characters
    searchResults = _.map(state.filteredChars, charName => {
      const char = _.find(characterDb, { name: charName });
      return { id: char!.id, name: char!.name }
    })

    console.log(_.xorBy(_.keys(data), _.map(searchResults, res => res.id + ""), 'id'));

  }, state.filteredChars)

  return (
    <div className="character-search">
      <div className="character-searchbar">
        <Searchbar maxResults={3} onSearch={handleSearchCharacter} list={_.map(characterDb, character => character.name)} />
      </div>
      <div className="character-tiles">
        <div className="searched-character">
          {searchResults && _.map(searchResults, ({ id, name }) => {
            return (
              <Link key={id} to={`/characters/${name.toLowerCase().replace(" ", "")}`}>
                <CharacterTile id={id} />
              </Link>
            )
          })
          }
        </div>
        <div className="unfiltered-characters">
          {_.map(_.xorBy(_.keys(data), state.filteredChars, 'id'), id => {
            return (
              <Link key={id} to={`/characters/${_.find(characterDb, { id: parseInt(id) })!.name.toLowerCase().replace(" ", "")}`}>
                <CharacterTile id={parseInt(id)} />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CharacterSearch;