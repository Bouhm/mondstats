import './Abyss.css';

import _ from 'lodash';
import React, { useContext, useState } from 'react';

import { IAbyssData, IBattle } from '../data/types';
import { Store } from '../Store';
import CharacterTile from './CharacterTile';

function Abyss(abyss: IAbyssData) {
  const [{ selectedCharacter, characterDb }] = useContext(Store)
  const [ floorNum, setFloorNum ] = useState<string>('9')
  let teamCount = 0;

  const renderParties = (stageNum: string) => (   
    <div className="stage-container">
      <h2 className="stage-label">{floorNum}-{stageNum}</h2>
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
                        {_.map(party, (char, i) => ( 
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
  )

  return (
    <div className="abyss-container">
      <h1>Party Members</h1>
      <div className="floor-container">
       {_.map(_.keys(abyss[floorNum]), renderParties)}
      </div>
      <h1>Abyss Floors</h1>
    </div>
  )
}

export default Abyss;