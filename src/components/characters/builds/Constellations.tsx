import './Constellations.scss';

import _, { map } from 'lodash';
import React, { ReactNode } from 'react';

import { ElementColors } from '../../../data/constants';
import { getPercentage } from '../../../scripts/util';
import { useAppSelector } from '../../hooks/useRedux';
import BarChart from '../../ui/BarChart';
import LLImage from '../../ui/LLImage';
import Tooltip from '../../ui/Tooltip';

type ConstellationsProps = {
  constellations: number[],
  total: number,
  color: string
}

type ConstellationCardProps = {
  name: string,
  oid?: number,
  effect?: string,
  count: number, 
  children: ReactNode,
  i: number
}

function ConstellationCard({ oid, i, name, count, children }: ConstellationCardProps) {
  return (
    <Tooltip content={`${name}: ${count}`}>
      <div className="constellation-card"> 
        <div className="constellation-card-icon">
          {name === "C0" ? 
            <>C0</> : <>{oid && <LLImage src={`/assets/characters/constellations/${oid}.webp`} alt={`C${i}`} />}</>
          }
        </div>
        {children}
      </div>
    </Tooltip>
  )
}

function Constellations({ constellations, total, color }: ConstellationsProps ) {
  const selectedCharacter = useAppSelector((state) => state.data.selectedCharacter)
  const characterDb = useAppSelector((state) => state.data.characterDb)

  const generateChartData = () => {
    return map(constellations, (count, i) => {
      const percentage = getPercentage(count, total);

      return { 
        tooltip: `C${i}`, 
        value: 1 + Math.round((count / total * 1000)/10), 
        color: i === 0 ? ElementColors.none : color,
        content: (
          <>
          {i === 0 ?
            <ConstellationCard name={"C0"} i={i} count={count}>
              <div className="constellation-popularity">{percentage}%</div>
              {/* <p>Count: {count}</p> */}
            </ConstellationCard>
            :
            <ConstellationCard {...characterDb[selectedCharacter].constellations[i-1]} i={i} count={count}>
              <div className="constellation-popularity">{percentage}%</div>
              {/* <p>Count: {count}</p> */}
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
    </div>
  </div>
  )
}

export default Constellations