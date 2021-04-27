import React, { useState, useEffect, useContext } from 'react'
import _ from 'lodash'
import { Store } from '../../Store'
import { ICharData } from '../../data/types'
import { useParams } from 'react-router-dom'

import './CharacterPage.css'

function CharacterBuild({ id, name, constellations, weapons, artifacts }: ICharData) {
  const [{ characterDb }] = useContext(Store)
  const character = characterDb[id]

  console.log(id)

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
  const [{ characterIdMap, characterBuilds }] = useContext(Store)
  let build;

  useEffect(() => {
    build = characterBuilds[characterIdMap[characterName]];
  }, [characterIdMap, characterName, characterBuilds])

  if (!build) return null

  return (
    <div className="character-page">
      <CharacterBuild {...build} />
    </div>
  )
}

export default CharacterPage
