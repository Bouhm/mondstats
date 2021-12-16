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
import { useTabs } from '../../hooks/useTabs';
import Delta from '../../stats/Delta';
import Chart from '../../ui/Chart';
import Empty from '../../ui/Empty';
import { CaretUp } from '../../ui/Icons';
import Loader from '../../ui/Loader';
import Tabs from '../../ui/Tabs';
import data from './albedo.json';
import BuildSelector from './BuildSelector';
import Constellations from './Constellations';

interface ITotals { 
  total: number,
  battleCount: number
}

function CharacterPage() {  
  const { shortName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { activeTabIdx, onTabChange } = useTabs();
  const tabs = ['all', 'abyss'];

  const characterIdMap = useAppSelector((state) => state.data.characterIdMap)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const [elementColor, setElementColor] = useState("");
  const dispatch = useAppDispatch()

  const [character, setCharacter] = useState<ICharacterData | undefined>(undefined)
  const {
    filters,
    handleFilterChange
  } = useFilters(['f2p','a6','max5']);

  const charId = characterIdMap[shortName as string]
  const _characterBuilds = useApi(`/characters/${charId}.json`);
  // const _characterMainBuilds = useApi(`/characters/mains/${charId}.json`);
  const [characterBuilds, setCharacterBuilds] = useState(_characterBuilds)
  useEffect(() => {
    if (!isEmpty(characterDb)) {
      const char = characterDb[charId];
      setCharacter(char)
      setElementColor(ElementColors[char.element.toLowerCase()]);
      
      dispatch(selectCharacter(charId))
    }
  }, [setCharacter, dispatch, charId, characterDb])

  useEffect(() => {
    // if (filters.a6.value) {
    //   setCharacterBuilds(_characterMainBuilds)
    // } else {
      setCharacterBuilds(_characterBuilds)
    // }
  }, [_characterBuilds, setCharacterBuilds, filters])

  useEffect(() => {
    if (characterBuilds) {
      setIsLoading(false)
    }
  }, [characterBuilds, setIsLoading])

  if (isLoading) {
    return <Loader />
  }
  
  if (!character || isEmpty(characterBuilds)) {
    return <Empty />
  }

  return (
    <>
      <div className="character-page-stats-count" style={{ backgroundColor: elementColor }}>
        <span>{characterBuilds[tabs[activeTabIdx]].total} {character.name} Builds</span>
      </div>
      <div className="character-page">
        <div className="character-page-background" style={{ backgroundImage: `url("/assets/characters/${getCharacterFileName(character)}_bg.webp")` }} /> 
        <Tabs tabs={tabs} activeTabIdx={activeTabIdx} onChange={onTabChange} />
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
                {getPercentage(characterBuilds[tabs[activeTabIdx]].battleCount, characterBuilds[tabs[activeTabIdx]].total) }%
                <Delta current={getPercentage(characterBuilds[tabs[activeTabIdx]].battleCount, characterBuilds[tabs[activeTabIdx]].total)} last={22.34} />
              </div>
            </div>
            <div className="character-stats">
              <h2 className="character-stats-title">
                Win Rate
              </h2>
              <div className="character-stats-content character-stats-pct">
                {getPercentage(characterBuilds[tabs[activeTabIdx]].winCount, characterBuilds[tabs[activeTabIdx]].battleCount)}%
                <Delta current={getPercentage(characterBuilds[tabs[activeTabIdx]].battleCount, characterBuilds[tabs[activeTabIdx]].total)} last={85.35} />
              </div>
            </div>
          </div>
        </div>
        {characterBuilds[tabs[activeTabIdx]].builds &&
          <>
            {/* <Sticky top={56}><Filters filters={filters} color={elementColor} onFilterChange={handleFilterChange} /></Sticky> */}
            <BuildSelector
              builds={characterBuilds[tabs[activeTabIdx]].builds}
              total={characterBuilds[tabs[activeTabIdx]].total}
              color={elementColor}
              filters={filters}
            /> 
            {character.rarity < 100 &&
              <Constellations constellations={characterBuilds[tabs[activeTabIdx]].constellations} color={elementColor} total={reduce(characterBuilds[tabs[activeTabIdx]].constellations, (sum, curr) => sum += curr, 0)} />
            }
          </>
        }
      </div>
    </>
  )
}

export default CharacterPage
