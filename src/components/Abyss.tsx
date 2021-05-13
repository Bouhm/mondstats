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
  const [{ characterBuilds, selectedCharacter, characterDb }] = useContext(Store)
  let datasetsArr: IDataset[][] = []
  let labelArr: string[][] = [
    ["Floor 9-1", "Floor 9-2", "Floor 9-3"],
    ["Floor 10-1", "Floor 10-2", "Floor 10-3"],
    ["Floor 11-1", "Floor 11-2", "Floor 11-3"],
    ["Floor 12-1", "Floor 12-2", "Floor 12-3"]
  ]
  const charTotal = characterBuilds[selectedCharacter].total;

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
    let grpedSrtedFloors = _.groupBy(sortedFloors, floor => floor.split("_")[2]);

    let i = 0;
    datasetsArr.push(
      _.map(grpedSrtedFloors, (stages) => {
        return ({
          label: ["1st Half", "2nd Half"][i++],
          data: _.map(stages, floor => floors[floor]),
          backgroundColor: elemColors[characterDb[selectedCharacter].element.toLocaleLowerCase()]
        })
      })
    )
  })

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
        <Chart
          id="floor9-chart"
          className="floors-chart"
          type="bar"
          labels={labelArr[0]}
          datasets={datasetsArr[0]}
          max={charTotal}
        />
        <Chart
          id="floor10-chart"
          className="floors-chart"
          type="bar"
          labels={labelArr[1]}
          datasets={datasetsArr[1]}
          max={charTotal}
        />
        <Chart
          id="floor11-chart"
          className="floors-chart"
          type="bar"
          labels={labelArr[2]}
          datasets={datasetsArr[2]}
          max={charTotal}
        />
        <Chart
          id="floor12-chart"
          className="floors-chart"
          type="bar"
          labels={labelArr[3]}
          datasets={datasetsArr[3]}
          max={charTotal}
        />
      </div>
    </div>
  )
}

export default Abyss;