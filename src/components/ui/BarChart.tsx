import './BarChart.scss';

import _ from 'lodash';
import React, { ReactNode, useEffect } from 'react';

type BarChartProps = {
  data: {
    tooltip?: string,
    content?: ReactNode,
    value: number,
    color?: string,
  }[],
  orientation?: string
}

function BarChart({data, orientation="vertical"}: BarChartProps) {
  const barStyle = orientation === "vertical" ? {gridTemplateColumns: `repeat(${data.length}, 1fr)`} : {gridTemplateRows: `repeat(${data.length}, 1fr)`}

  return (
    <>
      <div 
        className="barchart-container"
        style={barStyle}
      >
        {_.map(data, ({ content, color, value }, i) => {
          return (
            <div key ={`_bar-${value}-${i}`} className={`_bar-${value}`} style={{backgroundColor: color}} />
          )
        })}
      </div>
      <div 
        className="content-container"
        style={barStyle}
      >
        {_.map(data, ({ content }, i) => <div key={i}  className={"bar-content"}>{content}</div>)}
      </div>
    </>
  )
}

export default BarChart