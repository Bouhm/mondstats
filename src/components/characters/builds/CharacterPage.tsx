import './CharacterPage.css';

import { cloneDeep, find, forEach, isEmpty, map, random, reduce, take } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sticky from 'react-stickynode';

import { ElementColors } from '../../../data/constants';
import { ICharacterData } from '../../../data/types';
import { getCharacterFileName, getPercentage } from '../../../scripts/util';
import { selectCharacter } from '../../../Store';
import Filters from '../../filters/Filters';
import useApi from '../../hooks/useApi';
import useFilters from '../../hooks/useFilters';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import Delta from '../../stats/Delta';
import Chart from '../../ui/Chart';
import Empty from '../../ui/Empty';
import { CaretUp } from '../../ui/Icons';
import Loader from '../../ui/Loader';
import data from './albedo.json';
import BuildSelector from './BuildSelector';
import Constellations from './Constellations';

interface ITotals { 
  total: number,
  battleCount: number
}

function CharacterPage() {  
  const { shortName } = useParams();

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

  const charId = characterIdMap[shortName as string]
  const _characterBuilds = useApi(`/characters/${charId}.json`);
  const _characterMainBuilds = useApi(`/characters/mains/${charId}.json`);
  const [characterBuilds, setCharacterBuilds] = useState(_characterBuilds)

  useEffect(() => {
    if (!isEmpty(characterDb)) {
      const char = characterDb[charId];
      setCharacter(char)
      setElementColor(ElementColors[char.element.toLowerCase()]);
      
      dispatch(selectCharacter(charId))
    }
  }, [setCharacter, dispatch, charId, characterDb])

  // useEffect(() => {
  //   if (filters.a6.value) {
  //     setCharacterBuilds(_characterMainBuilds)
  //   } else {
  //     setCharacterBuilds(_characterBuilds)
  //   }
  // }, [_characterBuilds, _characterMainBuilds, filters])

  // useEffect(() => {
  //   if (_characterStats) {
  //     const charStats = find(_characterStats, { _id: charId });
  //     setCharacterStats(charStats)
  //   }
  // }, [_characterStats, charId])

  if (!characterDb || !characterIdMap || !character || !characterStats) {
    return <div>
      <Loader />
    </div>
  }

  if (!characterBuilds || !_characterMainBuilds || isEmpty(characterBuilds.builds) || isEmpty(_characterMainBuilds)) {
    return <Empty />
  }

  return (
    <>
      <div className="character-page-stats-count" style={{ backgroundColor: elementColor }}>
        <span>{characterBuilds.total} {character.name} Builds</span>
      </div>
      <div className="character-page">
        <div className="character-page-background" style={{ backgroundImage: `url("/assets/characters/${getCharacterFileName(character)}_bg.webp")` }} /> 
        <div className="character-stats-container">
          <div className="character-stats">
            <h2 className="character-stats-title">
              Popularity
            </h2>
            <div className="character-stats-content character-stats-popularity">
              14 <Delta current={14} last={13} />
            </div>
          </div>
          <div className="character-stats-abyss">
            <div className="character-stats">
              <h2 className="character-stats-title">
                Pick Rate
              </h2>
              <div className="character-stats-content character-stats-pct">
                {getPercentage(characterBuilds.battleCount, characterBuilds.total) }%
                <Delta current={getPercentage(characterBuilds.battleCount, characterBuilds.total)} last={22.34} />
              </div>
            </div>
            <div className="character-stats">
              <h2 className="character-stats-title">
                Win Rate
              </h2>
              <div className="character-stats-content character-stats-pct">
                {getPercentage(characterBuilds.winCount, characterBuilds.battleCount)}%
                <Delta current={getPercentage(characterBuilds.battleCount, characterBuilds.total)} last={85.35} />
              </div>
            </div>
          </div>
        </div>
        {characterBuilds.builds &&
          <>
            <Sticky top={56}><Filters filters={filters} color={elementColor} onFilterChange={handleFilterChange} /></Sticky>
            <BuildSelector
              builds={take(characterBuilds.builds, maxBuilds)}
              total={characterBuilds.total}
              color={elementColor}
              filters={filters}
            /> 
            {character.rarity < 100 &&
              <Constellations constellations={characterBuilds.constellations} color={elementColor} total={reduce(characterBuilds.constellations, (sum, curr) => sum += curr, 0)} />
            }
          </>
        }
      </div>
    </>
  )
}

export default CharacterPage
