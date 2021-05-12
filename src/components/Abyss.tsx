import { Chart, registerables } from 'chart.js';
import _ from 'lodash';
import React, { useContext, useEffect, useRef } from 'react'
import { IAbyss } from '../data/types';
import CharacterTile from './CharacterTile';
import './Abyss.css'
import { Store } from '../Store';

function Abyss({ party, floors, total }: IAbyss) {
  const [{ selectedCharacter, characterDb }] = useContext(Store)
  let barChartRef = useRef(null);

  useEffect(() => {
    Chart.register(...registerables)

    let labels: string[] = [];
    let data: number[] = [];

    _.forIn(floors, (count, floor) => {
      let label = "";

      labels.push(floor);
      data.push(count);
    })

    if (barChartRef && barChartRef.current) {
      new Chart(barChartRef.current!.getContext("2d"), {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              data
            }
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }
  }, [barChartRef])

  return (
    <div className="abyss-container">
      <h1>Party Members</h1>
      <div className="party-container">
        {_.map(_.take(_.sortBy(_.toPairs(party), 1).reverse(), 8), charPair => {
          let popularity = Math.round(charPair[1] / total * 100)

          return (
            <div key={charPair[0]} className="party-bar-container">
              <div 
                className={`party-bar ${characterDb[selectedCharacter].element.toLowerCase()}`} 
                style={{ height: `${popularity}%` }}
              />
              <CharacterTile id={charPair[0]} />
            </div>
          )
        })}
      </div>
      <h1>Abyss Floors</h1>
      <div className="floor-chart">
        <canvas id={"abyss-bar-chart"} ref={barChartRef} />
      </div>
    </div>
  )
}

export default Abyss;