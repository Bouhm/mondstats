import './Abyss.scss';

import AmberSad from '/assets/amberSad.webp';
import axios from 'axios';
import _, {
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
  orderBy,
  reduce,
  some,
  take,
} from 'lodash';
import React, { useEffect, useState } from 'react';

import { IAbyssBattle, IParty } from '../../data/types';
import { getCharacterLabel, getPercentage } from '../../scripts/util';
import Team from '../characters/Team';
import F2P from '../filters/F2P';
import useFilters from '../filters/useFilters';
import useApi from '../hooks/useApi';
import { useAppSelector } from '../hooks/useRedux';
import Button from '../ui/Button';
import Dropdown, { Option } from '../ui/Dropdown';
import { ChevronDown, ChevronUp } from '../ui/Icons';
import Loader from '../ui/Loader';
import PartySelector from './PartySelector';
import Tabs, { useTabs } from '../ui/Tabs';
import CardSearch from '../ui/CardSearch';

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

function _range(size: number, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

function Abyss() {
  const floors = _range(4, 9);
  const tabs = ['ALL', ...floors]
  const options = [{ label: "ALL", value: "ALL" }, ...flatten(map(floors, floor => {
    return map(_range(3,1), stage => {
      return { label: `${floor}-${stage}`, value: `${floor}-${stage}`}
    })
  })).sort(_compareFloor)]

  const characterDb = useAppSelector((state) => state.data.characterDb)
  const characters = map(characterDb, (character) => {
    return ({
      _id: character._id,
      name: getCharacterLabel(character),
      rarity: character.rarity,
      keys: character.element
    })
  });

  const [ AbyssData, setAbyssData ] = useState<IAbyssBattle[]>([]);
  const [ selectedStages, selectStages ] = useState<Option[]>([options[0]])
  const [ stageLimitToggle, setStageLimitToggle ] = useState<{ [stage: string]: boolean }>({})
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([])
  
  const { filters, handleFilterChange } = useFilters();
  const abyssTopTeams = useApi('abyss/top-teams.json');

  const { activeTabIdx, onTabChange } = useTabs();

  useEffect(() => {
    async function fetchAbyssData() {
      await Promise.all(map(filter(selectedStages, stage => stage.value !== "ALL"), floor => {
        const floorIdx = findIndex(AbyssData, { floor_level: floor.value })

        if (floorIdx < 0) {
          return axios.get(`https://bouhm.github.io/favonius-data/abyss/${floor.value}.json`, {
            headers: { 'accept': 'application/vnd.github.v3.raw+json' },
          }).then(res => res.data)
        } else {
          return AbyssData[floorIdx]
        }
      })).then(data => setAbyssData(data))
    }

    fetchAbyssData();
  }, [setAbyssData, selectedStages])

  function _filterParties(parties: IParty[]) {
    return filter(parties, ({party}) => {
      let charFilter = true;

      if (filters.f2p) {
        charFilter = (filter(party, char => {
          if (typeof char !== "string") return false;
          return characterDb[char].rarity > 4 && characterDb[char].name !== "Traveler"
        }).length <= filters.max5)
      } 
      
      return charFilter && difference(selectedCharacters, party).length === 0
    })
  }

  function _filterAbyss() {
    let filteredAbyssFloors = cloneDeep(AbyssData)

    forEach(filteredAbyssFloors, floor => {
      forEach(floor.battle_parties, (battle, i) => {
        floor.battle_parties[i] = _filterParties(battle);
      })
    })
  
    return filteredAbyssFloors;
  }

  function _filterTopTeams() {
    return _filterParties(abyssTopTeams);
  }

  const handleTabChange = (tabIdx: number) => {
    handleSelect(filter(options, option => option.value.split('-')[0] === tabs[tabIdx] + ''))
    onTabChange(tabIdx)
  }

  const handleSelect = (selected: Option[]) => {
    selectStages(selected);
  }

  const handleToggleLimit = (selectedStage: string) => {
    let newMap: { [stage: string]: boolean } = clone(stageLimitToggle)
    newMap[selectedStage] = newMap[selectedStage] ? !newMap[selectedStage] : true;
    setStageLimitToggle(newMap)
  }

  const handlePartyChange = (party: string[]) => {
    setSelectedCharacters(party)
    const count5 = countBy(party, char => characterDb[char].rarity);

    if (filters.f2p) {
      if (count5['5'] > filters.max5) {
        handleFilterChange('max5', count5['5'])
      }
    }
  }

  const renderTopTeams = () => {
    const filteredTopTeams = _filterTopTeams();
    const total = reduce(filteredTopTeams, (sum,curr) => sum + curr.count, 0)

    return (
      <>
        <h2 className="stage-label">Top Teams</h2>
        <div className="stage-half">
          <h2>{total} Teams</h2>
          {map(take(filteredTopTeams, stageLimitToggle["ALL"] ? 10 : 5), ({party, count}, i) => (
            <React.Fragment key={`parties-ALL-${i}`}>
              <div key={`battle-ALL-${i}`} className="battle-container">
                <Team key={`team-ALL-${i}`} team={party} count={count} percent={`${getPercentage(count, total)}%`} />
              </div>
            </React.Fragment>
          ))}
          {(filteredTopTeams.length > 5) && (!stageLimitToggle["ALL"] ?
            <Button className="stage-teams-show-more" onClick={() => handleToggleLimit("ALL")}>Show more <ChevronDown size={20} color={"#202020"} /></Button>
            :
            <Button className="stage-teams-show-more" onClick={() => handleToggleLimit("ALL")}>Show less <ChevronUp size={20} color={"#202020"} /></Button>
          )}
        </div>
    </>
    )
          }

  const renderFloorParties = (selectedStage: Option) => {
    const filteredAbyssFloors = _filterAbyss();

    return (
      <>
        <h2 className="stage-label">Floor {selectedStage.label}</h2>
        <div className="stage-half">
          {!some(filteredAbyssFloors, { floor_level: selectedStage.value }) && <Loader />}
          {map(filter(filteredAbyssFloors, { floor_level: selectedStage.value }), ({battle_parties}, i) => (
            <React.Fragment key={`floor-${selectedStage.value}-${i}`}>
              {map([battle_parties[0]], (parties, j) => (
                <React.Fragment key={`parties-${selectedStage.value}-${i}-${j}`}>
                  <h2>{reduce(parties, (sum,curr) => sum + curr.count, 0)} Teams</h2>
                  <div key={`battle-${selectedStage.value}-${i}-${j}`} className="battle-container">
                    {/* <h2>{j+1}{j+1 === 1 ? 'st' : 'nd'} Half</h2> */}
                    {parties.length > 1 ? 
                      <>
                        {map(take(orderBy(parties, 'count', 'desc'), stageLimitToggle[selectedStage.value] ? 10 : 5), ({party, count}, i) => {
                            return (
                              <Team key={`team-${selectedStage.value}-${i}`} team={party} count={count} percent={`${getPercentage(count, reduce(parties, (sum,curr) => sum + curr.count, 0))}%`} />
                            )
                          })
                        }
                      </>
                      :
                      <img src={AmberSad} alt="empty" />
                    }
                  </div>
                </React.Fragment>
              ))}
              {some(battle_parties, parties => parties.length > 5) && (!stageLimitToggle[selectedStage.value] ?
                <Button className="stage-teams-show-more" onClick={() => handleToggleLimit(selectedStage.value)}>Show more <ChevronDown size={20} color={"#202020"} /></Button>
                :
                <Button className="stage-teams-show-more" onClick={() => handleToggleLimit(selectedStage.value)}>Show less <ChevronUp size={20} color={"#202020"} /></Button>
              )}
            </React.Fragment>
          ))}
        </div>
      </>
    )
  }
  
  const renderParties = () => (
    <div className="floor-container">
      {map(selectedStages.sort(_compareFloor), selectedStage => {
        return (
          <div key={selectedStage.value} className="stage-container">
            {selectedStage.value === "ALL" ? renderTopTeams() : renderFloorParties(selectedStage)}
          </div>
        )
      })}
    </div>
  )

  if (!characterDb || isEmpty(abyssTopTeams)) {
    return <Loader />
  }

  return (
    <div className="abyss-container">
      <div className="abyss-controls">
        <F2P onChange={handleFilterChange} f2p={filters.f2p} max5={filters.max5} />
      </div>
      <CardSearch.Characters items={filter(characters, character => !includes(selectedCharacters, character._id))} onSelect={handlePartyChange} showCards={false}/>
      <br />
      <h1 title={"Data from teams that 3-starred the respective floors"}>Abyss Teams</h1>
      <Tabs activeTabIdx={activeTabIdx} onChange={handleTabChange} tabs={map(tabs, (floor => typeof floor === 'number' ? `FLOOR ${floor}` : floor.toString()))} />
      {!isEmpty(characterDb) && renderParties()}
    </div>
  )
}

export default Abyss;