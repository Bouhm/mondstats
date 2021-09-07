import './CharacterBuild.css';

import AmberSad from '/assets/amberSad.webp';
import _, { isEmpty, reduce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ElementColors } from '../../../data/constants';
import { ICharacterData } from '../../../data/types';
import { getCharacterFileName } from '../../../scripts/util';
import { selectCharacter } from '../../../Store';
import Filters from '../../filters/Filters';
import useApi from '../../hooks/useApi';
import useFilters from '../../hooks/useFilters';
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
  } = useFilters(['f2p','a6','max5']);

  const charId = characterIdMap[shortName]
  const _characterBuilds = useApi(`/characters/${shortName}.json`);
  const _characterMainBuilds = useApi(`/characters/mains/${shortName}.json`);
  const [characterBuilds, setCharacterBuilds] = useState(_characterBuilds)

  useEffect(() => {
    if (!_.isEmpty(characterDb)) {
      const char = characterDb[charId];
      setCharacter(char)
      setElementColor(ElementColors[char.element.toLowerCase()]);
      
      dispatch(selectCharacter(charId))
    }
  }, [setCharacter, dispatch, charId, characterDb])

  useEffect(() => {
    if (filters.a6.value) {
      setCharacterBuilds(_characterMainBuilds)
    } else {
      setCharacterBuilds(_characterBuilds)
    }
  }, [_characterBuilds, _characterMainBuilds, filters])

  if (!characterDb || !characterIdMap || !character) {
    return <div>
      <Loader />
    </div>
  }

  if (!characterBuilds || isEmpty(characterBuilds.builds)) {
    return <div>
      <div className="its-empty">
        <LLImage src={AmberSad} alt="empty" />
        <h3>Not enough data</h3>
      </div>
    </div>
  }

  return (
    <>
      <div className="character-page-stats-count" style={{ backgroundColor: elementColor }}>
        <span>{characterBuilds.total} {character.name} Builds</span>
      </div>
      <div className="character-page">
        <div className="character-page-background" style={{ backgroundImage: `url("/assets/characters/${getCharacterFileName(character)}_bg.webp")` }} />
        <Filters filters={filters} color={elementColor} onFilterChange={handleFilterChange} />

        {characterBuilds.builds &&
          <>
            <BuildSelector
              builds={_.take(characterBuilds.builds, maxBuilds)}
              total={characterBuilds.total}
              color={elementColor}
              filters={filters}
            />
            {character.rarity < 100 &&
              <Constellations constellations={characterBuilds.constellations} color={elementColor} total={reduce(characterBuilds.constellations, (sum, curr) => sum += curr, 0)} />
            }
            <CharacterTeams filters={filters} teams={characterBuilds.teams} />
          </>
        }
      </div>
    </>
  )
}

export default CharacterBuild