import React, { useState, useEffect, useContext } from 'react'
import _ from 'lodash'
import { Store } from '../Store'
import { IBuild, ICharacter, ICharData } from '../data/types'
import { useParams } from 'react-router-dom'

import BuildSelector from './builds/BuildSelector'
import './CharacterPage.css'
import Abyss from './Abyss'

function CharacterPage() {
  const { shortName } = useParams<{ shortName: string }>();
  const [{ characterIdMap, characterBuilds, characterDb }, dispatch] = useContext(Store)
  const [charData, setCharData] = useState<ICharData | undefined>(undefined)
  const [character, setCharacter] = useState<ICharacter | undefined>(undefined)

  useEffect(() => {
    const charId = characterIdMap[shortName]

    if (charId) {
      setCharacter(characterDb[charId])
      setCharData(characterBuilds[charId])
      dispatch({ type: 'SELECT_CHARACTER', payload: charId })
    }
  }, [setCharacter, setCharData, dispatch, characterIdMap, shortName, characterBuilds])

  if (!character || !charData) return null


  return (
    <div className="character-page" style={{ backgroundImage: `url("${character!.image}")` }}>
      {charData.builds &&
        <BuildSelector
          element={character.element.toLowerCase()}
          builds={_.take(charData.builds, 8)}
          total={charData.total}
        />
      }
      {charData.abyss &&
        <Abyss {...charData.abyss} />
      }
    </div>
  )
}

export default CharacterPage
