import './Toggle.scss';

import React, { ReactNode, useState } from 'react';

type ToggleProps = {
  label?: ReactNode;
  value: boolean
  color?: string
  onChange: () => void;
}

function Toggle({ label, color="#1F7896", value, onChange }: ToggleProps) {
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
