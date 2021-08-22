import './CharacterSearch.css';

import { filter, map, orderBy, some } from 'lodash';
import React, { ReactNode } from 'react';

import { getCharacterFileName, getShortName } from '../../scripts/util';
import { useAppSelector } from '../hooks/useRedux';
import Dropdown, { Option } from '../ui/Dropdown';

type CharacterSearchProps =
 {
  onSelect?: (char: string) => void;
  charFilter?: string[];
}

function CharacterSearch({ charFilter = [], onSelect }: CharacterSearchProps) {
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const characterIdMap = useAppSelector((state) => state.data.characterIdMap)
  
  const handleSelect = (char: Option) => {
    onSelect && onSelect(char.value);
  }
  
  const options = orderBy(
    filter(
      map(characterDb, (char) => {
        if (char.name === "Traveler") return { label: `${char.name} (${char.element})`, rarity: char.rarity, value: getShortName(char) }
        return { label: char.name, rarity: char.rarity, value: getShortName(char) }
      }),
    ({ value }: Option) => !some(charFilter, name => value.split('-')[0] === name.split('-')[0])),
  'label', 'asc') as Option[]

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

  return (
    <div className="character-search">
      <div className="character-searchbar">
        <Dropdown.SearchSelect
          placeholder={"Search characters"}
          onChange={handleSelect}
          options={options}
          optionLabel={OptionLabel}
        />
      </div>
    </div>
  )
}

export default CharacterSearch;