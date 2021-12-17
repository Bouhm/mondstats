import './AbyssPage.scss';

import axios from 'axios';
import {
  clone,
  cloneDeep,
  countBy,
  difference,
  filter,
  findIndex,
  flatten,
  forEach,
  includes,
  isEmpty,
  map,
  range,
  reduce,
  take,
} from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { IAbyssFloor, IAbyssParty } from '../../data/types';
import { getPercentage } from '../../scripts/util';
import Team from '../abyss/Team';
import Button from '../controls/Button';
import CardSearch from '../controls/CardSearch';
import { Option } from '../controls/Dropdown';
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

const _compareFloor = (f1: Option, f2: Option) => {
  if (f1.value.startsWith('_') || f2.value.startsWith('_')) {
    return f1.value.startsWith('_') ? 0 : 1;
  }

  const f1Strs = f1.value.split("-")
  const f2Strs = f2.value.split("-")

  if (parseInt(f1Strs[0]) === parseInt(f2Strs[0])) {
    return parseInt(f1Strs[1]) - parseInt(f2Strs[1])
  } else {
    return parseInt(f1Strs[0]) - parseInt(f2Strs[0])
  }
}

function AbyssPage() {
  const floors = range(9, 5);
  const tabs = ['ALL', ...floors]

  const characterDb = useAppSelector((state) => state.data.characterDb)
  const { searchCharacters } = useCharacterSearch(characterDb);

  const [ abyssFloorTeams, setAbyssFloorTeams ] = useState<{[stage: number]: IAbyssFloor}>();
  const [ stageLimitToggle, setStageLimitToggle ] = useState<{ [stage: string]: boolean }>({})
  const [ selectedCharacters, setSelectedCharacters] = useState<string[]>([])
  
  const { filters, handleFilterChange } = useFilters(['f2p', 'max5']);
  const abyssTopTeams = useApi('abyss/stats/top-abyss-teams.json');
  const { activeTabIdx, onTabChange } = useTabs();

  const [searchParams, setSearchParams] = useSearchParams();
  
  async function fetchAbyssData() {
    await Promise.all(map(range(1,4), async (stageNum) => {
      return axios.get(`https://raw.githubusercontent.com/bouhm/mondstats-data/develop/abyss/${tabs[activeTabIdx]}-${stageNum}.json`, {
      // return axios.get(`https://bouhm.github.io/mondstats-data/abyss/${floor.value}.json`, {
        headers: { 'accept': 'application/vnd.github.v3.raw+json' },
      }).then(res => ({ [stageNum]: res.data }))
    })).then(data => loadAbyssFloorTeams(data))
  }

  function loadAbyssFloorTeams(data: any) {
    const combinedStageTeams: any = {};
    forEach(data, (abyssFloorData) => {
      forEach(abyssFloorData, (stageData, stage) => {
        combinedStageTeams[stage] = stageData
      })
    })

    setAbyssFloorTeams(abyssFloorTeams)
  }

  useEffect(() => {
    if (activeTabIdx !== 0) {
      fetchAbyssData();
    }
  }, [setAbyssFloorTeams, activeTabIdx])

  function _filterParties(parties: IAbyssParty[]) {
    return filter(parties, ({ coreParty, flex}) => {
      let charFilter = true;
      let cond = false;

      forEach(flex, _flex => {
        if (!_flex[0]) return false;

        const party = [...coreParty, _flex[0].charId]
  
        charFilter = (filter(party, char => {
          if (typeof char !== "string") return false;
          return characterDb[char].rarity > 4 && characterDb[char].name !== "Traveler"
        }).length <= filters.max5!.value)
        
        if (!cond) cond = (charFilter && difference(selectedCharacters, party).length === 0);
      })

      return cond;
    })
  }

  const handleToggleLimit = (selectedStage: string) => {
    let newMap: { [stage: string]: boolean } = clone(stageLimitToggle)
    newMap[selectedStage] = newMap[selectedStage] ? !newMap[selectedStage] : true;
    setStageLimitToggle(newMap)
  }

  const handlePartyChange = (party: string[]) => {
    setSelectedCharacters(party)
    const count5 = countBy(party, char => characterDb[char].rarity);

    if (count5['5'] > filters.max5!.value) {
      handleFilterChange('max5', count5['5'])
    }
  }

  const renderTopTeams = () => {
    const total = reduce(abyssTopTeams, (sum,curr) => sum + curr.battleCount, 0)

    return (
      <>
        <h2 className="stage-label">Top Teams</h2>
        <div className="stage-half">
          <h2>{total} Teams</h2>
          {map(take(filter(abyssTopTeams, ({ flex }) => flex[0] && flex[0].length), stageLimitToggle["ALL"] ? 20 : 10), ({coreParty, flex, battleCount, winCount, avgStar}, i) => {
            const party = [...coreParty, flex[0][0].charId]
            return <React.Fragment key={`parties-ALL-${i}`}>
              <div className="battle-container">
                <Team team={party} battleCount={battleCount} winCount={winCount} avgStar={avgStar} flex={flex} total={total} />
              </div>
            </React.Fragment>
          })}
          {(abyssTopTeams.length > 10) && (!stageLimitToggle["ALL"] ?
            <Button className="stage-teams-show-more" onClick={() => handleToggleLimit("ALL")}>Show more <ChevronDown size={20} /></Button>
            :
            <Button className="stage-teams-show-more" onClick={() => handleToggleLimit("ALL")}>Show less <ChevronUp size={20} /></Button>
          )}
        </div>
    </>
    )
  }

  const renderFloorTeams = () => {
    if (!abyssFloorTeams) {
      return <Loader />
    }

    return map(range(1, 4), stage => <AbyssStage 
      key={`floor-${tabs[activeTabIdx]}-${stage}-teams`}
      stageData={abyssFloorTeams[stage]} 
      floor={tabs[activeTabIdx]}
      stage={stage}
      stageLimitToggle={stageLimitToggle} 
      onToggleLimit={handleToggleLimit}
    />)
  }
  
  const renderTeams = () => (
    <div className="floor-container">
      <div key={tabs[activeTabIdx]} className="stage-container">
        {tabs[activeTabIdx] === "ALL" ? renderTopTeams() : renderFloorTeams()}
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
      <CardSearch.Characters items={filter(searchCharacters, character => !includes(selectedCharacters, character._id))} onSelect={handlePartyChange} showCards={false}/>
      <br />
      <h1>Abyss Teams</h1>
      <Tabs activeTabIdx={activeTabIdx} onChange={onTabChange} tabs={map(tabs, (floor => typeof floor === 'number' ? `FLOOR ${floor}` : floor.toString()))} />
      {!isEmpty(characterDb) && renderTeams()}
    </div>
  )
}

export default AbyssPage;
