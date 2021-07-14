import './Abyss.scss';

import AmberSad from '/assets/amberSad.png';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';

import AbyssData from '../../data/abyssData.json';
import { IAbyssBattle, IParty } from '../../data/types';
import { useAppSelector } from '../../hooks';
import CharacterTile from '../characters/CharacterTile';
import Dropdown, { Option } from '../ui/Dropdown';
import { ChevronDown, ChevronUp } from '../ui/Icons';

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
  const f2p = false;

  const options = _.map(AbyssData.battles, stage => {
    return { label: stage.floor_level, value: stage.floor_level}
  }).sort(_compareFloor)

  const selectedCharacter = useAppSelector((state) => state.data.selectedCharacter)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const defaultStages = options.slice(options.length-6)

  const [ stageLimitToggle, setStageLimitToggle ] = useState<{ [stage: string]: boolean }>({})
  const [ selectedStages, selectStages ] = useState<Option[]>(defaultStages)
  const [ filteredAbyssTeams, setFilteredAbyssTeams ] = useState<IParty[]>([])
  const [ filteredAbyssBattles, setFilteredAbyssBattles ] = useState<IAbyssBattle[]>([])

  useEffect(() => {
    setFilteredAbyssBattles(AbyssData.battles);
    setFilteredAbyssTeams(AbyssData.teams);
  }, [setFilteredAbyssBattles, setFilteredAbyssTeams, f2p])

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
        return <div key={selectedStage.value} className="stage-container TEMP-SINGLE-COL">
          <h2 className="stage-label">Floor {selectedStage.label}</h2>
          <div className="stage-half TEMP-SINGLE-COL">
            {_.map(_.filter(filteredAbyssBattles, { floor_level: selectedStage.value }), ({battle_parties}, i) => {
              return _.map(battle_parties, (parties, i) => {
                return (
                  <div key={`battle-${i}`} className="battle-container">
                    <h2>{i+1}{i+1 === 1 ? 'st' : 'nd'} Half</h2>
                    {parties.length > 1 ? 
                      <> 
                        {_.map(_.take(_.orderBy(parties, 'count', 'desc'), stageLimitToggle[selectedStage.value] ? 10 : 5), ({party, count}, j) => {
                            return (
                              <div key={`party-${i}-${j}`} className="party-container">
                                <div className="party-grid">
                                  {_.map(_.sortBy(party, char => characterDb[char].name), (char, i) => {
                                    return <CharacterTile id={char+''} key={`party-${i}`} />
                                  })}
                                </div>
                                <div className="party-popularity">
                                  {Math.round((count/(_.reduce(parties, (sum,curr) => sum + curr.count, 0)) * 10) / 10 * 100)}%
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