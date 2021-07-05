import './BarChart.scss';

import _ from 'lodash';
import React, { ReactNode, useEffect } from 'react';

type BarChartProps = {
  data: {
    tooltip?: string,
    content?: ReactNode,
    value: number,
    color?: string,
  }[]
}

function BarChart({data}: BarChartProps) {
  const total = 101;
  const barChartStyle = {
    gridTemplateColumns: `repeat(${data.length}, 1fr)`,
    gridColumnGap: '5px'
  } 

  const barStyle = (value: number) => {
    return {
      gridRowEnd: total,
      gridRowStart: total - value
    }
  } 

  return (
    <>
      <div 
        className="barchart-container"
        style={barChartStyle}
      >
        {_.map(data, ({ content, color, value }, i) => {
          return (
            <div key ={`${value}-${i}`} className={`barchart-bar`} style={{ ...barStyle(value), backgroundColor: color}} />
          )
        })}
      </div>
      <div 
        className="content-container"
        style={barChartStyle}
      >
        {_.map(data, ({ content }, i) => <div key={i}  className={"bar-content"}>{content}</div>)}
      </div>
    </>
  )
}

export default BarChart