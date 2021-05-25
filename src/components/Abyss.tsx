import './Abyss.css';

import _ from 'lodash';
import React, { useContext, useState } from 'react';

import { IAbyssData, IBattle } from '../data/types';
import { Store } from '../Store';
import CharacterTile from './CharacterTile';
import Dropdown, { Option } from './ui/Dropdown';
import { ChevronDown, ChevronUp } from './ui/Icons';

function Abyss(abyss: IAbyssData) {
  const options = _.flatten(_.map(_.keys(abyss), floor => {
    return _.flatten(_.map(_.keys(abyss[floor]), stage => {
      return { label: `${floor}-${stage}`, value:`${floor}-${stage}`}
    }))
  }))

  const [{ selectedCharacter, characterDb }] = useContext(Store)
  const [ stageLimitToggle, setStageLimitToggle ] = useState<{ [stage: string]: boolean }>({})
  const defaultStages = options.slice(options.length-3)
  const [ selectedStages, selectStages ] = useState<Option[]>(defaultStages)

  let teamCount = 0;

  const handleSelect = (selected: Option[]) => {
    selectStages(selected);
  }

  const handleToggleLimit = (selectedStage: string) => {
    let newMap: { [stage: string]: boolean } = _.clone(stageLimitToggle)
    newMap[selectedStage] = newMap[selectedStage] ? !newMap[selectedStage] : true;
    setStageLimitToggle(newMap)
  }

  const renderParties = () => (
    <div className="abyss-container">
      {_.map(selectedStages, selectedStage => {
        const [floorNum, stageNum] = selectedStage.value.split("-");

        return <div key={selectedStage.value} className="stage-container">
          <h2 className="stage-label">{selectedStage.value}</h2>
          <div className="stage-half">
            {_.map(abyss[floorNum][stageNum], ({teams}, i) => {
                return (
                  <div key={`battle-${i}`} className="battle-container">
                    <h2>{i+1}{i+1 === 1 ? 'st' : 'nd'} Half</h2>
                    {_.map(_.take(_.orderBy(_.filter(teams, team => {
                        if (team.party.includes(parseInt(selectedCharacter))) {
                          teamCount++
                          return true
                        } else {
                          return false
                        }
                      }), 'count', 'desc'), stageLimitToggle[selectedStage.value] ? 8 : 3), ({party, count}, j) => (
                        <div key={`party-${i}-${j}`} className="party-container">
                          <div className="party-characters">
                            {_.map(_.sortBy(party, char => characterDb[char].name), (char, i) => ( 
                              <CharacterTile id={char+''} key={`party-${i}`} />
                            ))}
                          </div>
                          <div className="party-popularity">{Math.round((count/teamCount * 10) / 10 * 100)}%</div>
                        </div>
                      ))
                    }
                  </div>
                )
              })}
            </div>
            {!stageLimitToggle[selectedStage.value] ?
              <div className="stage-teams-show-more" onClick={() => handleToggleLimit(selectedStage.value)}>Show more <ChevronDown size={20} color={"#202020"} /></div>
              :
              <div className="stage-teams-show-more" onClick={() => handleToggleLimit(selectedStage.value)}>Show less <ChevronUp size={20} color={"#202020"} /></div>
            }
        </div>
      })}
    </div>
  )

  return (
    <div className="abyss-container">
      <h1>Abyss Teams</h1>
      <Dropdown options={options} onChange={handleSelect} defaultValue={defaultStages} isMulti />
      <div className="floor-container">
       {renderParties()}
      </div>
    </div>
  )
}

export default Abyss;