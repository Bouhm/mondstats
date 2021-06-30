import './BarChart.scss';

import _ from 'lodash';
import React, { ReactNode } from 'react';

type BarChartProps = {
  data: {
    content?: ReactNode,
    value: number
  }[]
}

function BarChart({data}: BarChartProps) {
  return (
    <dl className="chart">
      {_.map(data, ({ content, value }) => {
        return (
          <div className={`_bar-${value}`}>
            {content && content}
          </div>
        )
      })}
    </dl>
  )
}

export default BarChart