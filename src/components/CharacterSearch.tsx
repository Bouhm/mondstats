import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import CharacterTile from './CharacterTile'
import characterDb from '../data/characters.json'
import data from "../sample.json"
import Searchbar from './ui/Searchbar'
import { Store } from '../Store'
import './CharacterSearch.css'
import { Character } from './characters/CharacterBuilds'

function CharacterSearch() {
  const [state, dispatch] = useContext(Store)
  let searchResults: ({ id: number, name: string }[]) = []

  // Set character search filter
  const handleSearchCharacter = (filteredChars: string[]) => {
    dispatch({ type: 'SET_FILTER', payload: filteredChars })
  }

  searchResults = _.map(state.filteredChars, charName => {
    const char = _.find(characterDb, { name: charName });
    return { id: char!.id, name: char!.name }
  })

  console.log(_.orderBy(_.map(_.xorBy(data, searchResults, 'id'), (char: Character) => {
    return (
      <Link key={char.id} to={`/characters/${_.find(characterDb, { id: char.id })!.name.toLowerCase().replace(" ", "")}`}>
        <CharacterTile id={char.id} />
      </Link>
    )
  }), ['name'], ['desc']));

  return (
    <div className="character-search">
      <div className="character-searchbar">
        <Searchbar maxResults={3} onSearch={handleSearchCharacter} list={_.map(characterDb, character => character.name)} placeholder="Search character" />
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
        <section className="unfiltered">
          <div className="unfiltered-characters">
            {_.map(_.orderBy(_.xorBy(data, searchResults, 'id'), ['name'], ['asc']), (char: Character) => {
              return (
                <Link key={char.id} to={`/characters/${_.find(characterDb, { id: char.id })!.name.toLowerCase().replace(" ", "")}`}>
                  <CharacterTile id={char.id} />
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

export default CharacterSearch;