import React, { useState, useEffect, useContext } from 'react'
import _ from 'lodash'
import { Store } from '../../Store'
import { IBuild, ICharacter, ICharData } from '../../data/types'
import { useParams } from 'react-router-dom'

import BuildSelector from './BuildSelector'
import './CharacterPage.css'

function CharacterPage() {
  const { shortName } = useParams<{ shortName: string }>();
  const [{ characterIdMap, characterBuilds, characterDb }, dispatch] = useContext(Store)
  const [charData, setCharData] = useState<ICharData | undefined>(undefined)
  const [character, setCharacter] = useState<ICharacter | undefined>(undefined)

  useEffect(() => {
    const charId = characterIdMap[shortName]
    console.log(characterIdMap, shortName, charId)

    if (charId) {
      setCharacter(characterDb[charId])
      setCharData(characterBuilds[charId])
      dispatch({ type: 'SELECT_CHARACTER', payload: charId })
    }
  }, [setCharacter, setCharData, dispatch, characterIdMap, shortName, characterBuilds])

  if (!character) return null

  return (
    <div className="character-page" style={{ backgroundImage: `url("${character!.image}")` }}>
      {charData && charData.builds && 
        <BuildSelector 
          element={character.element.toLowerCase()} 
          builds={_.take(_.filter(charData.builds, build => !(build.artifacts.length === 1 && build.artifacts[0].activation_number < 4)), 8)}
          total={charData.total} 
        />
      }
    </div>
  )
}

export default CharacterPage
