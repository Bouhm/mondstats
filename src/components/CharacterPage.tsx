import './CharacterPage.css';

import AmberSad from '/assets/amberSad.png';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IAbyssBattle, ICharacterBuild, ICharacterData } from '../data/types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectCharacter, setElementColor } from '../Store';
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

  const characterIdMap = useAppSelector((state) => state.data.characterIdMap)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const elementColor = useAppSelector((state) => state.data.elementColor)
  const dispatch = useAppDispatch()

  const [charData, setCharData] = useState<ICharacterBuild | undefined>(undefined)
  const [abyssData, setAbyssData] = useState<IAbyssBattle[] | undefined>(undefined)
  const [character, setCharacter] = useState<ICharacterData | undefined>(undefined)
  const charId = characterIdMap[shortName]

  let filteredAbyss = _.cloneDeep(data.abyss)
  _.forEach(filteredAbyss, floor => _.forEach(floor.party_stats, (battles) => {
    _.forEach(battles, (battle, i) => {
      if (battle && !_.includes(battle.party, charId)) {
        battles.splice(i, 1)
      }
    })
  }));

  useEffect(() => {
    if (!_.isEmpty(characterDb)) {
      const char = characterDb[charId];
      setCharacter(char)
      setCharData(_.find(data.characters, charData => charData.char_id === charId ));
      setAbyssData(filteredAbyss)
      
      dispatch(selectCharacter(charId))
      dispatch(setElementColor(elemColors[char.element.toLowerCase()]))
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