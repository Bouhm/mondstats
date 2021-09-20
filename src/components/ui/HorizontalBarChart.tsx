
import React from 'react';

import { shortenId } from '../../scripts/util';
import LLImage from './LLImage';
import Tooltip from './Tooltip';

type HorizontalBarChart = {
  _id: string,
  name: string,
  count: number,
  rarity: number,
  popularity: number,
  i: number,
  color: string
}

function HorizontalBarChart({ _id, name, count, rarity, popularity, color, i }: HorizontalBarChart) {
  return (
    <div key={`${_id}-${count}-${i}`} className="horizontal-barchart">
      <Tooltip content={`${name}: ${count}`}>
        <div className={`bar-card`}>
          <LLImage className={`rarity-${rarity}`} src={`/assets/weapons/${shortenId(_id)}.webp`} alt={name} />
          <div className="bar-card-detail">
            <div className="bar-card-name">
              {name}
            </div>
            <div className="bar-popularity">
              <div className="bar-popularity-pct">{popularity}%</div>
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
}

export default HorizontalBarChart;