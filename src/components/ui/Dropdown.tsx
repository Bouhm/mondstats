import './Dropdown.scss';

import { filter, map, orderBy, some } from 'lodash';
import React, { ReactNode } from 'react';
import Select from 'react-select';

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
  placeholder?: string
  defaultValue?: Option[] | Option
}

function CharacterSearchSelect(props: SearchProps & { charFilter: string[]}) {
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const characterIdMap = useAppSelector((state) => state.data.characterIdMap)

  const options = orderBy(
    filter(
      map(characterDb, (char) => {
        if (char.name === "Traveler") return { label: `${char.name} (${char.element})`, value: getShortName(char) }
        return { label: char.name, value: getShortName(char) }
      }),
    ({ value }) => !some(props.charFilter, name => value.split('-')[0] === name.split('-')[0])),
  'label', 'asc')

  const OptionLabel = ({ value, label }: Option) => {
    const character = characterDb[characterIdMap[value]];

    return (
      <div className="character-option" key={label}>
        <div className="character-option-image">
          <img className="character-option-element" src={`/assets/elements/${character.element}.webp`} />
          <img className="character-option-portrait" src={`/assets/characters/${getCharacterFileName(character)}.webp`} alt={`${value}-portrait`} />
        </div>
        <div className="character-option-label">{label}</div>
      </div>
    ) as ReactNode;
  }

  return <SearchSelect {...props} optionLabel={OptionLabel} options={options} />
}

function SearchSelect({ onChange, options, defaultValue, placeholder="Search character", optionLabel }: SearchProps & { options: Option[], optionLabel: (opt: Option)=>ReactNode }) {
  return (
    <div className="search-select">
      <Select 
        options={options} 
        onChange={onChange} 
        defaultValue={defaultValue} 
        isMulti={false}
        isSearchable={true}
        formatOptionLabel={optionLabel}
        placeholder={
          <div className="search-placeholder">
            <Search className="search-icon" size={20} />
            {placeholder}&hellip;
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

export default { MultiSelect, CharacterSearchSelect }