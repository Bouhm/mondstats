import React, { useState } from 'react'
import _ from 'lodash'
import artifactDb from '../../data/artifacts.json'
import weaponDb from '../../data/weapons.json'
import characterDb from '../../data/characters.json'
import { useParams } from 'react-router-dom'

import './CharacterBuilds.css'

type Character = {
  id: number,
  image: string,
  icon: string,
  name: string,
  element: string,
  fetter: number,
  level: number,
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

  let character: Character;
  _.forEach(characterDb, char => {
    if (char.name.toLowerCase().replace(" ", "") === characterName) character = char
  })

  return (
    <div className="character-container" style={{ backgroundImage: `url("${character!.image.replace("@2x", "")}")` }}>
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
