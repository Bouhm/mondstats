
import './HorizontalBarChart.scss';

import { map } from 'lodash';
import React from 'react';

import { getPercentage } from '../../scripts/util';
import AbyssStat from '../stats/AbyssStat';
import UsagePct from '../stats/UsagePct';
import Divider from './Divider';
import LLImage from './LLImage';
import Tooltip from './Tooltip';

export interface IBarChartData {
  _id: string,
  count: number,
  // avgStar?: number,
  // winCount?: number
}

type HorizontalBarChart = {
  color: string, 
  total: number,
  db: any,
  data: IBarChartData[],
  path: string
}

function HorizontalBarChart({ data, db, total, color, path }: HorizontalBarChart) {
  console.log(data)
  return <div className="horizontal-barchart-container">
    {map(data, ({ _id, count }, i) => {
      const popularity = getPercentage(count, total);
      const { name, rarity } = db[_id];

      return (
        <div key={`${_id}-${count}-${i}`} className="horizontal-barchart">
          <div className={`bar-card`}>
            <div className='bar-card-title'>
              <LLImage className={`rarity-${rarity}`} src={`/assets/${path}/${_id}.webp`} alt={name} />
              <div className="bar-card-detail">
                <div className="bar-card-name">
                  {name}
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
              className={`barchart-bar`} 
              style={{ width: `${popularity}%`, backgroundColor: color }} 
            />
          </div>
        </div>
      )
    })}
  </div>
}

export default HorizontalBarChart;