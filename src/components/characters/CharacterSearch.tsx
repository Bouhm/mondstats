import './CharacterSearch.css';

import _, { isEmpty } from 'lodash';
import React from 'react';

import { getShortName } from '../../scripts/util';
import { useAppSelector } from '../hooks/useRedux';
import Dropdown, { Option } from '../ui/Dropdown';

type CharacterSearchProps =
 {
  onSelect?: (char: string) => void;
  filter?: string[];
}

function CharacterSearch({ filter = [], onSelect }: CharacterSearchProps) {
  const handleSelect = (char: Option) => {
    onSelect && onSelect(char.value);
  }

  return (
    <div className="character-search">
      <div className="character-searchbar">
        <Dropdown.CharacterSearchSelect
          charFilter={filter}
          onChange={handleSelect}
        />
      </div>
    </div>
  )
}

export default CharacterSearch;