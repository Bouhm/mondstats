import './F2P.scss';

import _ from 'lodash';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import Elevator from '../ui/Elevator';
import Toggle from '../ui/Toggle';

type ToggleProps = {
  color?: string,
  onChange: (val: number) => void,
  value: number
}

function F2P({ color, onChange, value }: ToggleProps) {
  const [f2p, toggleF2p] = useState(false)
  
  const handleToggleF2p = () => {
    toggleF2p(!f2p)
    const newVal = !f2p ? (value > -1 ? value : 0) : -1;

    onChange(newVal)
  }

  const handleChange = (max5: number) => {
    onChange(max5)
  }

  return (
    <div className="f2p-filter">
      <Toggle color={color} label={`${value > 2 ? "F2P?" : "F2P"}`} value={f2p} onChange={handleToggleF2p} />
      <Elevator disabled={!f2p} onChange={handleChange} values={[0,1,2,3,4]} />
    </div>
  )
}

export default F2P