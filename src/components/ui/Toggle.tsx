import './Toggle.scss';

import _ from 'lodash';
import React, { useState } from 'react';

type ToggleProps = {
  label?: string;
  value: boolean
  color?: string
  onChange: () => void;
}

function Toggle({ label, color="#CECBC4", value, onChange }: ToggleProps) {
  const [checked, setChecked] = useState(value)

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked);
    onChange()
  }

  return (
    <div className="toggle-container">
      <span>{label}</span>
      <div className="toggle">
        <input id="switch" type="checkbox" checked={checked} onChange={handleChange} />
        <label htmlFor="switch" style={checked ? {backgroundColor: color} : {}} />
      </div>
    </div>
  )
}

export default Toggle
