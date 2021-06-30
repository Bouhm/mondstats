import './BarChart.scss';

import _ from 'lodash';
import React, { ReactNode, useEffect } from 'react';

type BarChartProps = {
  data: {
    content?: ReactNode,
    value: number,
    color?: string
  }[]
}

function BarChart({data}: BarChartProps) {
  return (
    <>
      <div 
        className="barchart-container"
        style={{gridTemplateColumns: `repeat(${data.length}, 1fr)`}}
      >
        {_.map(data, ({ content, color, value }, i) => {
          return (
            <div key ={`_bar-${value}-${i}`} className={`_bar-${value}`} style={{backgroundColor: color}} />
          )
        })}
      </div>
      <div 
        className="content-container"
        style={{gridTemplateColumns: `repeat(${data.length}, 1fr)`}}
      >
        {_.map(data, ({ content }, i) => <div key={i}  className={"bar-content"}>{content}</div>)}
      </div>
    </>
  )
}

export default BarChart