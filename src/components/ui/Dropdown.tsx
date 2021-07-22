import './Dropdown.scss';

import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { useAppSelector } from '../../useRedux';
import { getCharacterFileName } from '../../scripts/util';
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
  options: Option[]
  onChange: (e: any) => void
  defaultValue?: Option[] | Option
}

function SearchSelect({options, onChange, defaultValue }: SearchProps) {
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const characterIdMap = useAppSelector((state) => state.data.characterIdMap)

  if (_.isEmpty(characterDb) || _.isEmpty(characterIdMap)) return null;

  const OptionLabel = ({ value, label }: any) => {
    const character = characterDb[characterIdMap[value]];

    return (
      <div className="character-option" key={label}>
        <div className="character-option-image">
          <img className="character-option-element" src={`/assets/elements/${character.element}.webp`} />
          <img className="character-option-portrait" src={`/assets/characters/${getCharacterFileName(character)}.webp`} alt={`${value}-portrait`} />
        </div>
        <div className="character-option-label">{label}</div>
      </div>
    )
  }
  
  return (
    <div className="search-select">
      <Select 
        options={options} 
        onChange={onChange} 
        defaultValue={defaultValue} 
        isMulti={false}
        isSearchable={true}
        formatOptionLabel={OptionLabel}
        placeholder={
          <div className="search-placeholder">
            <Search className="search-icon" size={20} />
            Search character&hellip;
          </div>
        }
        styles={{ 
          container: base => ({ ...base }),
          singleValue: base => ({ ...base, color: "white" }),
          input: base => ({ ...base, color: "white" }),
          valueContainer: base => ({ ...base, backgroundColor: "#232530",  border: "2px solid rgba(0,0,0,0.1)", minHeight: "3rem", fontSize: "1.2rem"}),
          placeholder: base => ({ ...base, width: '100%' }),
          control: base =>  ({ ...base, borderColor: "none" }),
          indicatorsContainer: base => ({ ...base, backgroundColor: "rgba(0,0,0,0.9)" }),
          menu: base => ({ ...base, backgroundColor: "#21232D", color: "white",  }),
          option: base => ({ ...base, backgroundColor: "#21232D !important", "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6) !important" }}),
        }}
      />
    </div>
  )
}

export default { MultiSelect, SearchSelect }