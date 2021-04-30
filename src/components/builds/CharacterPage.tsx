import React, { useState, useEffect, useContext } from 'react'
import _ from 'lodash'
import { Store } from '../../Store'
import { ICharData } from '../../data/types'
import { useParams } from 'react-router-dom'

import './CharacterPage.css'
import { ChevronUpSharp } from 'react-ionicons'
import ArtifactBuild from './ArtifactBuild'

function CharacterBuildStats({ id, name, constellations, weapons, artifacts }: ICharData) {
  const [{ characterDb }] = useContext(Store)
  const [activeBuild, setActiveBuild] = useState(false)
  const character = characterDb[id]
  console.log(character);

  return (
    <div className="character-container" style={{ backgroundImage: `url("${character.image}")` }}>
      <CharacterBuild weaponId={} artifactSets={} />
      <div className="character-constellations">
      </div>
    </div>
  )
}

function CharacterPage() {
  const { characterName } = useParams<{ characterName: string }>();
  const [{ characterIdMap, characterBuilds }] = useContext(Store)
  const [builds, setBuilds] = useState<ICharData | undefined>(undefined)

  useEffect(() => {
    setBuilds(characterBuilds[characterIdMap[characterName]]);
  }, [characterIdMap, characterName, characterBuilds])

  return (
    <div className="character-page">
      {builds && <CharacterBuildStats {...builds} />}
    </div>
  )
}

export default CharacterPage
