import './Abyss.css';

import _ from 'lodash';
import React, { useContext, useEffect, useRef } from 'react';

import { IAbyssData } from '../data/types';
import { Store } from '../Store';
import elemColors from './builds/colors';
import CharacterTile from './CharacterTile';
import Chart, { IDataset } from './ui/Chart';
import Tooltip from './ui/Tooltip';

function Abyss({ party, floors, total }: IAbyssData) {
  const [{ allData, selectedCharacter, characterDb }] = useContext(Store)

  const charTotal = characterBuilds[selectedCharacter].total;

  const renderParties = () => {
    _.map(allData.abyss, floor => {
      
      return _.map(floor, stage => {
        return _.map(stage, battle =>{

        })
      })
    })
  }

  return (
    <div className="abyss-container">
      <h1>Party Members</h1>
      <div className="party-container">
        {_.map(_.take(_.sortBy(_.toPairs(party), 1).reverse(), 8), charPair => {
          let popularity = Math.round((charPair[1] / total * 1000)/10)
          let characterName = characterDb[charPair[0]].name;

          return (
            <div key={charPair[0]} className="bar-chart party-bar-container">
              <div 
                className={`bar-chart-bar party-bar ${characterDb[selectedCharacter].element.toLowerCase()}`} 
                style={{ height: `${popularity}%` }}
              >
                <Tooltip 
                  alignment="vertical"
                  content={`${characterName}: ${charPair[1]}`}
                />
              </div>
              <CharacterTile id={charPair[0]}>
                <div className="party-popularity">{Math.round(charPair[1]/total * 100)}%</div>
              </CharacterTile>
            </div>
          )
        })}
      </div>
      <h1>Abyss Floors</h1>
      <div className="floors-chart-container">
      </div>
    </div>
  )
}

export default Abyss;