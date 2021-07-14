import './CharacterBuilds.css';

import AmberSad from '/assets/amberSad.png';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CharacterBuildData from '../../../data/characterBuilds.json';
import { ElementColors } from '../../../data/constants';
import { IAbyssBattle, ICharacterBuild, ICharacterData } from '../../../data/types';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectCharacter, setElementColor } from '../../../Store';
import Toggle from '../../ui/Toggle';
import BuildSelector from './BuildSelector';
import CharacterTeams from './CharacterTeams';
import Constellations from './Constellations';

function CharacterBuilds() {  
  const { shortName } = useParams<{ shortName: string }>();

  const characterIdMap = useAppSelector((state) => state.data.characterIdMap)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const elementColor = useAppSelector((state) => state.data.elementColor)
  const dispatch = useAppDispatch()

  const [characterBuild, setCharacterBuild] = useState<ICharacterBuild | undefined>(undefined)
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
      setCharacterBuild(_.find(CharacterBuildData, { char_id: charId }) as ICharacterBuild);
      
      dispatch(selectCharacter(charId))
      dispatch(setElementColor(ElementColors[char.element.toLowerCase()]))
    }
  }, [setCharacter, setCharacterBuild, dispatch, charId, characterDb, ElementColors, elementColor])

  if (!character || !characterBuild) {
    return <div>
      <div className="its-empty"><img src={AmberSad} alt="empty" /></div>
    </div>
  }

  return (
    <div className="character-page">
      <div className="character-page-background" style={{ backgroundImage: `url("/assets/characters/${character.oid}_bg.webp")` }} />
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
          <CharacterTeams teams={characterBuild.teams} f2p={f2p} />
        </>
      }
    </div>
  )
}

export default CharacterBuilds