import './CharacterPage.css';

import AmberSad from '/assets/amberSad.png';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AbyssBattles from '../../data/abyssBattles.json';
import CharacterBuilds from '../../data/characterBuilds.json';
import { IAbyssBattle, ICharacterBuild, ICharacterData } from '../../data/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCharacter, setElementColor } from '../../Store';
import Abyss from '../characters/Abyss';
import Toggle from '../ui/Toggle';
import BuildSelector from './BuildSelector';
import elemColors from './colors';
import Constellations from './Constellations';

function CharacterPage() {  
  const { shortName } = useParams<{ shortName: string }>();

  const characterIdMap = useAppSelector((state) => state.data.characterIdMap)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const elementColor = useAppSelector((state) => state.data.elementColor)
  const dispatch = useAppDispatch()

  const [characterBuild, setCharacterBuild] = useState<ICharacterBuild | undefined>(undefined)
  const [abyssData, setAbyssData] = useState<IAbyssBattle[] | undefined>(undefined)
  const [character, setCharacter] = useState<ICharacterData | undefined>(undefined)
  const [f2p, setF2p] = useState(false);
  const charId = characterIdMap[shortName]

  const handleToggleF2p = () => {
    setF2p(!f2p)
  }
  
  useEffect(() => {
    if (!_.isEmpty(characterDb)) {
      const char = characterDb[charId];
      setCharacter(char)
      setCharacterBuild(_.find(CharacterBuilds, { char_id: charId }) as ICharacterBuild);

      let filteredAbyss = _.cloneDeep(AbyssBattles)
      _.forEach(filteredAbyss, floor => _.forEach(floor.party_stats, (battles) => {
        _.forEach(battles, (battle, i) => {
          if (battle && !_.includes(battle.party, charId)) {
            battles.splice(i, 1)
          }
        })
      }));
      setAbyssData(filteredAbyss)
      
      dispatch(selectCharacter(charId))
      dispatch(setElementColor(elemColors[char.element.toLowerCase()]))
    }
  }, [setCharacter, setCharacterBuild, setAbyssData, dispatch, charId, characterDb, elemColors, elementColor])

  if (!character || !characterBuild) {
    return <div>
      <div className="its-empty"><img src={AmberSad} alt="empty" /></div>
    </div>
  }

  return (
    <div className="character-page" style={{ backgroundImage: `url("/assets/characters/${character.oid}_bg.webp")` }}>
      <div className="character-page-stats-count" style={{ backgroundColor: elementColor }}>
        <span>{characterBuild.total} {character.name} Builds</span>
      </div>
      <div className="character-page-controls">
        <Toggle color={elementColor} label={"F2P"} defaultValue={f2p} onChange={handleToggleF2p} />
      </div>

      {characterBuild.builds &&
        <>
          <BuildSelector
            builds={_.take(characterBuild.builds, 8)}
            total={characterBuild.total}
            f2p={f2p}
          />
          <Constellations constellations={characterBuild.constellations} total={characterBuild.total} />
        </>
      }
      {abyssData &&
        <Abyss abyssData={abyssData} f2p={f2p} />
      }
    </div>
  )
}

export default CharacterPage