import './Abyss.css';

import _ from 'lodash';
import React, { useContext, useState } from 'react';

import { IAbyssData, IBattle } from '../data/types';
import { Store } from '../Store';
import CharacterTile from './CharacterTile';

function Abyss(abyss: IAbyssData) {
  const [{ selectedCharacter, characterDb }] = useContext(Store)
  const [ floorNum, setFloorNum ] = useState<string>('9')

  const renderParties = (stage: [IBattle, IBattle]) => {      
    return _.map(stage, ({teams, total}) =>{
      return _.map(_.take(_.orderBy(_.filter(teams, team => team.party.includes(parseInt(selectedCharacter))), 'count', 'desc'), 5), ({party, count}) => (
        <div className="party-container">
          <div className="party-characters">
            {_.map(party, (char, i) => ( 
              <CharacterTile id={char+''} key={`party-${i}`} />
            ))}
          </div>
          <div className="party-popularity">{count}</div>
        </div>
      ))
    })
  }

  return (
    <div className="abyss-container">
      <h1>Party Members</h1>
      <div className="floor-container">
       {_.map(abyss[floorNum], renderParties)}
      </div>
      <h1>Abyss Floors</h1>
    </div>
  )
}

export default Abyss;