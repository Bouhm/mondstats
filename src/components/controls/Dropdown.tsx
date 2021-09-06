import './Dropdown.scss';

import React, { ReactNode, useEffect, useRef, useState } from 'react';
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
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (searchRef.current) {
        if (window.scrollY < 100) {
          searchRef.current!.classList.remove("sticky")
        } else {
          searchRef.current!.classList.add("sticky")
        }
      }
    })
  }, [searchRef])

  return (
    <div ref={searchRef} className="multi-select">
      <Select 
        options={options} 
        onChange={onChange} 
        defaultValue={defaultValue} 
        isMulti={isMulti} 
        isSearchable={false}
        placeholder={<>{placeholder}&hellip;</>}
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
  value?: Option[]
}

function SearchSelect({ onChange, onInput, options, defaultValue, placeholder="Search", optionLabel, isMulti = false, showDropdown = true, value=[]}: SearchProps & { options: Option[], optionLabel: (opt: Option)=>ReactNode }) {
  const searchRef = useRef<HTMLDivElement>(null);
  const [shouldStick, setShouldStick] = useState(false);
  
  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (searchRef.current) {
        if (window.scrollY < 100) {
          searchRef.current!.classList.remove("sticky")
          setShouldStick(false)
        } else {
          searchRef.current!.classList.add("sticky")
          setShouldStick(true)
        }
      }
    })
  }, [searchRef])

  return (
    <div ref={searchRef} className="search-select">
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
            <Search className="search-icon" size={20} />
            {placeholder}&hellip;
          </div>
        }
        components={{
          Menu: (showDropdown || shouldStick) ?  (props) => <components.Menu {...props} /> : () => null,
          DropdownIndicator: showDropdown ?  (props) => <components.DropdownIndicator {...props} /> : () => null
        }}
        styles={{ 
          container: base => ({ ...base }),
          singleValue: base => ({ ...base, color: "white" }),
          input: base => ({ ...base, color: "white" }),
          valueContainer: base => ({ ...base, backgroundColor: "#232530",  border: "2px solid rgba(0,0,0,0.1)", minHeight: "3rem", fontSize: "1.2rem"}),
          placeholder: base => ({ ...base, width: '100%' }),
          control: base =>  ({ ...base, borderColor: "none" }),
          indicatorsContainer: base => ({ ...base, backgroundColor: "rgba(0,0,0,0.9)" }),
          indicatorSeparator: base => ({ ...base, display: 'none '}),
          menu: base => ({ ...base, backgroundColor: "#21232D", color: "white" }),
          option: base => ({ ...base, backgroundColor: "#21232D !important", "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6) !important" }}),
        }}
      />
    </div>
  )
}

export default { MultiSelect, SearchSelect }