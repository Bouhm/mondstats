import './Dropdown.scss';

import React, { ReactNode, useState } from 'react';
import Select, { components } from 'react-select';

import { Search } from '../ui/Icons';

export type Option = { value: string, rarity?: number, label: string }

type SelectProps = {
  options: Option[]
  onChange: (e: any) => void
  defaultValue?: Option[] | Option
  isMulti?: boolean
  placeholder?: string
}

function MultiSelect({ options, onChange, isMulti=false, placeholder="", defaultValue=options.slice(0,1) }: SelectProps) {
  return (
    <div className="multi-select">
      <Select 
        options={options} 
        onChange={onChange} 
        defaultValue={defaultValue} 
        isMulti={isMulti} 
        isSearchable={false}
        placeholder={<>{placeholder}&hellip;</>}
        styles={{ 
          container: base => ({ ...base }),
          singleValue: base => ({ ...base }),
          placeholder: base => ({ ...base, color: 'rgba(0,0,0,0.3)' }),
          valueContainer: base => ({ ...base, minHeight: "3rem", fontSize: "1.2rem"}),
          control: base =>  ({ ...base, borderColor: "none", border: 'none', backgroundColor: '#13222E', borderRadius: '12px', overflow: 'hidden' }),
          indicatorsContainer: base => ({ ...base, backgroundColor: '#13222E' }),
          clearIndicator: base => ({ ...base, padding: 0 }),
          dropdownIndicator: base => ({ ...base, padding: 0 }),
          menu: base => ({ ...base }),
          menuPortal: base => ({ ...base, zIndex: 11 }),
          option: base => ({ ...base, backgroundColor: "#e9e5dc !important", "&:hover": { backgroundColor: "#CCC8C1 !important" }}),
        }}
      />
    </div>
  )
}

type SearchProps = {
  onChange: (e: any) => void
  onInput?: (s: string) => void
  placeholder?: string
  defaultValue?: Option[] | Option
  isMulti?: boolean
  maxSelected?: number
  showDropdown?: boolean
  optionLabel: ReactNode
  value?: Option[]
}

function SearchSelect({ onChange, onInput, options, defaultValue, placeholder="Search", optionLabel, isMulti = false, showDropdown = true, value=[]}: SearchProps & { options: Option[], optionLabel: (opt: Option)=>ReactNode }) {
  const [shouldStick, setShouldStick] = useState(false);
  
  return (
    <div className="search-select">
      <Select 
        options={options} 
        onChange={onChange} 
        onInputChange={onInput}
        defaultValue={defaultValue} 
        isMulti={isMulti}
        isSearchable={true}
        formatOptionLabel={optionLabel}
        value={value}
        placeholder={
          <div className="search-placeholder">
            <Search className="search-icon" color="#15C48A" size={20} />
            {placeholder}&hellip;
          </div>
        }
        components={{
          Menu: (showDropdown || shouldStick) ?  (props) => <components.Menu {...props} /> : () => null,
          DropdownIndicator: showDropdown ?  (props) => <components.DropdownIndicator {...props} /> : () => null,
        }}
        styles={{ 
          container: base => ({ ...base }),
          singleValue: base => ({ ...base }),
          input: base => ({ ...base }),
          valueContainer: base => ({ ...base, backgroundColor: "#e9e5dc", minHeight: "3rem", fontSize: "1.2rem"}),
          placeholder: base => ({ ...base, color: 'rgba(0,0,0,0.3)', width: '100%' }),
          control: base =>  ({ ...base, borderColor: "none", border: 'none', backgroundColor: '#13222E', borderRadius: '12px', overflow: 'hidden' }),
          indicatorsContainer: base => ({ ...base, backgroundColor: '#13222E' }),
          clearIndicator: base => ({ ...base, padding: 0 }),
          dropdownIndicator: base => ({ ...base, padding: '0.1rem' }),
          indicatorSeparator: base => ({ ...base, display: 'none' }),
          menu: base => ({ ...base }),
          option: base => ({ ...base, backgroundColor: "#e9e5dc !important", "&:hover": { backgroundColor: "#CCC8C1 !important" } }),
        }}
      />
    </div>
  )
}

export default { MultiSelect, SearchSelect }