import React, { useState, useEffect, useContext } from 'react'
import _ from 'lodash'
import characterDb from '../../data/characters.json'
import { Store } from '../../Store'
import { useParams } from 'react-router-dom'

import Traveler from '../../assets/Traveler.png'
import './CharacterBuilds.css'

export type Character = {
  id: number,
  image: string,
  icon: string,
  name: string,
  element: string,
  rarity: number,
  constellations: {
    id: number,
    name: string,
    icon: string,
    effect: string,
    pos: number
  }[]
}

function CharacterPage() {
  const { characterName } = useParams<{ characterName: string }>();
  const [state, dispatch] = useContext(Store)

  let character: Character;
  _.forEach(characterDb, char => {
    if (char.name.toLowerCase().replace(" ", "") === characterName) character = char
  })
  const bgUrl = characterName === "traveler" ? Traveler : character!.image.replace("@2x", "");

  useEffect(() => {
    dispatch({ type: 'SELECT_CHARACTER', payload: characterName })
  }, [])

  return (
    <div className="character-container" style={{ backgroundImage: `url("${bgUrl}")` }}>
      <div className="character-artifacts">
      </div>
      <div className="character-weapons">
      </div>
      <div className="character-constellations">
      </div>
    </div>
  )
}

export default CharacterPage
