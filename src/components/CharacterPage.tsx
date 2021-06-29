import './CharacterPage.css';

import AmberSad from '/assets/amberSad.png';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IAbyssBattle, ICharacterBuild, ICharacterData } from '../data/types';
import { Store } from '../Store';
import Abyss from './Abyss';
import BuildSelector from './builds/BuildSelector';
import elemColors from './builds/colors';
import Constellations from './Constellations';

type CharacterPageProps = {
  data: { 
    characters: ICharacterBuild[],
    abyss: IAbyssBattle[]
  }
}

function CharacterPage({ data }: CharacterPageProps) {  
  const { shortName } = useParams<{ shortName: string }>();
  const [{ characterIdMap, characterDb, elementColor }, dispatch] = useContext(Store)
  const [charData, setCharData] = useState<ICharacterBuild | undefined>(undefined)
  const [abyssData, setAbyssData] = useState<IAbyssBattle[] | undefined>(undefined)
  const [character, setCharacter] = useState<ICharacterData | undefined>(undefined)
  const charId = characterIdMap[shortName]

  _.forEach(data.abyss, floor => _.forEach(floor.party_stats, (battle, i) => {
    if (battle && !_.includes(battle.party, charId)) {
      delete floor.party_stats[i]
    }
  }));

  useEffect(() => {
    if (!_.isEmpty(characterDb)) {
      const char = characterDb[charId];
      setCharacter(char)
      setCharData(_.find(data.characters, charData => charData.char_id === charId ));
      setAbyssData(data.abyss)
      dispatch({ type: 'SELECT_CHARACTER', payload: charId })
      dispatch({ type: 'SET_ELEMENT_COLOR', payload: elemColors[char.element.toLowerCase()] })
    }
  }, [setCharacter, setCharData, setAbyssData, dispatch, charId, characterDb, elemColors, elementColor])

  if (!character || !charData) {
    return <div>
      <div className="its-empty"><img src={AmberSad} alt="empty" /></div>
    </div>
  }

  return (
    <div className="character-page" style={{ backgroundImage: `url("/assets/characters/${character.oid}_bg.png")` }}>
      <div className="character-stats-count" style={{ backgroundColor: elementColor }}>
        <span>Data from {charData.total} players</span>
      </div>
      {charData.builds &&
        <>
          <BuildSelector
            builds={_.take(charData.builds, 8)}
            total={charData.total}
          />
          <Constellations constellations={charData.constellations} total={charData.total} />
        </>
      }
      {/* {abyssData &&
        <Abyss {...abyssData} />
      } */}
    </div>
  )
}

export default CharacterPage