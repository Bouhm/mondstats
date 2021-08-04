import './Dropdown.scss';

import { filter, map, orderBy, some } from 'lodash';
import React, { ReactNode } from 'react';
import Select, { components } from 'react-select';

import { getCharacterFileName, getShortName } from '../../scripts/util';
import { useAppSelector } from '../hooks/useRedux';
import { Search } from './Icons';

export type Option = { value: string, label: string }

type SelectProps = {
  options: Option[]
  onChange: (e: any) => void
  defaultValue?: Option[] | Option
  isMulti?: boolean
}

function MultiSelect({ options, onChange, isMulti=false, defaultValue=options.slice(0,1) }: SelectProps) {
  return (
    <div className="multi-select">
      <Select 
        options={options} 
        onChange={onChange} 
        defaultValue={defaultValue} 
        isMulti={isMulti} 
        isSearchable={false}
        styles={{ 
          container: base => ({ ...base }),
          singleValue: base => ({ ...base, color: "white" }),
          valueContainer: base => ({ ...base, backgroundColor: "#232530",  border: "2px solid rgba(0,0,0,0.1)", minHeight: "3rem", fontSize: "1.2rem"}),
          control: base =>  ({ ...base, borderColor: "none" }),
          indicatorsContainer: base => ({ ...base, backgroundColor: "rgba(0,0,0,0.9)" }),
          menu: base => ({ ...base, backgroundColor: "#21232D", color: "white",  }),
          option: base => ({ ...base, backgroundColor: "#21232D !important", "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6) !important" }}),
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
}

function SearchSelect({ onChange, onInput, options, defaultValue, placeholder="Search character", optionLabel, isMulti = false, showDropdown = true}: SearchProps & { options: Option[], optionLabel: (opt: Option)=>ReactNode }) {
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
        placeholder={
          <div className="search-placeholder">
            <Search className="search-icon" size={20} />
            {placeholder}&hellip;
          </div>
        }
        components={{
          Menu: showDropdown ?  (props) => <components.Menu {...props} /> : () => null,
          DropdownIndicator: showDropdown ?  (props) => <components.DropdownIndicator {...props} /> : () => null
        }}
        styles={{ 
          container: base => ({ ...base }),
          singleValue: base => ({ ...base, color: "white" }),
          input: base => ({ ...base, color: "white" }),
          valueContainer: base => ({ ...base, backgroundColor: "#232530",  border: "2px solid rgba(0,0,0,0.1)", minHeight: "3rem", fontSize: "1.2rem"}),
          placeholder: base => ({ ...base, width: '100%' }),
          control: base =>  ({ ...base, borderColor: "none" }),
          indicatorsContainer: base => ({ ...base, backgroundColor: "rgba(0,0,0,0.9)", display: `${showDropdown ? 'initial' : 'none'}` }),
          menu: base => ({ ...base, backgroundColor: "#21232D", color: "white" }),
          option: base => ({ ...base, backgroundColor: "#21232D !important", "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6) !important" }}),
        }}
      />
    </div>
  )
}

export default { MultiSelect, SearchSelect }