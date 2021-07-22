import './F2P.scss';

import { indexOf } from 'lodash';
import React, { useState } from 'react';

import Elevator from '../ui/Elevator';
import Toggle from '../ui/Toggle';
import { FilterChangeFunc, Filters } from './useFilters';

type ToggleProps = {
  color?: string,
  onChange: FilterChangeFunc,
  f2p: boolean,
  max5: number
}

function F2P({ color, onChange, f2p, max5 }: ToggleProps) {
  const values = [0,1,2,3,4];
  
  const handleToggleF2p = () => {
    onChange('f2p', !f2p)
    console.log("toggle", f2p)
  }

  const handleIndexChange = (index: number) => {
    onChange('max5', values[index])
  }

  return (
    <div className="f2p-filter">
      <Toggle color={color} label={`${max5 > 2 ? "F2P?" : "F2P"}`} value={!!f2p} onChange={handleToggleF2p} />
      <Elevator disabled={!f2p} onIndexChange={handleIndexChange} index={indexOf(values, max5)} values={values} />
    </div>
  )
}

export default F2P