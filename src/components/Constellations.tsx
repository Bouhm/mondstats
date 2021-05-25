import './Constellations.css';

import _ from 'lodash';
import React, { ReactNode, useContext } from 'react';

import { Store } from '../Store';
import { Circle } from './ui/Icons';
import Tooltip from './ui/Tooltip';

type ConstellationsProps = {
  constellations: number[],
  total: number
}

type ConstellationCardProps = {
  name: string,
  icon?: string,
  effect?: string,
  children: ReactNode
}

function ConstellationCard({ name, icon, effect, children }: ConstellationCardProps) {
  return (
    <div className="constellation-card">
      <div className="constellation-card-icon">
        {icon ? <img src={icon} alt={name} /> : "NONE"}
      </div>
      {children}
    </div>
  )
}

function Constellations({ constellations, total  }: ConstellationsProps ) {
  const [{ selectedCharacter, characterDb },] = useContext(Store)

  return (
    <div className="constellations-container">
    {_.map(constellations, (count, i) => {
      let popularity = Math.round((count / total * 1000)/10)

      return (
        <div key={`constellation-${i}`} className="bar-chart constellation-bar-container">
          <div 
            className={`bar-chart-bar constellation-bar ${characterDb[selectedCharacter].element.toLowerCase()}`} 
            style={{ height: `${popularity}%` }}
          >
            <Tooltip 
              alignment="vertical"
              content={`C${i}: ${count}`}
            />
          </div>
          {i === 0 ?
            <ConstellationCard name={"None"}>
              <div className="constellation-popularity">{Math.round(count/total * 100)}%</div>
            </ConstellationCard>
            :
            <ConstellationCard {...characterDb[selectedCharacter].constellations[i-1]}>
              <div className="constellation-popularity">{Math.round(count/total * 100)}%</div>
            </ConstellationCard>
          }
        </div>
      )
    })}
  </div>
  )
}

export default Constellations