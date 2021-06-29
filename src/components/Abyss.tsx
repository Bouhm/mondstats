import './Abyss.css';

import AmberSad from '/assets/amberSad.png';
import _ from 'lodash';
import { element } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';

import { IAbyssBattle } from '../data/types';
import { useAppSelector } from '../hooks';
import CharacterTile from './CharacterTile';
import Dropdown, { Option } from './ui/Dropdown';
import { ChevronDown, ChevronUp } from './ui/Icons';
import Tooltip from './ui/Tooltip';

function _filterAbyss(data: IAbyssBattle[], charId: string) {
  let filteredAbyss = _.cloneDeep(data)
  
  _.forEach(filteredAbyss, floor => {
    _.forEach(floor.party_stats, battle => {
      battle = _.filter(battle, team => team.party.includes(charId))
    })
  })

  return filteredAbyss;
}

const _compareFloor = (f1: string, f2: string) => {
  const f1Strs = f1.split("-")
  const f2Strs = f2.split("-")

  if (parseInt(f1Strs[0]) === parseInt(f2Strs[0])) {
    return parseInt(f1Strs[1]) - parseInt(f2Strs[1])
  } else {
    return parseInt(f1Strs[0]) - parseInt(f2Strs[0])
  }
}

function Abyss(abyssBattles: IAbyssBattle[]) {
  const options = _.map(abyssBattles, stage => {
    return { label: stage.floor_level, value: stage.floor_level}
  })

  const selectedCharacter = useAppSelector((state) => state.data.selectedCharacter)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const defaultStages = options.slice(options.length-3)

  const [ stageLimitToggle, setStageLimitToggle ] = useState<{ [stage: string]: boolean }>({})
  const [ selectedStages, selectStages ] = useState<Option[]>(defaultStages)
  const [ filteredAbyss, setFilteredAbyss ] = useState<IAbyssBattle[]>(abyssBattles)

  useEffect(() => {
    setFilteredAbyss(_filterAbyss(abyssBattles, selectedCharacter));
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
      {_.map(_.map(selectedStages, stage => stage.value).sort(_compareFloor), selectedStage => {
        return <div key={selectedStage} className="stage-container">
          <h2 className="stage-label">Floor {selectedStage}</h2>
          <div className="stage-half">
            {_.map(_.filter(filteredAbyss, { floor_level: selectedStage }), ({party_stats}) => {
              return _.map(party_stats, (parties, i) => {
                return (
                  <div key={`battle-${i}`} className="battle-container">
                    <h2>{i+1}{i+1 === 1 ? 'st' : 'nd'} Half</h2>
                    {parties.length > 1 ? 
                      <>
                        {_.map(_.take(_.orderBy(parties, 'count', 'desc'), stageLimitToggle[selectedStage] ? 8 : 3), ({party, count}, j) => {
                            return (
                              <div key={`party-${i}-${j}`} className="party-container">
                                <div className="party-characters">
                                  {_.map(_.sortBy(party, char => characterDb[char].name), (char, i) => {
                                    return <CharacterTile id={char+''} key={`party-${i}`} />
                                  })}
                                </div>
                                <div className="party-popularity withTooltip">
                                  {Math.round((count/(_.reduce(parties, (sum,curr) => sum + curr.count, 0)) * 10) / 10 * 100)}%
                                  <Tooltip 
                                    content={`Party Count: ${count}`} 
                                    alignment="top"
                                  />
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
              })
            })}
            </div>
            {!stageLimitToggle[selectedStage] ?
              <div className="stage-teams-show-more" onClick={() => handleToggleLimit(selectedStage)}>Show more <ChevronDown size={20} color={"#202020"} /></div>
              :
              <div className="stage-teams-show-more" onClick={() => handleToggleLimit(selectedStage)}>Show less <ChevronUp size={20} color={"#202020"} /></div>
            }
        </div>
      })}
    </div>
  )

  return (
    <div className="abyss-container">
      <h1>Abyss Teams</h1>
      <Dropdown options={options} onChange={handleSelect} defaultValue={defaultStages} isMulti />
      {renderParties()}
    </div>
  )
}

export default Abyss;