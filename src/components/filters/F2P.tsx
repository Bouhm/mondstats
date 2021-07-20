import './F2P.scss';

import _, { values } from 'lodash';
import React, { useState } from 'react';

import Elevator from '../ui/Elevator';
import Toggle from '../ui/Toggle';

type ToggleProps = {
  color?: string
  onChange: () => void;
}

function F2P({ color, onChange }: ToggleProps) {
  const [f2p, toggleF2p] = useState(false)
  
  const handleToggleF2p = () => {
    toggleF2p(!f2p)
  }

  const handleChange = () => {
    onChange()
  }

  return (
    <div className="f2p-filter">
      <Toggle color={color} label={"F2P"} value={f2p} onChange={handleToggleF2p} />
      <Elevator disabled={f2p} onChange={handleChange} />
    </div>
  )
}

export default F2P
