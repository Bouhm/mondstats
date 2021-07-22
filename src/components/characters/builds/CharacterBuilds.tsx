import './CharacterBuilds.css';

import AmberSad from '/assets/amberSad.webp';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CharacterBuildData from '../../../data/characterBuilds.json';
import { ElementColors } from '../../../data/constants';
import { IAbyssBattle, ICharacterBuild, ICharacterData } from '../../../data/types';
import { getCharacterFileName } from '../../../scripts/util';
import { selectCharacter, setElementColor } from '../../../Store';
import { useAppDispatch, useAppSelector } from '../../../useRedux';
import F2P from '../../filters/F2P';
import useFilters from '../../filters/useFilters';
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
  const {
    f2p,
    max5,
    handleToggleF2p,
    handleMax5Change
  } = useFilters();

  const charId = characterIdMap[shortName]

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

  const handleFilterChange = (val: number) => {
    setMax5(val)
  }

  return (
    <div className="character-page">
      <div className="character-page-background" style={{ backgroundImage: `url("/assets/characters/${getCharacterFileName(character)}_bg.webp")` }} />
      <div className="character-page-stats-count" style={{ backgroundColor: elementColor }}>
        <span>{characterBuild.total} {character.name} Builds</span>
      </div>
      <div className="character-page-controls">
        <F2P onChange={handleFilterChange} value={max5} color={elementColor} />
      </div>

      {characterBuild.builds &&
        <>
          <BuildSelector
            builds={_.take(characterBuild.builds, 8)}
            total={characterBuild.total}
            max5={max5}
          />
          <Constellations constellations={characterBuild.constellations} total={characterBuild.total} />
          <CharacterTeams max5={max5} teams={characterBuild.teams} />
        </>
      }
    </div>
  )
}

export default CharacterBuilds