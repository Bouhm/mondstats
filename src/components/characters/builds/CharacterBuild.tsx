import './CharacterBuild.css';

import AmberSad from '/assets/amberSad.webp';
import _, { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ElementColors } from '../../../data/constants';
import { ICharacterData } from '../../../data/types';
import { getCharacterFileName } from '../../../scripts/util';
import { selectCharacter } from '../../../Store';
import F2P from '../../filters/F2P';
import useFilters from '../../filters/useFilters';
import useApi from '../../hooks/useApi';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import LLImage from '../../ui/LLImage';
import Loader from '../../ui/Loader';
import BuildSelector from './BuildSelector';
import CharacterTeams from './CharacterTeams';
import Constellations from './Constellations';

function CharacterBuild() {  
  const { shortName } = useParams<{ shortName: string }>();

  const characterIdMap = useAppSelector((state) => state.data.characterIdMap)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const maxBuilds = 10;
  const [elementColor, setElementColor] = useState("");
  const dispatch = useAppDispatch()

  const [character, setCharacter] = useState<ICharacterData | undefined>(undefined)
  const {
    filters,
    handleFilterChange
  } = useFilters();

  const charId = characterIdMap[shortName]
  const characterBuild = useApi(`/characters/${shortName}.json`);

  useEffect(() => {
    if (!_.isEmpty(characterDb)) {
      const char = characterDb[charId];
      setCharacter(char)
      setElementColor(ElementColors[char.element.toLowerCase()]);
      
      dispatch(selectCharacter(charId))
    }
  }, [setCharacter, dispatch, charId, characterDb])

  if (!characterBuild || !characterDb || !characterIdMap) {
    return <div>
      <Loader />
    </div>
  }

  if (!character || isEmpty(characterBuild.builds)) {
    return <div>
      <div className="its-empty">
        <LLImage src={AmberSad} alt="empty" />
        <h3>Data not found</h3>
      </div>
    </div>
  }

  return (
    <>
      <div className="character-page-stats-count" style={{ backgroundColor: elementColor }}>
        <span>{characterBuild.total} {character.name} Builds</span>
      </div>
      <div className="character-page">
        <div className="character-page-background" style={{ backgroundImage: `url("/assets/characters/${getCharacterFileName(character)}_bg.webp")` }} />
        <div className="character-page-controls">
          <F2P onChange={handleFilterChange} f2p={filters.f2p} max5={filters.max5} color={elementColor} />
        </div>

        {characterBuild.builds &&
          <>
            <BuildSelector
              builds={_.take(characterBuild.builds, maxBuilds)}
              total={characterBuild.total}
              color={elementColor}
              filters={filters}
            />
            <Constellations constellations={characterBuild.constellations} color={elementColor} total={characterBuild.total} />
            <CharacterTeams filters={filters} teams={characterBuild.teams} />
          </>
        }
      </div>
    </>
  )
}

export default CharacterBuild