import './Abyss.scss';

import AmberSad from '/assets/amberSad.webp';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';

import AbyssData from '../../data/abyssData.json';
import { IAbyssBattle } from '../../data/types';
import { useAppSelector } from '../../hooks';
import Team from '../characters/Team';
import Button from '../ui/Button';
import Dropdown, { Option } from '../ui/Dropdown';
import { ChevronDown, ChevronUp } from '../ui/Icons';
import Toggle from '../ui/Toggle';
import PartySelector from './PartySelector';

const _compareFloor = (f1: Option, f2: Option) => {
  const f1Strs = f1.value.split("-")
  const f2Strs = f2.value.split("-")

  if (parseInt(f1Strs[0]) === parseInt(f2Strs[0])) {
    return parseInt(f1Strs[1]) - parseInt(f2Strs[1])
  } else {
    return parseInt(f1Strs[0]) - parseInt(f2Strs[0])
  }
}

function Abyss() {
  const options = _.map(AbyssData.abyss, stage => {
    return { label: stage.floor_level, value: stage.floor_level}
  }).sort(_compareFloor)

  const characterDb = useAppSelector((state) => state.data.characterDb)
  const defaultStages = _.filter(options, option => _.includes(["12-1", "12-2", "12-3"], option.value));

  const [ stageLimitToggle, setStageLimitToggle ] = useState<{ [stage: string]: boolean }>({})
  const [ selectedStages, selectStages ] = useState<Option[]>(defaultStages)
  const [ filteredAbyss, setFilteredAbyss ] = useState<IAbyssBattle[]>(AbyssData.abyss)
  const [ characters, setCharacters ] = useState<string[]>([]);
  const [ f2p, setF2p ] = useState(false);

  useEffect(() => {
    setFilteredAbyss(_filterAbyss(AbyssData.abyss));
  }, [setFilteredAbyss, characters, selectedStages, f2p])

  function _filterAbyss(data: IAbyssBattle[]) {
    let filteredAbyss = _.cloneDeep(data)
  
    _.forEach(filteredAbyss, floor => {
      _.forEach(floor.battle_parties, (battle, i) => {
        floor.battle_parties[i] = _.filter(battle, ({party}) => {
          let f2pFilter = !f2p;

          if (f2p) {
            const fivesCount = _.filter(characters, charId => characterDb[charId].rarity > 4 ? 1 : 0).length;
            f2pFilter = (_.filter(party, char => characterDb[char].rarity > 4 && characterDb[char].name !== "Traveler").length === fivesCount)
          } 
          
          return f2pFilter && _.difference(characters, party).length === 0
        })
      })
    })
  
    return filteredAbyss;
  }

  const handleSelect = (selected: Option[]) => {
    selectStages(selected);
  }

  const handleToggleLimit = (selectedStage: string) => {
    let newMap: { [stage: string]: boolean } = _.clone(stageLimitToggle)
    newMap[selectedStage] = newMap[selectedStage] ? !newMap[selectedStage] : true;
    setStageLimitToggle(newMap)
  }

  const handleToggleF2p = () => {
    setF2p(!f2p)
  }

  const handlePartyChange = (party: string[]) => {
    setCharacters(party)
  }

  const renderParties = () => (
    <div className="floor-container">
      {_.map(selectedStages.sort(_compareFloor), selectedStage => {
        return (
          <div key={selectedStage.value} className="stage-container">
          <h2 className="stage-label">Floor {selectedStage.label}</h2>
          <div className="stage-half">
            {_.map(_.filter(filteredAbyss, { floor_level: selectedStage.value }), ({battle_parties}) => (
              <>
                {_.map([battle_parties[0]], (parties, i) => (
                  <>
                    <h2>{_.reduce(parties, (sum,curr) => sum + curr.count, 0)} Teams</h2>
                    <div key={`battle-${i}`} className="battle-container">
                      {/* <h2>{i+1}{i+1 === 1 ? 'st' : 'nd'} Half</h2> */}
                      {parties.length > 1 ? 
                        <>
                          {_.map(_.take(_.orderBy(parties, 'count', 'desc'), stageLimitToggle[selectedStage.value] ? 10 : 5), ({party, count}, j) => {
                              return (
                                <Team key={`team-${i}`} team={party} count={count} percent={`${Math.round((count / _.reduce(parties, (sum,curr) => sum + curr.count, 0) * 1000)/10)}%`} />
                              )
                            })
                          }
                        </>
                        :
                        <img src={AmberSad} alt="empty" />
                      }
                    </div>
                  </>
                ))}
                {_.some(battle_parties, parties => parties.length > 5) && (!stageLimitToggle[selectedStage.value] ?
                  <Button className="stage-teams-show-more" onClick={() => handleToggleLimit(selectedStage.value)}>Show more <ChevronDown size={20} color={"#202020"} /></Button>
                  :
                  <Button className="stage-teams-show-more" onClick={() => handleToggleLimit(selectedStage.value)}>Show less <ChevronUp size={20} color={"#202020"} /></Button>
                )}
              </>
            ))}
          </div>
        </div>
        )
      })}
    </div>
  )

  return (
    <div className="abyss-container">
      <div className="abyss-controls">
        <Toggle label={"F2P"} defaultValue={f2p} onChange={handleToggleF2p} />
      </div>
      <PartySelector onPartyChange={handlePartyChange} />
      <br />
      <h1>Abyss Teams</h1>
      <Dropdown.MultiSelect options={options} onChange={handleSelect} defaultValue={defaultStages} isMulti={true} />
      <div className="abyss-disclaimer">{"* 1st & 2nd halves have been temporarily merged until there is more data."}</div>
      {!_.isEmpty(characterDb) && renderParties()}
    </div>
  )
}

export default Abyss;