import './BarChart.scss';

import _ from 'lodash';
import React, { ReactNode } from 'react';

type BarChartProps = {
  data: {
    content?: ReactNode,
    value: number,
    color?: string
  }[]
}

function BarChart({data}: BarChartProps) {

  return (
    <dl 
      className="barchart-container"
      style={{gridTemplateColumns: `repeat(${data.length}, 1fr)`}}
    >
      {_.map(data, ({ content, color, value }, i) => {
        return (
          <div key ={`_bar-${value}-${i}`} className={`_bar-${value}`} style={{backgroundColor: color}}>
            <div className={"bar-content"}>{content}</div>
          </div>
        )
      })}
    </dl>
  )
}

export default BarChart