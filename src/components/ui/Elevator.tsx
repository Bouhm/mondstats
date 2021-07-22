import './Elevator.scss';

import _ from 'lodash';
import React, { useState } from 'react';

import { ChevronDown, ChevronUp } from './Icons';

type ToggleProps = {
  label?: string;
  values: string[] | number[];
  defaultIndex?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

function Elevator({ label, defaultIndex = 0, disabled=false, values, onChange }: ToggleProps) {
  const [index, setIndex] = useState<number>(defaultIndex)

  const handleIncrease = () => {
    if (index < values.length - 1) {
      setIndex(index + 1);
      onChange(index + 1)
    }
  }

  const handleDecrease = () => {
    if (index > 0) {
      setIndex(index - 1);
      onChange(index - 1)
    }
  }


  return (
    <div className={`elevator-container ${disabled ? 'asDisabled' : ''}`}>
      <span>{label}</span>
      <div className="elevator">
        <div className="elevator-up-button" onClick={handleIncrease}>
          <ChevronUp />
        </div>
        <div className="elevator-value">{values[index]}</div> 
        <div className="elevator-down-button" onClick={handleDecrease}>
          <ChevronDown />
        </div>
      </div>
    </div>
  )
}

export default Elevator
