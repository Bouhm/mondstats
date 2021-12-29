import './CharacterPage.scss';

import { cloneDeep, find, forEach, isEmpty, map, random, reduce, take } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sticky from 'react-stickynode';

import { ICharacterData } from '../../data/types';
import { getCharacterFileName, getPercentage } from '../../scripts/util';
import { selectCharacter, setColorClass } from '../../Store';
import Filters from '../filters/Filters';
import useApi from '../hooks/useApi';
import useFilters from '../hooks/useFilters';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { useTabs } from '../hooks/useTabs';
import BuildCharts from '../stats/BuildCharts';
import Delta from '../stats/Delta';
import Chart from '../ui/Chart';
import Empty from '../ui/Empty';
import { CaretUp } from '../ui/Icons';
import Loader from '../ui/Loader';
import Tabs from '../ui/Tabs';
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
  }, [activeTabIdx, _characterBuilds, _characterAbyssBuilds, setCharacterBuilds, filters])

  useEffect(() => {
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

  const imgFile = character.name.startsWith('Traveler') ? 'traveler' : character._id;

  return (
    <div className="character-page">
      <div className={`character-page-stats-count ${character.element}`} >
        <span>{selectedCharacterBuilds.count} {character.name} Builds</span>
      </div>
      <div className="character-page-background" style={{ backgroundImage: `url("/assets/characters/${imgFile}_bg.webp")` }} /> 
      <Tabs tabs={tabs} activeTabIdx={activeTabIdx} onChange={onTabChange} />
      {/* <UsageStats count={character.count} total={character.total} abyssCount={character.abyssCount} abyssTotal={character.abyssTotal} /> */}
      {selectedCharacterBuilds.builds &&
        <>
          <BuildCharts.CharacterBuilds builds={selectedCharacterBuilds.builds} />
          {character.rarity < 100 &&
            <Constellations constellations={selectedCharacterBuilds.constellations} total={reduce(selectedCharacterBuilds.constellations, (sum, curr) => sum + curr, 0)} />
          }
        </>
      }
    </div>
  )
}

export default CharacterPage
