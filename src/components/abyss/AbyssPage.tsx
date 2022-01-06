import './AbyssPage.scss';

import axios from 'axios';
import {
  clone,
  cloneDeep,
  countBy,
  difference,
  filter,
  forEach,
  includes,
  isEmpty,
  map,
  range,
  reduce,
  take,
} from 'lodash';
import React, { useEffect, useState } from 'react';
import { ArrayParam, NumberParam, StringParam, useQueryParams } from 'use-query-params';

import { IAbyssFloor, IAbyssParty } from '../../data/types';
import { getShortName } from '../../scripts/util';
import Team from '../abyss/Team';
import Button from '../controls/Button';
import CardSearch, { generateOptions } from '../controls/CardSearch';
import useApi from '../hooks/useApi';
import useCharacterSearch from '../hooks/useCharacterSearch';
import useFilters from '../hooks/useFilters';
import { useAppSelector } from '../hooks/useRedux';
import { useTabs } from '../hooks/useTabs';
import { ChevronDown, ChevronUp } from '../ui/Icons';
import Loader from '../ui/Loader';
import Tabs from '../ui/Tabs';
import AbyssStage from './AbyssStage';

// import abyssFloors from './abyssFloors.json';
// import abyssTopTeams from './top-teams.json';

function AbyssPage() {
  const characterIdMap = useAppSelector((state) => state.data.characterIdMap)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const floors = [0, ...range(9, 13)];
  const stages = [1, 2, 3];
  const { searchCharacters } = useCharacterSearch(characterDb);

  const [ abyssFloorTeams, setAbyssFloorTeams ] = useState<{[stage: number]: IAbyssFloor}>();
  const [ stageLimitToggle, setStageLimitToggle ] = useState<{ [stage: string]: boolean }>({})
  
  const [isLoading, setIsLoading] = useState(true);
  const { filters, handleFilterChange } = useFilters(['f2p', 'max5']);
  const abyssTopTeams = useApi('/abyss/stats/top-abyss-teams.json');

  const [query, setQuery] = useQueryParams({
    floor: NumberParam,
    stage: NumberParam,
    characters: ArrayParam
  })
  const floorTabs = useTabs(query.floor ? floors.indexOf(query.floor) : 0);
  const stageTabs = useTabs(query.stage ? stages.indexOf(query.stage) : 0);
  const [ selectedCharacters, setSelectedCharacters] = useState<string[]>(query.characters ? map(query.characters, char => characterIdMap[char!]) : [])

  async function fetchAbyssData() {
    setIsLoading(true);
    await Promise.all(map(range(1,4), async (stageNum) => { 
      // return axios.get(`https://raw.githubusercontent.com/bouhm/mondstats-data/develop/abyss/${floors[floorTabs.activeTabIdx]}-${stageNum}.json`, {
      return axios.get(`https://bouhm.github.io/mondstats-data/abyss/${floors[floorTabs.activeTabIdx]}-${stageNum}.json`, {
        headers: { 'accept': 'application/vnd.github.v3.raw+json' },
      }).then(res => ({ [stageNum]: res.data }))
    })).then(data => { loadAbyssFloorTeams(data); setIsLoading(false) })
  }

  function loadAbyssFloorTeams(data: any) {
    const combinedStageTeams: any = {};
    forEach(data, (abyssFloorData) => {
      forEach(abyssFloorData, (stageData, stage) => {
        combinedStageTeams[stage] = stageData
      })
    })

    setAbyssFloorTeams(combinedStageTeams)
  }

  useEffect(() => {
    if (floorTabs.activeTabIdx !== 0) {
      fetchAbyssData();
    }
  }, [floorTabs.activeTabIdx])

  function _filterParties(parties: IAbyssParty[]) {
    return filter(parties, ({ coreParty, flex}) => {
      let charFilter = true;
      let cond = false;

      forEach(flex, _flex => {
        if (!_flex[0]) return false;

        const party = [...coreParty, _flex[0]._id]
  
        charFilter = (filter(party, char => {
          if (typeof char !== "string") return false;
          return characterDb[char].rarity > 4 && characterDb[char].name !== "Traveler"
        }).length <= filters.max5!.value) 
        
        if (!cond) cond = (charFilter && difference(selectedCharacters, party).length === 0);
      })

      return cond;
    })
  }

  function _filterTopTeams() {
    return _filterParties(abyssTopTeams);
  }

  function _filterFloor() {
    let filteredAbyssFloors: any = cloneDeep(abyssFloorTeams)!

    forEach(filteredAbyssFloors, (stage, stageNum) => {
      forEach(stage, (battle, battleIndex) => {
        filteredAbyssFloors[stageNum][battleIndex] = _filterParties(battle);
      })
    })
  
    return filteredAbyssFloors;
  }

  const handleToggleLimit = (selectedStage: string) => {
    let newMap: { [stage: string]: boolean } = clone(stageLimitToggle)
    newMap[selectedStage] = newMap[selectedStage] ? !newMap[selectedStage] : true;
    setStageLimitToggle(newMap)
  }

  const handlePartyChange = (party: string[]) => {
    setSelectedCharacters(party);

    setQuery({ characters: map(party, char => getShortName(characterDb[char])) }, 'pushIn');
    const count5 = countBy(party, char => characterDb[char].rarity);

    if (count5['5'] > filters.max5!.value) {
      handleFilterChange('max5', count5['5'])
    }
  }

  const handleFloorChange = (idx: number) => {
    const tabFloor = idx === 0 ? undefined : floors[idx];
    setQuery({ floor: tabFloor, stage: undefined });
    floorTabs.onTabChange(idx);
    stageTabs.onTabChange(0)
  }

  const handleStageChange = (idx: number) => {
    setQuery({ stage: stages[idx] }, 'pushIn');
    stageTabs.onTabChange(idx);
  }

  const renderTopTeams = () => {
    const filteredTopTeams = filter(_filterTopTeams(), ({ flex }) => flex[0] && flex[0].length) as IAbyssParty[];
    const total = reduce(abyssTopTeams, (sum,curr) => sum + curr.count, 0)

    return (
      <>
        {/* <h2 className="stage-label">Top Teams</h2> */}
        <div className="stage-half">
          {/* <h2>{total} Teams</h2> */}
          {map(take(filteredTopTeams, stageLimitToggle["ALL"] ? 20 : 10), ({coreParty, flex, count }, i) => {
            const party = [...coreParty, flex[0][0]._id]
            return (
              <React.Fragment key={`parties-ALL-${i}`}>
                <div className="battle-container">
                  <Team team={party} count={count} flex={flex} total={total} />
                </div>
              </React.Fragment>
            )
          })}
          {(filteredTopTeams.length > 10) && (!stageLimitToggle["ALL"] ?
            <Button className="stage-teams-show-more" onClick={() => handleToggleLimit("ALL")}>Show more <ChevronDown size={16} /></Button>
            :
            <Button className="stage-teams-show-more" onClick={() => handleToggleLimit("ALL")}>Show less <ChevronUp size={16} /></Button>
          )}
        </div>
    </>
    )
  }

  const renderFloorTeams = () => {
    if (!abyssFloorTeams || isLoading) {
      return <Loader />
    }

    const filteredAbyssFloor = filter(_filterFloor());

    return <AbyssStage 
      key={`floor-${floors[floorTabs.activeTabIdx]}-${stageTabs.activeTabIdx}-teams`}
      stageData={filteredAbyssFloor[stageTabs.activeTabIdx]} 
      floor={floors[floorTabs.activeTabIdx]}
      stage={stages[stageTabs.activeTabIdx]}
      stageLimitToggle={stageLimitToggle} 
      onToggleLimit={handleToggleLimit}
    />
  }
  
  const renderTeams = () => (
    <div className="floor-container">
      <div key={floors[floorTabs.activeTabIdx]} className="stage-container">
        {floorTabs.activeTabIdx === 0 ? renderTopTeams() : renderFloorTeams()}
      </div>
    </div>
  )

  if (!characterDb || !abyssTopTeams) {
    return <Loader />
}

  return (
    <div className="abyss-container">
      <div className="abyss-controls">
      </div>
      <CardSearch.Characters 
        items={filter(searchCharacters, character => !includes(selectedCharacters, character._id))} 
        defaultItems={generateOptions(map(selectedCharacters, char => characterDb[char]))}
        onSelect={handlePartyChange} 
        showCards={false}
      />
      <br />
      <Tabs activeTabIdx={floorTabs.activeTabIdx} onChange={handleFloorChange} tabs={map(floors, (floor, i) => i === 0 ? 'ALL' : 'Floor ' + floor)} />
      {floorTabs.activeTabIdx !== 0 && <Tabs activeTabIdx={stageTabs.activeTabIdx} onChange={handleStageChange} tabs={map(stages, stage => 'Stage ' + stage)} />}
      {!isEmpty(characterDb) && renderTeams()}
    </div>
  )
}

export default AbyssPage;