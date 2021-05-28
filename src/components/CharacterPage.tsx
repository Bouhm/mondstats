import './CharacterPage.css';

import AmberSad from '/assets/amberSad.png';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IAbyssData, ICharacterDb, ICharData, IData } from '../data/types';
import { Store } from '../Store';
import Abyss from './Abyss';
import BuildSelector from './builds/BuildSelector';
import elemColors from './builds/colors';
import Constellations from './Constellations';

type CharacterPageProps = {
  data: IData
}

function CharacterPage({ data }: CharacterPageProps) {  
  const { shortName } = useParams<{ shortName: string }>();
  const [{ characterIdMap, characterDb, elementColor }, dispatch] = useContext(Store)
  const [charData, setCharData] = useState<ICharData | undefined>(undefined)
  const [abyssData, setAbyssData] = useState<IAbyssData | undefined>(undefined)
  const [character, setCharacter] = useState<ICharacterDb | undefined>(undefined)

  useEffect(() => {
    const charId = characterIdMap[shortName]

    if (charId) {
      let character = characterDb[charId];
      setCharacter(character)
      setCharData(data.characters[charId]);
      setAbyssData(data.abyss);
    
      dispatch({ type: 'SELECT_CHARACTER', payload: charId })
      dispatch({ type: 'SET_ELEMENT_COLOR', payload: elemColors[character.element.toLowerCase()] })
    }
  }, [setCharacter, setCharData, dispatch, elemColors, elementColor, characterIdMap, shortName, data])

  if (!character || !charData) {
    return <div>
      <div className="its-empty"><img src={AmberSad} alt="empty" /></div>
    </div>
  }

  return (
    <div className="character-page" style={{ backgroundImage: `url("/assets/characters/${character.id}_bg.png")` }}>
      <div className="character-stats-count" style={{ backgroundColor: elementColor }}>
        <span>Data from {charData.total} players</span>
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
      {abyssData &&
        <Abyss {...abyssData} />
      }
    </div>
  )
}

export default CharacterPage