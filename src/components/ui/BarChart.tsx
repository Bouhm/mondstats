import _ from 'lodash';
import React from 'react';
import './BarChart.css'

type BarChartProps = {
  data: {
    label: string,
    value: number
  }[]
}

function BarChart({data}: BarChartProps) {
  return (
    <dl className="bar-chart">
      {_.map(data, ({ label, value }) => {
        return (
          <>
            <dt className="bar-chart-label">{label}</dt>
            <dd className="bar">{value}%</dd>
          </>
        )
      })}
    </dl>
  )
}

export default BarChart