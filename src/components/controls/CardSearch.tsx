import './CardSearch.scss';

import Fuse from 'fuse.js';
import { debounce, filter, find, includes, map, orderBy } from 'lodash';
import React, { ReactNode, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Sticky from 'react-stickynode';

import { getShortName } from '../../scripts/util';
import Dropdown, { Option } from '../controls/Dropdown';
import { useAppSelector } from '../hooks/useRedux';
import Card from '../ui/Card';

type CardSearchProps = {
  items: SearchItem[]
  onSelect?: (selectedIds: string[]) => void
  showCards?: boolean,
  placeholder?: string
  showAll?: boolean
  defaultItems?: Option[]
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

export function generateOptions(items: any) {
  return orderBy(map(items, (item) => {
    return ({ label: item.name, rarity: item.rarity, value: item._id }) as Option
  }),'label', 'asc')
}

function Characters(props: CardSearchProps) { 
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const options: Option[] = generateOptions(props.items);

  const OptionLabel = ({ value, rarity, label }: Option) => {
    const character = characterDb[value];
    const imgFile = character.name.startsWith('Traveler') ? 'traveler' : character._id;

    return (
      <div className="item-option" key={label}>
        <div className={`item-option-image rarity-${rarity}`}>
          <img className="item-option-element" src={`/assets/elements/${character.element}.webp`} />
          <img className="item-option-portrait" src={`/assets/characters/${imgFile}.webp`} alt={`${label}-portrait`} />
        </div>
        <div className="item-option-label">{label}</div>
      </div>
    ) as ReactNode;
  }

  return <CardSearch options={options} OptionLabel={OptionLabel} path={"characters"} placeholder={"Search characters"} {...props} />
}

function ArtifactSets(props: CardSearchProps) { 
  const options: Option[] = orderBy(map(props.items, (item) => {
    return ({ label: item.name, rarity: item.rarity, value: item._id }) as Option
  }),'label', 'asc')

  const OptionLabel = ({ value, rarity, label }: Option) => {
    return (
      <div className="item-option" key={label}>
        <div className={`item-option-image rarity-${rarity}`}>
          <img className="item-option-portrait" src={`/assets/artifacts/${value}.webp`} alt={`${label}-portrait`} />
        </div>
        <div className="item-option-label">{label}</div>
      </div>
    ) as ReactNode;
  }

  return <CardSearch options={options} OptionLabel={OptionLabel} path={"artifacts"} placeholder={"Search artifact sets"} {...props} />
}

function Weapons(props: CardSearchProps) { 
  const options: Option[] = orderBy(map(props.items, (item) => {
    return ({ label: item.name, rarity: item.rarity, value: item._id }) as Option
  }),'label', 'asc')

  const OptionLabel = ({ value, rarity, label }: Option) => {
    return (
      <div className="item-option" key={label}>
        <div className={`item-option-image rarity-${rarity}`}>
          <img className="item-option-portrait" src={`/assets/weapons/${value}.webp`} alt={`${label}-portrait`} />
        </div>
        <div className="item-option-label">{label}</div>
      </div>
    ) as ReactNode;
  }

  return <CardSearch options={options} OptionLabel={OptionLabel} path={"weapons"} placeholder={"Search weapons"} {...props} />
}

function CardSearch({ items, path, options, onSelect, OptionLabel, placeholder, showCards = true, showAll = false, defaultItems = []}: CardSearchProps & DDProps & { path: string }) { 
  const [searchedItems, setSearchedItems] = useState<SearchItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Option[]>(defaultItems);
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
    onSelect && onSelect(map(selected, item => item.value ))
  }

  const handleSelect = (_id: string) => {
    const selectedItem = find(items, { _id });
    if (selectedItem) {
      const newSelected = [...selectedItems, { label: selectedItem.name, rarity: selectedItem.rarity, value: selectedItem._id }];
      setSelectedItems(newSelected)
      onSelect && onSelect(map(newSelected, item => item.value ))
    }
  }

  return (
    <div className='card-search-container'>
      <div className="cards-container">
        <div className="card-searchbar">
          <Sticky top={6} innerZ={9}>
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
          </Sticky>
        </div>
        {showCards && 
          <div className={`cards ${showAll ? 'asFull' : ''}`}>
            {map(orderBy(searchedItems.length ? searchedItems : items, 'name', 'asc'), (item, i) => {
              return <Link key={`${item._id}-${i}`} to={`${getShortName(item)}`}><Card onClick={handleSelect} path={path} {...item} /></Link>
            })}
          </div>
        }
      </div>
    </div>
  )
}

export default { ArtifactSets, Weapons, Characters }
