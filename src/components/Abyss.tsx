import { Chart, registerables } from 'chart.js';
import _ from 'lodash';
import React, { useEffect, useRef } from 'react'
import { IAbyss } from '../data/types';
import CharacterTile from './CharacterTile';
import './Abyss.css'

function Abyss({ party, floors, total }: IAbyss) {
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
  }, [])

  return (
    <div className="abyss-container">
      <div className="party-container">
        {_.map(_.keys(party), charId => <CharacterTile key={charId} id={charId} />)}
      </div>
      <div className="floor-chart">
        <canvas id={"abyss-bar-chart"} ref={barChartRef} />
      </div>
    </div>
  )
}

export default Abyss;