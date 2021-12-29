import './BarChart.scss';

import { map } from 'lodash';
import React, { ReactNode } from 'react';

type BarChartProps = {
  data: {
    tooltip?: string,
    content?: ReactNode,
    value: number,
    classes: string
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
        {map(data, ({ content, classes, value }, i) => {
          return (
            <div key ={`${value}-${i}`} className={`barchart-bar ${classes}`} style={{ ...barStyle(value)}} />
          )
        })}
      </div>
      <div 
        className="content-container"
        style={barChartStyle}
      >
        {map(data, ({ content }, i) => <div key={i}  className={"bar-content"}>{content}</div>)}
      </div>
    </>
  )
}

export default BarChart