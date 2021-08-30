import './CardSearch.scss';

import Fuse from 'fuse.js';
import { debounce, difference, filter, find, includes, map, orderBy, times, uniq } from 'lodash';
import React, { ReactNode, useRef, useState } from 'react';

import { getCharacterFileName, shortenId } from '../../scripts/util';
import { useAppSelector } from '../hooks/useRedux';
import Dropdown, { Option } from '../ui/Dropdown';
import Card from './Card';
import LLImage from './LLImage';

type CardSearchProps = {
  items: SearchItem[]
  onSelect: (selectedIds: string[]) => void
  showCards?: boolean,
  placeholder?: string
  showAll?: boolean
}

export type SearchItem = {
  _id: string
  name: string,
  rarity: number,
  element?: string,
  keys?: string
}

type DDProps = {
  options: Option[], 
  OptionLabel: (o: Option)=>ReactNode 
  placeholder: string
}


function Characters(props: CardSearchProps) { 
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const options: Option[] = orderBy(map(props.items, (item) => {
    return ({ label: item.name, rarity: item.rarity, value: item._id }) as Option
  }),'label', 'asc')

  const OptionLabel = ({ value, rarity, label }: Option) => {
    const character = characterDb[value];

    return (
      <div className="item-option" key={label}>
        <div className={`item-option-image rarity-${rarity}`}>
          <img className="item-option-element" src={`/assets/elements/${character.element}.webp`} />
          <img className="item-option-portrait" src={`/assets/characters/${getCharacterFileName(character)}.webp`} alt={`${label}-portrait`} />
        </div>
        <div className="item-option-label">{label}</div>
      </div>
    ) as ReactNode;
  }

  return <CardSearch options={options} OptionLabel={OptionLabel} imgPath={"characters"} placeholder={"Search characters"} {...props} />
}

function ArtifactSets(props: CardSearchProps) { 
  const options: Option[] = orderBy(map(props.items, (item) => {
    return ({ label: item.name, rarity: item.rarity, value: item._id }) as Option
  }),'label', 'asc')

  const OptionLabel = ({ value, rarity, label }: Option) => {
    return (
      <div className="item-option" key={label}>
        <div className={`item-option-image rarity-${rarity}`}>
          <img className="item-option-portrait" src={`/assets/artifacts/${shortenId(value)}.webp`} alt={`${label}-portrait`} />
        </div>
        <div className="item-option-label">{label}</div>
      </div>
    ) as ReactNode;
  }

  return <CardSearch options={options} OptionLabel={OptionLabel} imgPath={"artifacts"} placeholder={"Search artifact sets"} {...props} />
}

function Weapons(props: CardSearchProps) { 
  const options: Option[] = orderBy(map(props.items, (item) => {
    return ({ label: item.name, rarity: item.rarity, value: item._id }) as Option
  }),'label', 'asc')

  const OptionLabel = ({ value, rarity, label }: Option) => {
    return (
      <div className="item-option" key={label}>
        <div className={`item-option-image rarity-${rarity}`}>
          <img className="item-option-portrait" src={`/assets/weapons/${shortenId(value)}.webp`} alt={`${label}-portrait`} />
        </div>
        <div className="item-option-label">{label}</div>
      </div>
    ) as ReactNode;
  }

  return <CardSearch options={options} OptionLabel={OptionLabel} imgPath={"weapons"} placeholder={"Search weapons"} {...props} />
}

function CardSearch({ items, imgPath, options, onSelect, OptionLabel, placeholder, showCards = true, showAll = false }: CardSearchProps & DDProps & { imgPath: string }) { 
  const [searchedItems, setSearchedItems] = useState<SearchItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const maxResults = 10;
  const fuse = new Fuse(items, { threshold: 0.3, keys: [{name: 'name', weight: 1}, {name: 'keys', weight: 0.5}] });

  // Set character search filter
  const handleSearch = (filtered: SearchItem[]) => {
    setSearchedItems(filtered);    
  }

  const handleInput = (input: string) => {
    debounce(() => {
      let searchResults = fuse.search(input);

      // Fuzzy search
      let filtered: string[] = [];

      if (searchResults.length > 0) {
        // Only filter up to maximum number of results
        const max = Math.min(maxResults, searchResults.length);
        for (let i = 0; i < max; i++) {
          filtered.push(searchResults[i].item.name)
        }
      }

      handleSearch(filter(items, (item: SearchItem) => includes(filtered, item.name)));
    }, 150)();
  }

  const handleChange = (selected: Option[]) => {
    setSelectedItems(selected);
    onSelect(map(selected, item => item.value ))
  }

  const handleSelect = (_id: string) => {
    const selectedItem = find(items, { _id });
    if (selectedItem) {
      const newSelected = [...selectedItems, { label: selectedItem.name, rarity: selectedItem.rarity, value: selectedItem._id }];
      setSelectedItems(newSelected)
      onSelect(map(newSelected, item => item.value ))
    }
  }

  return (
    <div className='card-search-container'>
      <div className="cards-container">
        <div className="card-searchbar">
          <Dropdown.SearchSelect
            onChange={handleChange}
            onInput={handleInput}
            options={options}
            optionLabel={OptionLabel}
            showDropdown={!showCards}
            isMulti={true}
            value={selectedItems}
            placeholder={placeholder}
          />
        </div>
        {showCards && 
          <div className={`cards ${showAll ? 'asFull' : ''}`}>
            {map(orderBy(searchedItems.length ? searchedItems : items, 'name', 'asc'), (item, i) => (
              <Card onClick={handleSelect} key={`${item._id}-${i}`} imgPath={imgPath} {...item} />
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default { ArtifactSets, Weapons, Characters }
