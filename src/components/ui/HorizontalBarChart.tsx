
import './HorizontalBarChart.scss';

import { map } from 'lodash';
import React from 'react';

import { getPercentage, shortenId } from '../../scripts/util';
import LLImage from './LLImage';
import Tooltip from './Tooltip';

export interface IBarChartData {
  _id: string,
  count: number
}

type HorizontalBarChart = {
  color: string, 
  total: number,
  db: any,
  data: IBarChartData[]
}

function HorizontalBarChart({ data, db, total, color }: HorizontalBarChart) {
  return <div className="horizontal-barchart-container">
    {map(data, ({ _id, count }, i) => {
      const popularity = getPercentage(count, total);
      const { name, rarity } = db[_id];

      return (
        <div key={`${_id}-${count}-${i}`} className="horizontal-barchart">
          <Tooltip content={`${name}: ${count}`}>
            <div className={`bar-card`}>
              <LLImage className={`rarity-${rarity}`} src={`/assets/weapons/${shortenId(_id)}.webp`} alt={name} />
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