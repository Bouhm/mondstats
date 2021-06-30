import './Toggle.css';

import _ from 'lodash';
import React, { useState } from 'react';

type ToggleProps = {
  label: string;
  defaultValue: boolean
  onChange: () => void;
}

function Toggle({ label, defaultValue, onChange }: ToggleProps) {
  const [checked, setChecked] = useState(defaultValue)

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked);
    onChange()
  }

  return (
    <div className="toggle-container">
      <label>{label}</label>
      <div className="toggle">
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <span className="toggle-slider"></span>
      </div>
    </div>
  )
}

export default Toggle
