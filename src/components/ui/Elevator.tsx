import './Elevator.scss';

import _, { values } from 'lodash';
import React, { useState } from 'react';

import { ChevronDown, ChevronUp } from './Icons';

type ToggleProps = {
  label?: string;
  values: string[] | number[];
  defaultIndex?: number;
  onChange: () => void;
  disabled?: boolean;
}

function Elevator({ label, defaultIndex = 0, disabled=false, onChange }: ToggleProps) {
  const [index, setIndex] = useState<number>(defaultIndex)

  const handleIncrease = () => {
    if (index < values.length - 1) {
      setIndex(index + 1);
      onChange()
    }
  }

  const handleDecrease = () => {
    if (index > 0) {
      setIndex(index - 1);
      onChange()
    }
  }


  return (
    <div className={`elevator-container ${disabled ? 'asDisabled' : ''}`}>
      <span>{label}</span>
      <div className="elevator">
        <div className="elevator-up-button" onClick={handleIncrease}>
          <ChevronUp />
        </div>
        {/* wtf typescript it's an array */}
        <div className="elevator-value">{_.get(values, index)}</div> 
        <div className="elevator-down-button" onClick={handleDecrease}>
          <ChevronDown />
        </div>
      </div>
    </div>
  )
}

export default Elevator
