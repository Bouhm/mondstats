import React, { useState, useEffect, useContext } from 'react'
import _ from 'lodash'
import { Store } from '../../Store'
import { ICharData } from '../../data/types'
import { useParams } from 'react-router-dom'

import Traveler from '../../assets/Traveler.png'
import { getShortName } from '../../scripts/util'
import './CharacterPage.css'

function CharacterBuild({ name, constellations, weapons, artifacts }: ICharData) {
  const [{ characterDb, characterIdMap }, dispatch] = useContext(Store)
  const character = characterDb[characterIdMap[getShortName(name)] + '']

  useEffect(() => {
  }, [dispatch])

  return (
    <div className="character-container" style={{ backgroundImage: `url("${character.image}")` }}>
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
  const [{ characterIdMap, characterData }, dispatch] = useContext(Store)
  const id = characterIdMap[characterName] + '';

  return (
    <div className="character-page">
      <CharacterBuild {...characterData[id]} />
    </div>
  )
}

export default CharacterPage
