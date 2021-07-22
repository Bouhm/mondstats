import './Elevator.scss';

import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import { ChevronDown, ChevronUp } from './Icons';

type ToggleProps = {
  label?: string;
  values: string[] | number[];
  index: number;
  onIndexChange: (value: number) => void;
  disabled?: boolean;
}

function Elevator({ label, index, disabled=false, values, onIndexChange }: ToggleProps) {
  const valIdx = index > -1 ? index : 0;

  const handleIncrease = () => {
    if (valIdx < values.length - 1) {
      onIndexChange(valIdx + 1)
    }
  }

  const handleDecrease = () => {
    if (valIdx > 0) {
      onIndexChange(valIdx - 1)
    }
  }

  return (
    <div className={`elevator-container ${disabled ? 'asDisabled' : ''}`}>
      <span className="elevator-label">{label}</span>
      <div className="elevator">
        <div className="elevator-up-button" onClick={handleIncrease}>
          <ChevronUp size={20} />
        </div>
        <div className="elevator-value">{values[valIdx]}</div> 
        <div className="elevator-down-button" onClick={handleDecrease}>
          <ChevronDown size={20} />
        </div>
      </div>
    </div>
  )
}

export default Elevator
