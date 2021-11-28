import './Delta.scss';

import { isEqual } from 'lodash';
import React from 'react';

import { CaretDown, CaretUp } from '../ui/Icons';

type DeltaProps = {
  current: number,
  last: number
}

function Delta({ current, last }: DeltaProps) {
  const diff = Math.floor((current - last) * 100) / 100;
  const className = diff > 0 ? "asPos" : "asNeg";

  if (isEqual(diff, 0)) {
    return (
      <div className="delta-container">
        <div className="delta-none">-</div>
      </div>
    )
  }

  return (
    <div className="delta-container">
      {diff > 0 ? (<CaretUp color={"#32CD32"}/>) : (<CaretDown color={"#DC143C"}/>)}
      <div className={`delta-value ${className}`}>{diff}</div>
    </div>
  )
}

export default Delta