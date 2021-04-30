import React, { useState, useEffect, useContext } from 'react'
import _ from 'lodash'
import { Store } from '../../Store'
import { ICharData } from '../../data/types'
import { useParams } from 'react-router-dom'

import './CharacterPage.css'
import { ChevronUpSharp } from 'react-ionicons'
import ArtifactBuild from './ArtifactBuild'

function CharacterBuild({ id, name, constellations, weapons, artifacts }: ICharData) {
  const [{ characterDb }] = useContext(Store)
  const [activeBuild, setActiveBuild] = useState(false)
  const character = characterDb[id]
  console.log(character);

  return (
    <div className="character-container" style={{ backgroundImage: `url("${character.image}")` }}>
      <div className="character-artifacts">
        {_.map(artifacts, artifact => <ArtifactBuild {...artifact} />)}
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
  const [build, setBuild] = useState<ICharData | undefined>(undefined)

  useEffect(() => {
    setBuild(characterBuilds[characterIdMap[characterName]]);
  }, [characterIdMap, characterName, characterBuilds])

  return (
    <div className="character-page">
      {build && <CharacterBuild {...build} />}
    </div>
  )
}

export default CharacterPage
