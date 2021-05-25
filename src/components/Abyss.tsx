import './Abyss.css';

import _ from 'lodash';
import React, { useContext, useState } from 'react';

import { IAbyssData, IBattle } from '../data/types';
import { Store } from '../Store';
import CharacterTile from './CharacterTile';
import Dropdown, { Option } from './ui/Dropdown';

function Abyss(abyss: IAbyssData) {
  const options = _.flatten(_.map(_.keys(abyss), floor => {
    return _.flatten(_.map(_.keys(abyss[floor]), stage => {
      return { label: `${floor}-${stage}`, value:`${floor}-${stage}`}
    }))
  }))

  const [{ selectedCharacter, characterDb }] = useContext(Store)
  const [ selectedStages, selectStages ] = useState<Option[]>([options[0]])

  let teamCount = 0;

  const handleSelect = (selected: Option[]) => {
    selectStages(selected);
  }

  const renderParties = () => (
    <div className="abyss-container">
      {_.map(selectedStages, selectedStage => {
        console.log(selectedStage)
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
                      }), 'count', 'desc'), 5), ({party, count}, j) => (
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
            <div className="stage-teams-show-more">Show more</div>
        </div>
      })}
    </div>
  )

  return (
    <div className="abyss-container">
      <h1>Abyss Teams</h1>
      <Dropdown options={options} onChange={handleSelect} isMulti />
      <div className="floor-container">
       {renderParties()}
      </div>
    </div>
  )
}

export default Abyss;