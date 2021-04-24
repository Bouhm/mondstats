import React, { useState, useEffect, useContext } from 'react'
import _ from 'lodash'
import characterDb from '../../data/characters.json'
import artifactDb from '../../data/artifacts.json'
import weaponDb from '../../data/weapons.json'
import { Store } from '../../Store'
import { useParams } from 'react-router-dom'

import Traveler from '../../assets/Traveler.png'
import { getShortName } from '../../scripts/util'
import './CharacterPage.css'

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

function CharacterBuild() {
  const [state, dispatch] = useContext(Store)

  let character: Character;

  for (let i = 0; i < characterDb.length; i++) {
    if (getShortName(characterDb[i].name) === characterName) {
      character = characterDb[i];
      break;
    }
  }
  const bgUrl = characterName === "traveler" ? Traveler : character!.image.replace("@2x", "");

  useEffect(() => {
  }, [dispatch])

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

function CharacterPage() {
  const { characterName } = useParams<{ characterName: string }>();

  return (
    <div className="character-page">
      <CharacterBuild {} />
    </div>
  )
}

export default CharacterPage
