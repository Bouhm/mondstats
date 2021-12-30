
import './HorizontalBarChart.scss';

import { map, take } from 'lodash';
import React from 'react';

import { getCharacterLabel, getPercentage } from '../../scripts/util';
import Button from '../controls/Button';
import useExpand from '../hooks/useExpand';
import { useAppSelector } from '../hooks/useRedux';
import UsagePct from '../stats/UsagePct';
import { ChevronDown, ChevronUp } from './Icons';
import LLImage from './LLImage';

export interface IBarChartData {
  _id: string,
  count: number,
  // avgStar?: number,
  // winCount?: number
}

type HorizontalBarChart = {
  total: number,
  db: any,
  data: IBarChartData[],
  path: string
}

function HorizontalBarChart({ data, db, total, path }: HorizontalBarChart) {
  const { expanded, handleExpand } = useExpand();
  const colorClass = useAppSelector((state) => state.data.colorClass)
  const max = 7;
  
  return <div className="horizontal-barchart-container">
    {map(take(data, expanded ? 20 : max), ({ _id, count }, i) => {
      const popularity = getPercentage(count, total);

      if (!db[_id]) return null;
      const { name, rarity } = db[_id];
      const charFile = name === 'Traveler' ? 'traveler' : _id;

      return (
        <div key={`${_id}-${count}-${i}`} className="horizontal-barchart">
          <div className={`bar-card`}>
            <div className='bar-card-title'>
              <LLImage className={`rarity-${rarity}`} src={`/assets/${path}/${charFile}.webp`} alt={name} />
              <div className="bar-card-detail">
                <div className="bar-card-name">
                  {getCharacterLabel(db[_id])}
                </div>
                <UsagePct count={count || count} total={total} />
              </div>
            </div>
            {/* {winCount && avgStar &&
              <>
                <Divider />
                <AbyssStat label="Win Rate" value={`${getPercentage(winCount, count)}%`} />
                <AbyssStat label="Avg Star" value={`★${avgStar.toFixed(2)}`} />
              </>
            } */}
            </div>
          <div className="horizontal-barchart-bar">
            <div  
              className={`barchart-bar ${colorClass}`} 
              style={{ width: `${popularity}%` }} 
            />
          </div>
        </div>
      )
    })}
    <br />
      {data.length > max && (
        <Button className="weapons-show-more" onClick={handleExpand}>
          {!expanded ? <>Show more <ChevronDown size={20} /></> : <>Show less <ChevronUp size={20} /></>}
        </Button>
      )}
  </div>
}

export default HorizontalBarChart;