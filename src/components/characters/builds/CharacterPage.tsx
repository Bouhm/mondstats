import './CharacterPage.css';

import { cloneDeep, find, forEach, isEmpty, map, random, reduce, take } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sticky from 'react-stickynode';

import { ICharacterData } from '../../../data/types';
import { getCharacterFileName, getPercentage } from '../../../scripts/util';
import { selectCharacter, setColorClass } from '../../../Store';
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

function CharacterPage() {  
  const { shortName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { activeTabIdx, onTabChange } = useTabs();
  const tabs = ['all', 'abyss'];

  const characterIdMap = useAppSelector((state) => state.data.characterIdMap)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const dispatch = useAppDispatch()

  const [character, setCharacter] = useState<ICharacterData | undefined>(undefined)
  const {
    filters,
    handleFilterChange
  } = useFilters(['f2p','a6','max5']);

  const charId = characterIdMap[shortName as string]
  const _characterBuilds = useApi(`/characters/${charId}.json`);
  const _characterAbyssBuilds = useApi(`/characters/abyss/${charId}.json`);
  const [selectedCharacterBuilds, setCharacterBuilds] = useState(_characterBuilds);

  useEffect(() => {
    if (!isEmpty(characterDb)) {
      const char = characterDb[charId];
      setCharacter(char)
      
      dispatch(setColorClass(char.element))
      dispatch(selectCharacter(charId))
    }
  }, [setCharacter, dispatch, charId, characterDb])

  useEffect(() => {
    if (_characterBuilds && _characterAbyssBuilds) {
      switch (tabs[activeTabIdx]) {
        case 'all':
          setCharacterBuilds(_characterBuilds.data)
          return;
        case 'abyss':
          setCharacterBuilds(_characterAbyssBuilds.data)
          return;
        default:
          setCharacterBuilds(_characterBuilds.data)
          return;
      } 
    }
  }, [_characterBuilds, _characterAbyssBuilds, setCharacterBuilds, filters])

  useEffect(() => {
    console.log(selectedCharacterBuilds)
    if (selectedCharacterBuilds) {
      setIsLoading(false)
    }
  }, [selectedCharacterBuilds, setIsLoading])

  if (isLoading) {
    return <Loader />
  }
  
  if (!character || isEmpty(selectedCharacterBuilds)) {
    return <Empty />
  }

  return (
    <>
      <div className={`character-page-stats-count ${character.element}`} >
        <span>{selectedCharacterBuilds.count} {character.name} Builds</span>
      </div>
      <div className="character-page">
        <div className="character-page-background" style={{ backgroundImage: `url("/assets/characters/${getCharacterFileName(character)}_bg.webp")` }} /> 
        <Tabs tabs={tabs} activeTabIdx={activeTabIdx} onChange={onTabChange} />
        {/* <div className="character-stats-container">
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
                {getPercentage(selectedCharacterBuilds.count, selectedCharacterBuilds.total) }%
                <Delta current={getPercentage(selectedCharacterBuilds.count, selectedCharacterBuilds.total)} last={22.34} />
              </div>
            </div>
            <div className="character-stats">
              <h2 className="character-stats-title">
                Win Rate
              </h2>
              <div className="character-stats-content character-stats-pct">
                {getPercentage(selectedCharacterBuilds.winCount, selectedCharacterBuilds.count)}%
                <Delta current={getPercentage(selectedCharacterBuilds.count, selectedCharacterBuilds.total)} last={85.35} />
              </div>
            </div>
          </div>
        </div> */}
        {selectedCharacterBuilds.builds &&
          <>
            {/* <Sticky top={56}><Filters filters={filters} color={elementColor} onFilterChange={handleFilterChange} /></Sticky> */}
            <BuildSelector
              builds={selectedCharacterBuilds.builds}
              total={selectedCharacterBuilds.count}
              filters={filters}
            /> 
            {character.rarity < 100 &&
              <Constellations constellations={selectedCharacterBuilds.constellations} total={reduce(selectedCharacterBuilds.constellations, (sum, curr) => sum + curr, 0)} />
            }
          </>
        }
      </div>
    </>
  )
}

export default CharacterPage
