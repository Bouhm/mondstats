
import './HorizontalBarChart.scss';

import { map } from 'lodash';
import React from 'react';

import { getPercentage, shortenId } from '../../scripts/util';
import LLImage from './LLImage';
import Tooltip from './Tooltip';
import Divider from './Divider';

export interface IBarChartData {
  _id: string,
  count: number,
  avgStar?: number,
  winCount?: number
}

type HorizontalBarChart = {
  color: string, 
  total: number,
  db: any,
  data: IBarChartData[],
  path: string
}

function HorizontalBarChart({ data, db, total, color, path }: HorizontalBarChart) {
  return <div className="horizontal-barchart-container">
    {map(data, ({ _id, count, avgStar, winCount }, i) => {
      const popularity = getPercentage(count, total);
      const { name, rarity } = db[_id];

      return (
        <div key={`${_id}-${count}-${i}`} className="horizontal-barchart">
          <div className={`bar-card`}>
            <Tooltip content={`${name}: ${count}`}>
              <div className='bar-card-title'>
                <LLImage className={`rarity-${rarity}`} src={`/assets/${path}/${shortenId(_id)}.webp`} alt={name} />
                <div className="bar-card-detail">
                  <div className="bar-card-name">
                    {name}
                  </div>
                  <div className="bar-card-popularity">
                    <div className="bar-card-popularity-pct">{popularity}%</div>
                  </div>
                </div>
              </div>
            </Tooltip>
            {avgStar &&
              <>
                <Divider />
                <div className='bar-abyss-stats'>
                  <Tooltip content={`Average Abyss Star: ${avgStar.toFixed(2)}`}>
                    <div className={`bar-abyss-avgStar`}>
                    <span className='bar-abyss-stat-title'>Avg Clear</span><br/>
                      ★{avgStar?.toFixed(2)}
                    </div>
                  </Tooltip>
                </div>
              </>
            }
            {
              winCount &&
              <>
                <Divider />
                <div className='bar-abyss-stats'>
                  <Tooltip content={`Abyss 3-Star Clears: ${winCount}`}>
                    <div className={`bar-abyss-winCount`}>
                      <span className='bar-abyss-stat-title'>Win Rate</span><br/>
                      {winCount}
                    </div>
                  </Tooltip>
                </div>
              </>
            }
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