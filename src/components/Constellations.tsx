import './Constellations.css';

import _ from 'lodash';
import React, { ReactNode, useContext } from 'react';

import { useAppSelector } from '../hooks';
import { Circle } from './ui/Icons';
import Tooltip from './ui/Tooltip';

type ConstellationsProps = {
  constellations: number[],
  total: number
}

type ConstellationCardProps = {
  name: string,
  id?: number,
  effect?: string,
  children: ReactNode
}

function ConstellationCard({ id, name, effect, children }: ConstellationCardProps) {
  return (
    <div className="constellation-card">
      <div className="constellation-card-icon">
        {id ? <img src={`/assets/characters/constellations/${id}.png`} alt={name} /> : "NONE"}
      </div>
      {children}
    </div>
  )
}

function Constellations({ constellations, total  }: ConstellationsProps ) {
  const selectedCharacter = useAppSelector((state) => state.data.selectedCharacter)
  const characterDb = useAppSelector((state) => state.data.characterDb)

  return (
    <div className="constellations-container">
    <h1>Constellations</h1>
    <div className="constellations-chart">
      {_.map(constellations, (count, i) => {
        let popularity = Math.round((count / total * 1000)/10).toFixed(1)

        return (
          <>
            {i === 1 && <div className="divider" />}
            <div key={`constellation-${i}`} className="bar-chart constellation-bar-container">
              <div 
                className={`bar-chart-bar constellation-bar ${characterDb[selectedCharacter].element.toLowerCase()} withTooltip`} 
                style={{ height: `${popularity}%` }}
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
      })}
      </div>
  </div>
  )
}

export default Constellations