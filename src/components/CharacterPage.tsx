import './CharacterPage.css';

import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ICharacterDb, ICharData } from '../data/types';
import { Store } from '../Store';
import Abyss from './Abyss';
import BuildSelector from './builds/BuildSelector';
import elemColors from './builds/colors';

function CharacterPage() {
  const { shortName } = useParams<{ shortName: string }>();
  const [{ characterIdMap, allData, characterDb, selectedCharacter }, dispatch] = useContext(Store)
  const [charData, setCharData] = useState<ICharData | undefined>(undefined)
  const [character, setCharacter] = useState<ICharacterDb | undefined>(undefined)

  useEffect(() => {
    const charId = characterIdMap[shortName]

    if (charId) {
      setCharacter(characterDb[charId])
      setCharData(allData.characters[charId])
      dispatch({ type: 'SELECT_CHARACTER', payload: charId })
    }
  }, [setCharacter, setCharData, dispatch, characterIdMap, shortName, allData])

  if (!character || !charData) return null


  return (
    <div className="character-page" style={{ backgroundImage: `url("${character!.image}")` }}>
      <div className="character-stats-count" style={{ backgroundColor: elemColors[characterDb[selectedCharacter].element.toLocaleLowerCase()] }}>
        <span>Data from {allData.characters[selectedCharacter].total} players</span>
      </div>
      {charData.builds &&
        <>
          <BuildSelector
            builds={_.take(charData.builds, 8)}
            total={charData.total}
          />
          {/* <Constellations constellations={charData.constellations} total={charData.total} /> */}
        </>
      }
      {allData.abyss &&
        <Abyss {...allData.abyss} />
      }
    </div>
  )
}

export default CharacterPage