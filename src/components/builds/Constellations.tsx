import './Constellations.scss';

import _ from 'lodash';
import React, { ReactNode, useContext } from 'react';

import { useAppSelector } from '../../hooks';
import BarChart from '../ui/BarChart';
import elemColors from './colors';

type ConstellationsProps = {
  constellations: number[],
  total: number
}

type ConstellationCardProps = {
  name: string,
  oid?: number,
  effect?: string,
  children: ReactNode
}

function ConstellationCard({ oid, name, effect, children }: ConstellationCardProps) {
  return (
    <div className="constellation-card">
      <div className="constellation-card-icon">
        {oid ? <img src={`/assets/characters/constellations/${oid}.webp`} /> : "C0"}
      </div>
      {children}
    </div>
  )
}

function Constellations({ constellations, total }: ConstellationsProps ) {
  const selectedCharacter = useAppSelector((state) => state.data.selectedCharacter)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const elementColor = useAppSelector((state) => state.data.elementColor)

  const generateChartData = () => {
    return _.map(constellations, (count, i) => {
      return { 
        tooltip: `C${i}`, 
        value: 1 + Math.round((count / total * 1000)/10), 
        color: i === 0 ? elemColors.none : elementColor,
        content: (
          <>
          {i === 0 ?
            <ConstellationCard name={"None"}>
              <div className="constellation-popularity">{Math.round((count / total * 1000)/10)}%</div>
              <p>Count: {count}</p>
            </ConstellationCard>
            :
            <ConstellationCard {...characterDb[selectedCharacter].constellations[i-1]}>
              <div className="constellation-popularity">{Math.round((count / total * 1000)/10)}%</div>
              <p>Count: {count}</p>
            </ConstellationCard>
          }
          </>
        )
      }
    })
  }

  return (
    <div className="constellations-container">
    <h1>Constellations</h1>
    <div className="constellations-chart">
      <BarChart 
        data={generateChartData()} 
      ></BarChart>

      {/* {_.map(constellations, (count, i) => {
        let popularity = Math.round((count / total * 1000)/10)

        return (
          <>
            {i === 1 && <div className="divider" />}
            <div key={`constellation-${i}`} className="bar-chart constellation-bar-container">
              <div 
                className={`bar-chart-bar constellation-bar bar-${popularity} ${characterDb[selectedCharacter].element.toLowerCase()} withTooltip`} 
              >
                <Tooltip 
                  alignment="vertical"
                  content={`C${i}: ${count}`}
                />
              </div>
              {i === 0 ?
                <ConstellationCard name={"None"}>
                  <div className="constellation-popularity">{((count / total * 1000)/10).toFixed(1)}%</div>
                </ConstellationCard>
                :
                <ConstellationCard {...characterDb[selectedCharacter].constellations[i-1]}>
                  <div className="constellation-popularity">{((count / total * 1000)/10).toFixed(1)}%</div>
                </ConstellationCard>
              }
            </div>
          </>
        )
      })} */}
      </div>
  </div>
  )
}

export default Constellations