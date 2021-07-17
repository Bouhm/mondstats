import './Abyss.scss';

import AmberSad from '/assets/amberSad.png';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AbyssData from '../../data/abyssData.json';
import { IAbyssBattle } from '../../data/types';
import { useAppSelector } from '../../hooks';
import { getShortName } from '../../scripts/util';
import CharacterTile from '../characters/CharacterTile';
import Button from '../ui/Button';
import Dropdown, { Option } from '../ui/Dropdown';
import { ChevronDown, ChevronUp } from '../ui/Icons';
import Tooltip from '../ui/Tooltip';
import PartySelector from './PartySelector';

function _filterAbyss(data: IAbyssBattle[], charId: string) {
  let filteredAbyss = _.cloneDeep(data)
  
  _.forEach(filteredAbyss, floor => {
    _.forEach(floor.battle_parties, battle => {
      battle = _.filter(battle, team => team.party.includes(charId))
    })
  })

  return filteredAbyss;
}

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
  })

  const selectedCharacter = useAppSelector((state) => state.data.selectedCharacter)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const defaultStages = options.slice(options.length-3)

  const [ stageLimitToggle, setStageLimitToggle ] = useState<{ [stage: string]: boolean }>({})
  const [ selectedStages, selectStages ] = useState<Option[]>(defaultStages)
  const [ filteredAbyss, setFilteredAbyss ] = useState<IAbyssBattle[]>(AbyssData.abyss)

  useEffect(() => {
    setFilteredAbyss(_filterAbyss(AbyssData.abyss, selectedCharacter));
  }, [setFilteredAbyss, selectedCharacter, selectedStages])

  const handleSelect = (selected: Option[]) => {
    selectStages(selected);
  }

  const handleToggleLimit = (selectedStage: string) => {
    let newMap: { [stage: string]: boolean } = _.clone(stageLimitToggle)
    newMap[selectedStage] = newMap[selectedStage] ? !newMap[selectedStage] : true;
    setStageLimitToggle(newMap)
  }

  const renderParties = () => (
    <div className="floor-container">
      {_.map(selectedStages.sort(_compareFloor), selectedStage => {
        return <div key={selectedStage.value} className="stage-container">
          <h2 className="stage-label">Floor {selectedStage.label}</h2>
          <div className="stage-half">
            {_.map(_.filter(filteredAbyss, { floor_level: selectedStage.value }), ({battle_parties}) => {
              return _.map(battle_parties, (parties, i) => (
                  <div key={`battle-${i}`} className="battle-container">
                    <h2>{i+1}{i+1 === 1 ? 'st' : 'nd'} Half</h2>
                    {parties.length > 1 ? 
                      <>
                        {_.map(_.take(_.orderBy(parties, 'count', 'desc'), stageLimitToggle[selectedStage.value] ? 10 : 5), ({party, count}, j) => {
                            return (
                              <div key={`party-${i}-${j}`} className="party-container">
                               <div className="party-grid">
                                  {_.map(party, (char, k) => (
                                    <Link key={`party-${char}-${i}`} to={`/builds/${getShortName(characterDb[char].name)}`}>
                                      <CharacterTile id={char+''} labeled={false} />
                                    </Link>
                                  ))}
                                  <div className="party-popularity">
                                    <p className="popularity-pct">{Math.round((count / _.reduce(parties, (sum,curr) => sum + curr.count, 0) * 1000)/10)}%</p>
                                    <p className="popularity-line">Count: {count}</p>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </>
                      :
                      <img src={AmberSad} alt="empty" />
                    }
                  </div>
                )
              )
            })}
            </div>
            {!stageLimitToggle[selectedStage.value] ?
              <Button className="stage-teams-show-more" onClick={() => handleToggleLimit(selectedStage.value)}>Show more <ChevronDown size={20} color={"#202020"} /></Button>
              :
              <Button className="stage-teams-show-more" onClick={() => handleToggleLimit(selectedStage.value)}>Show less <ChevronUp size={20} color={"#202020"} /></Button>
            }
        </div>
      })}
    </div>
  )

  return (
    <div className="abyss-container">
      <PartySelector />
      <Dropdown options={options} onChange={handleSelect} defaultValue={defaultStages} isMulti />
      {!_.isEmpty(characterDb) && renderParties()}
    </div>
  )
}

export default Abyss;