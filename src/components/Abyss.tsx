import './Abyss.css';

import _ from 'lodash';
import React, { useContext, useEffect, useRef } from 'react';

import { IAbyss } from '../data/types';
import { Store } from '../Store';
import elemColors from './builds/colors';
import CharacterTile from './CharacterTile';
import Chart, { IDataset } from './ui/Chart';
import Tooltip from './ui/Tooltip';

function Abyss({ party, floors, total }: IAbyss) {
  const [{ selectedCharacter, characterDb }] = useContext(Store)
  let datasets: IDataset[] = []
  let labels: string[] = ["Floor 9", "Floor 10", "Floor 11", "Floor 12"]

  const _compareFloor = (f1: string, f2: string) => {
    const f1Strs = f1.split("_")
    const f2Strs = f2.split("_")

    if (parseInt(f1Strs[0]) === parseInt(f2Strs[0])) {
      if (parseInt(f1Strs[1]) === parseInt(f2Strs[1])) {
        return parseInt(f1Strs[2]) - parseInt(f2Strs[2])
      } else {
        return parseInt(f1Strs[1]) - parseInt(f2Strs[1])
      }
    } else {
      return parseInt(f1Strs[0]) - parseInt(f2Strs[0])
    }
  }

  const grouped = _.groupBy(_.keys(floors), floor => floor.split("_")[0]);

  _.forEach(grouped, floorGroup => {
    let sortedFloors = floorGroup.sort(_compareFloor);

    datasets.push({
      data: _.map(sortedFloors, floor => floors[floor]),
      backgroundColor: elemColors[characterDb[selectedCharacter].element.toLocaleLowerCase()]
    })
  })

  return (
    <div className="abyss-container">
      <h1>Party Members</h1>
      <div className="party-container">
        {_.map(_.take(_.sortBy(_.toPairs(party), 1).reverse(), 8), charPair => {
          let popularity = Math.round(charPair[1] / total * 100)
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
              <CharacterTile id={charPair[0]} />
            </div>
          )
        })}
      </div>
      <h1>Abyss Floors</h1>
      <div className="floors-chart-container">
        <Chart
          id="floors-chart"
          type="bar"
          labels={labels}
          datasets={datasets}
        />
      </div>
    </div>
  )
}

export default Abyss;