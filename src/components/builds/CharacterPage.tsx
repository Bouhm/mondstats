import React, { useState, useEffect, useContext } from 'react'
import _ from 'lodash'
import { Store } from '../../Store'
import { IBuild, ICharacter } from '../../data/types'
import { useParams } from 'react-router-dom'

import BuildCarousel from './BuildCarousel'
import './CharacterPage.css'

function CharacterPage() {
  const { shortName } = useParams<{ shortName: string }>();
  const [{ characterIdMap, characterBuilds, characterDb }, dispatch] = useContext(Store)
  const [builds, setBuilds] = useState<IBuild[] | undefined>(undefined)
  const [character, setCharacter] = useState<ICharacter | undefined>(undefined)

  useEffect(() => {
    const charId = characterIdMap[shortName]
    console.log(characterIdMap, shortName, charId)

    if (charId) {
      setCharacter(characterDb[charId])
      setBuilds(characterBuilds[charId].builds)
      dispatch({ type: 'SELECT_CHARACTER', payload: charId })
    }
  }, [setCharacter, setBuilds, dispatch, characterIdMap, shortName, characterBuilds])

  if (!character) return null

  return (
    <div className="character-page" style={{ backgroundImage: `url("${character!.image}")` }}>
      {builds && <BuildCarousel builds={_.filter(builds, build => !(build.artifacts.length === 1 && build.artifacts[0].activation_number < 4 ))} />}
    </div>
  )
}

export default CharacterPage
