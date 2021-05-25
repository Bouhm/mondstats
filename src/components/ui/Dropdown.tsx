import React from 'react';
import Select from 'react-select';

export type Option = { value: string, label: string }

type DropdownProps = {
  options: Option[]
  onChange: (e: any) => void
  defaultValue?: Option[]
  isMulti?: boolean
}

function Dropdown({ options, onChange, isMulti=false, defaultValue=options.slice(0,1) }: DropdownProps) {

  return (
    <div className="dropdown">
      <Select options={options} onChange={onChange} defaultValue={defaultValue} isMulti={isMulti} />
    </div>
  )
}

export default Dropdown